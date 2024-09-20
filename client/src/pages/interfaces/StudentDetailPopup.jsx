import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDetailPopup = ({ student, onClose, onSubmit = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...student });
  const [originalData, setOriginalData] = useState({ ...student });
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({ ...student });
    setOriginalData({ ...student });
  }, [student]);

  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  const formattedDOB = formatDateForInput(formData.dob);

  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "mobile", type: "text" },
    {
      label: "Class",
      name: "Class",
      type: "select",
      options: ["9", "10", "11", "12"],
    },
    { label: "Session", name: "session", type: "text" },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["male", "female", "other"],
    },
    {
      label: "Blood Group",
      name: "blood",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Father's Name", name: "father_name", type: "text" },
    { label: "Mother's Name", name: "mother_name", type: "text" },
    { label: "Father's Mobile", name: "father_mobile", type: "text" },
    { label: "Mother's Mobile", name: "mother_mobile", type: "text" },
    { label: "Address", name: "current_address", type: "text" },
    { label: "Status", name: "active", type: "checkbox" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const getChangedData = () => {
    return Object.keys(formData).reduce((changedData, key) => {
      if (formData[key] !== originalData[key]) {
        changedData[key] = formData[key];
      }
      return changedData;
    }, {});
  };

  const handleSubmit = async () => {
    const changes = getChangedData();
    if (Object.keys(changes).length > 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/protected/Update-student", {
          userId: student.userId,
          ...changes,
        });

        const { success } = response.data;
        if (success === true) {
          onSubmit(changes);
          setError(null);
          alert("Student details updated successfully!");
        } else {
          setError("There was an error updating the student!");
        }
      } catch (error) {
        setError("There was an error updating the student!");
        console.error("Error updating student:", error);
      }
    }
    toggleEdit();
  };

  const getInputClassName = (isEditing, readOnly) => {
    return `border ${
      isEditing && !readOnly
        ? "border-b-2 border-t-0 border-l-0 border-r-0"
        : "border-none"
    } p-2 bg-transparent focus:outline-none w-full`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:text-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full h-1/2 overflow-y-auto md:h-auto max-w-sm md:max-w-3xl">
        <h2 className="text-lg font-bold mb-2 text-center">Student Details</h2>
        <p className="text-sm mt-2 mb-2 text-center">{student.userId}</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="md:flex md:flex-wrap gap-6">
          {formFields.map(({ label, name, type, readOnly, options }) => (
            <div key={name} className="mb-4 flex flex-col">
              <label className="font-bold">{label}:</label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  disabled={!isEditing || readOnly}
                  className={getInputClassName(isEditing, readOnly)}
                >
                  {options.map((option) => (
                    <option
                      className="dark:bg-slate-800"
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={name}
                  type={type}
                  value={
                    type === "checkbox"
                      ? undefined
                      : name === "dob" && !isEditing
                      ? formattedDOB
                      : formData[name]
                  }
                  checked={type === "checkbox" ? formData[name] : undefined}
                  onChange={handleInputChange}
                  disabled={!isEditing || readOnly}
                  className={getInputClassName(isEditing, readOnly)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPopup;
