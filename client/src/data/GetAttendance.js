
import { useState, useEffect } from 'react';
import axios from 'axios';
import useProfile from '../data/Getprofile';

const useFetchAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);
  const { profile, loading } = useProfile();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const userId = profile?.userId;
        const Class = profile?.Class;

        const response = await axios.get('http://localhost:5000/api/protected/get-attendance', {
          params: { userId, class: Class },
          withCredentials: true,
        });
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setError('Failed to fetch attendance');
      }
    };

    if (profile) {
      fetchAttendance();
    }
  }, [profile]);

  return { attendanceData, error, loading };
};

export default useFetchAttendance;
