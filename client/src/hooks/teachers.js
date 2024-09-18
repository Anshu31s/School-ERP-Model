import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GetTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [activeTeachers, setActiveTeachers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.user.userType);

  useEffect(() => {
    if (userRole === "admin") {
      const getTeachers = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/protected/Get-teachers');
          if (res.data.error) {
            throw new Error(res.data.error);
          }

          const { totalTeachers, activeTeachers, teachers } = res.data;

          setTotalTeachers(totalTeachers);
          setActiveTeachers(activeTeachers);
          setTeachers(teachers);
        } catch (error) {
          setError(error.message);
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      getTeachers();
    } else {
      setLoading(false);
    }
  }, [userRole]);

  return { teachers, totalTeachers, activeTeachers, loading, error };
};

export default GetTeachers;
