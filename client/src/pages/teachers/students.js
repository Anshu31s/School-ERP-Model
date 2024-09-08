import axios from "axios";
import { useState, useEffect } from "react";

const GetStudents = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/protected/Get-students');
        if (res.data.error) {
          throw new Error(res.data.error);
        }

        const { totalStudents, activeStudents, students } = res.data;

        setTotalStudents(totalStudents);
        setActiveStudents(activeStudents);
        setStudents(students);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  return { students, totalStudents, activeStudents, loading, error };
};

export default GetStudents;