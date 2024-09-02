import axios from "axios";
import { useState, useEffect } from "react";

const GetStudents = () => {
  const [students, setstudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/protected/getusers');
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setstudents(res.data);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  return { students, loading, error };
};

export default GetStudents;