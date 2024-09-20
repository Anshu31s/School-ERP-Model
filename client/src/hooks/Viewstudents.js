import axios from "axios";
import { useState, useEffect } from "react";

const viewstudents = (selectedClass) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      if (!selectedClass) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:5000/api/protected/view-students",
          {
            params: {
              Class:selectedClass,
            },
          }
        );

        if (res.data.error) {
          throw new Error(res.data.error);
        }

        const { students } = res.data;
        setStudents(students);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, [selectedClass]);
  return {
    students,
    loading,
    error,
  };
};

export default viewstudents;
