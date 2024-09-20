// StudentGrowthChart.js
import React from 'react';
import ApexCharts from 'react-apexcharts';
import YearlyData from '../../hooks/YearlyData';

const AdmissionGrowth = () => {
  const { yearlyData, loading, error } = YearlyData();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const data = {
    series: [
      {
        name: 'New Students',
        data: yearlyData.map(item => item.count),
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: yearlyData.map(item => item.year),
        title: {
          text: 'Year',
        },
      },
      yaxis: {
        title: {
          text: 'Count',
        },
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 5,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} students`,
        },
      },
    },
  };

  return (
    <div>
      {/*New Students Added (April to April)*/}
      <ApexCharts
        options={data.options}
        series={data.series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default AdmissionGrowth;
