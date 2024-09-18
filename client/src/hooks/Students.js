import axios from "axios";
import { useState, useEffect } from "react";

const Students = (page = 1, limit = 10) => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        
        const res = await axios.get('http://localhost:5000/api/protected/Get-students', {
          params: {
            page,
            limit,
          },
        });
        
        if (res.data.error) {
          throw new Error(res.data.error);
        }

        const { totalStudents, activeStudents, students, totalPages } = res.data;

        setTotalStudents(totalStudents);
        setActiveStudents(activeStudents);
        setStudents(students);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      } finally {
        setLoading(false); 
      }
    };

    getStudents();
  }, [page, limit]); 
  return { students, totalStudents, activeStudents, totalPages, loading, error };
};

export default Students;
