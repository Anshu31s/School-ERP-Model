import React, { useEffect, useState } from 'react';
import useProfile from './Getprofile';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);
  const { profile, loading } = useProfile();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const userId = profile?.userId;
        const currentClass = profile?.current_class;

        const response = await axios.get('http://localhost:5000/api/protected/get-attendance', {
          params: { userId, class: currentClass },
          withCredentials: true
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

  if (loading) {
    return <div>Loading...</div>;
  } 

  if (error) {
    return <div>{error}</div>;
  }

  if (!attendanceData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the PieChart
  const pieData = [
    { name: 'Present', value: attendanceData.attendance.present },
    { name: 'Absent', value: attendanceData.attendance.absent },
    { name: 'Leave', value: attendanceData.attendance.leave },
  ];

  // Colors for the PieChart
  const COLORS = ['#0088FE', '#FF8042', '#FFBB28'];

  return (
    <div>
      <h1>Attendance Data</h1>

      {/* Textual Data */}
      <p>Total Classes: {attendanceData.attendance.totalClasses}</p>
      <p>Present: {attendanceData.attendance.present}</p>
      <p>Absent: {attendanceData.attendance.absent}</p>
      <p>Leave: {attendanceData.attendance.leave}</p>
      <p>
        Period: {new Date(attendanceData.attendance.period.start).toLocaleDateString()} to {new Date(attendanceData.attendance.period.end).toLocaleDateString()}
      </p>

      {/* PieChart to visualize attendance breakdown */}
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* BarChart to visualize attendance breakdown */}
      <BarChart
        width={500}
        height={300}
        data={pieData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Attendance;
