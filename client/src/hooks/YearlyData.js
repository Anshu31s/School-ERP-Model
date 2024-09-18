
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchYearlyData = () => {
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/protected/get-new-students');
        setYearlyData(res.data);
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchYearlyData();
  }, []);

  return { yearlyData, loading, error };
};

export default useFetchYearlyData;
