import React from 'react';
import ApexCharts from 'react-apexcharts';
import GetAttendance from '../../hooks/GetAttendance';

const ShowAttendance = () => {
  const { attendanceData, error, loading } = GetAttendance();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!attendanceData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the BarChart
  const barData = [
    { name: 'Present', value: attendanceData.attendance.present },
    { name: 'Absent', value: attendanceData.attendance.absent },
    { name: 'Leave', value: attendanceData.attendance.leave },
  ];

  const barSeries = [
    {
      name: 'Attendance',
      data: barData.map(item => item.value),
    },
  ];

  const barCategories = barData.map(item => item.name);

  const barOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: barCategories,
    },
    colors: ['#82ca9d'],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} classes`,
      },
    },
  };

  return (
    <div>
      {/*Attendance Data*/}

     <div className='flex justify-between' >
      <p>Total Classes: {attendanceData.attendance.totalClasses}</p>
      <p>Present: {attendanceData.attendance.present}</p>
      <p>Absent: {attendanceData.attendance.absent}</p>
      <p>Leave: {attendanceData.attendance.leave}</p>
      <p>
        Period: {new Date(attendanceData.attendance.period.start).toLocaleDateString()} to {new Date(attendanceData.attendance.period.end).toLocaleDateString()}
      </p>
      </div>

      <div id="bar-chart">
        <ApexCharts
          options={barOptions}
          series={barSeries}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default ShowAttendance;
