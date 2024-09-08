import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GetStudents from './teachers/students';

const StudentGraph = () => {
  const { totalStudents, activeStudents, loading, error } = GetStudents();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  
  const data = [
    { name: 'Total Students', count: totalStudents },
    { name: 'Active Students', count: activeStudents }
  ];

  return (
    <div>
      <h2>Student Statistics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentGraph;
