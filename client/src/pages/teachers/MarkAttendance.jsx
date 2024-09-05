import GetStudents from "./students";
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
        <div className="p-8">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-1">
                    <div>
                        <label htmlFor="class">Class:</label>
                        <select id="class" value={selectedClass} onChange={handleClassChange}>
                            <option value="" disabled>
                                Select Class
                            </option>
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))}
                        </select>
                    </div>
                    {(selectedClass === "11" || selectedClass === "12") && (
                        <div>
                            <label htmlFor="stream">Stream:</label>
                            <select id="stream" value={selectedStream} onChange={handleStreamChange}>
                                <option value="" disabled>
                                    Select Stream
                                </option>
                                {streams.map((stream) => (
                                    <option key={stream} value={stream}>
                                        {stream}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead>
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-left">
                                    NAME
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-left">
                                    ROLL No
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-left">
                                    PRESENT
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-left">
                                    ABSENT
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-left">
                                    N.A.
                                </th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-left">
                                    LEAVE
                                </th>
                            </tr>
                        </thead>
                        {selectedClass && (
                            <tbody>
                                {students
                                    .filter((student) => student.current_class === selectedClass && student.active === true)
                                    .map((student) => (
                                        <tr key={student.userId}>
                                            <td className="h-12 px-4 align-middle text-left">{student.userId}</td>
                                            <td className="h-12 px-4 align-middle text-left">{student.name}</td>

                                            <td className="h-12 px-4 align-middle text-left">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="present"
                                                    onChange={() => handleAttendanceChange(student.userId, "present")}
                                                />
                                            </td>

                                            <td className="h-12 px-4 align-middle text-left">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="absent"
                                                    onChange={() => handleAttendanceChange(student.userId, "absent")}
                                                />
                                            </td>

                                            <td className="h-12 px-4 align-middle text-left">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="na"
                                                    onChange={() => handleAttendanceChange(student.userId, "na")}
                                                />
                                            </td>

                                            <td className="h-12 px-4 align-middle text-left">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.userId}`}
                                                    value="leave"
                                                    onChange={() => handleAttendanceChange(student.userId, "leave")}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Attendance
                </button>
            </form>
        </div>
    );
};

export default UploadAttendance;
