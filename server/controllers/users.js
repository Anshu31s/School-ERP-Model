import User from '../models/user.js';
import Student from '../models/students.js';
import Teacher from '../models/teachers.js';

const getstudents = async (req, res) => {
    try {
      const totalStudents = await Student.countDocuments();
      const activeStudents = await Student.countDocuments({ active: true });
      
      const students = await Student.find().select('-password');
  
      if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json({
        totalStudents,  
        activeStudents,
        students
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  //get number of new students
  const getNewStudents = async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();
      let yearlyData = [];
  
      for (let year = 2020; year <= currentYear; year++) {
        const startOfYear = new Date(year, 3, 1); // April 1st of the current year
        const endOfYear = new Date(year + 1, 2, 31, 23, 59, 59); // March 31st of the next year
  
        const newStudents = await Student.countDocuments({
          createdAt: { $gte: startOfYear, $lte: endOfYear }
        });
  
        yearlyData.push({
          year: `${year} - ${year + 1}`,
          count: newStudents,
        });
      }
  
      res.status(200).json(yearlyData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export { getstudents,getNewStudents };