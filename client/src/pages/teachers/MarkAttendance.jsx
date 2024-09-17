import GetStudents from "../../data/students";
import React, { useState } from "react";
import axios from "axios";

const UploadAttendance = () => {
    const { students, loading, error } = GetStudents();

    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStream, setSelectedStream] = useState("");
    const [attendance, setAttendance] = useState({});

    const classes = ["9", "10", "11", "12"];
    const streams = ["Science", "Commerce", "Arts"];

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
        setSelectedStream("");
    };

    const handleStreamChange = (e) => {
        setSelectedStream(e.target.value);
    };

    const handleAttendanceChange = (studentId, status) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [studentId]: status,
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

        const payload = {
            class: selectedClass,
            stream: selectedStream,
            attendance,
        };

        console.log("Submitting the following data:", payload);


        try {
            const response = await axios.post("http://localhost:5000/api/protected/upload-attendace", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("submitted successfully.");
                setSelectedClass("");
                setSelectedStream("");
                setAttendance({});
            } else {
                alert("Failed to submit.");
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("An error occurred while submitting attendance.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white w-full p-2 h-screen rounded shadow-md">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label htmlFor="class" className="block mb-2 font-medium">Class:</label>
                        <select id="class" value={selectedClass} onChange={handleClassChange} className="w-full border rounded p-2">
                            <option value="" disabled>Select Class</option>
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>
                    {(selectedClass === "11" || selectedClass === "12") && (
                        <div className="flex-1">
                            <label htmlFor="stream" className="block mb-2 font-medium">Stream:</label>
                            <select id="stream" value={selectedStream} onChange={handleStreamChange} className="w-full border rounded p-2">
                                <option value="" disabled>Select Stream</option>
                                {streams.map((stream) => (
                                    <option key={stream} value={stream}>{stream}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="relative w-full overflow-x-auto mb-4">
                    <table className="w-full min-w-[600px] border-collapse">
                        <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="p-2 text-left font-medium">Name</th>
                                <th className="p-2 text-left font-medium">Roll no</th>
                                <th className="p-2 text-left font-medium">Present</th>
                                <th className="p-2 text-left font-medium">Absent</th>
                                <th className="p-2 text-left font-medium">N.a.</th>
                                <th className="p-2 text-left font-medium">Leave</th>
                            </tr>
                        </thead>
                        {selectedClass && (
                            <tbody>
                                {students
                                    .filter((student) => student.Class === selectedClass && student.active === true)
                                    .map((student) => (
                                        <tr key={student.userId} className="border-b hover:bg-gray-100">
                                            <td className="p-2">{student.userId}</td>
                                            <td className="p-2">{student.name}</td>
                                            <td className="p-2">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="present"
                                                    onChange={() => handleAttendanceChange(student.userId, "present")}
                                                    aria-label={`Mark ${student.name} as present`}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="absent"
                                                    onChange={() => handleAttendanceChange(student.userId, "absent")}
                                                    aria-label={`Mark ${student.name} as absent`}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="na"
                                                    onChange={() => handleAttendanceChange(student.userId, "na")}
                                                    aria-label={`Mark ${student.name} as N.A.`}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="leave"
                                                    onChange={() => handleAttendanceChange(student.userId, "leave")}
                                                    aria-label={`Mark ${student.name} as leave`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        )}
                    </table>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Attendance
                </button>
            </form>
        </div>

    );
};

export default UploadAttendance;
