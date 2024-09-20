import axios from "axios";
import { useState, useEffect } from "react";

const Teachers = (page = 1, limit = 10, searchQuery = "", genderFilter, activeFilter) => {
  const [teachers, setTeachers] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [activeTeachers, setActiveTeachers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/protected/get-teachers",
          {
            params: {
              page,
              limit,
              search: searchQuery,
              gender: genderFilter,
              active: activeFilter,
            },
          }
        );

        if (res.data.error) {
          throw new Error(res.data.error);
        }

        const { totalTeachers, activeTeachers, teachers, totalPages } = res.data;

        setTotalTeachers(totalTeachers);
        setActiveTeachers(activeTeachers);
        setTeachers(teachers);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTeachers();
  }, [page, limit, searchQuery, genderFilter, activeFilter]);

  return {
    teachers,
    totalTeachers,
    activeTeachers,
    totalPages,
    loading,
    error,
  };
};

export default Teachers;
