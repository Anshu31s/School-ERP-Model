import GetStudents from "../../data/students";
import React, { useState } from "react";
import axios from "axios";

const Uploadmarks = () => {
  const { students, totalStudents, loading, error } = GetStudents();

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [marks, setMarks] = useState({});

  const classes = ["9", "10", "11", "12"];
  const streams = ["Science", "Commerce", "Arts"];
  const subjects = {
    "9": ["Math", "Science", "English"],
    "10": ["Math", "Science", "English"],
    "11": {
      Science: ["Physics", "Chemistry", "Biology"],
      Commerce: ["Accounting", "Business Studies", "Economics"],
      Arts: ["History", "Political Science", "Geography"],
    },
    "12": {
      Science: ["Physics", "Chemistry", "Biology"],
      Commerce: ["Accounting", "Business Studies", "Economics"],
      Arts: ["History", "Political Science", "Geography"],
    },
  };

  const examTypes = ["Half Yearly", "Final"];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStream("");
    setSelectedSubject("");
  };

  const handleStreamChange = (e) => {
    setSelectedStream(e.target.value);
    setSelectedSubject("");
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleExamTypeChange = (e) => {
    setSelectedExamType(e.target.value);
  };

  const handleMarksChange = (studentId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass) {
      alert("Please select a class.");
      return;
    }
    if ((selectedClass === "11" || selectedClass === "12") && !selectedStream) {
      alert("Please select a stream.");
      return;
    }
    if (!selectedSubject) {
      alert("Please select a subject.");
      return;
    }
    if (!selectedExamType) {
      alert("Please select an exam type.");
      return;
    }

    const payload = {
      class: selectedClass,
      subject: selectedSubject,
      stream: selectedStream,
      examType: selectedExamType,
      marks,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/protected/upload-marks", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Marks submitted successfully.");
        setSelectedClass("");
        setSelectedStream("");
        setSelectedSubject("");
        setSelectedExamType("");
        setMarks({});
      } else {
        alert("Failed to submit marks.");
      }
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("An error occurred while submitting marks.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 h-screen bg-white shadow-md rounded-lg">

      <div className="mb-4">
        <label htmlFor="class" className="block text-gray-700 font-semibold mb-2">Class:</label>
        <select id="class" value={selectedClass} onChange={handleClassChange} className="w-full p-2 border border-gray-300 rounded-md">
          <option value="" disabled>Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <div className="mb-4">
          <label htmlFor="examType" className="block text-gray-700 font-semibold mb-2">Exam Type:</label>
          <select id="examType" value={selectedExamType} onChange={handleExamTypeChange} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="" disabled>Select Exam Type</option>
            {examTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2">
        {(selectedClass === "11" || selectedClass === "12") && (
          <div className="mb-4">
            <label htmlFor="stream" className="block text-gray-700 font-semibold mb-2">Stream:</label>
            <select id="stream" value={selectedStream} onChange={handleStreamChange} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="" disabled>Select Stream</option>
              {streams.map((stream) => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
          </div>
        )}

        {(selectedClass && ((selectedClass !== "11" && selectedClass !== "12") || selectedStream)) && (
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject:</label>
            <select id="subject" value={selectedSubject} onChange={handleSubjectChange} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="" disabled>Select Subject</option>
              {(selectedClass === "11" || selectedClass === "12") && selectedStream
                ? subjects[selectedClass][selectedStream].map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))
                : subjects[selectedClass].map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
            </select>
          </div>
        )}
      </div>

      {selectedClass && (
        <div className="mb-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((student) => student.Class === selectedClass && student.active === true)
                .map((student) => (
                  <tr key={student.userId}>
                    <td className="border border-gray-300 p-2">{student.userId}</td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={marks[student.userId] || ""}
                        onChange={(e) => handleMarksChange(student.userId, e.target.value)}
                        className="w-full outline-none"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <button type="submit" className="w-1/6 bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Submit</button>
    </form>
  );
};

export default Uploadmarks;
