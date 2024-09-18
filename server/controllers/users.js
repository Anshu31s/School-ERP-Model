import User from "../models/user.js";
import Student from "../models/students.js";
import Teacher from "../models/teachers.js";

const getstudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const skip = (page - 1) * limit;

    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ active: true });

    const students = await Student.find().select("-password").skip(skip).limit(limit);

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      totalStudents,
      activeStudents,
      students,
      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getNewStudents = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    let yearlyData = [];

    for (let year = 2020; year <= currentYear; year++) {
      const startOfYear = new Date(year, 3, 1); // April 1st of the current year
      const endOfYear = new Date(year + 1, 2, 31, 23, 59, 59); // March 31st of the next year

      const newStudents = await Student.countDocuments({
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      });

      yearlyData.push({
        year: `${year} - ${year + 1}`,
        count: newStudents,
      });
    }

    res.status(200).json(yearlyData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTeachers = async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    const activeTeachers = await Teacher.countDocuments({ active: true });

    const teachers = await Teacher.find().select("-password");

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      totalTeachers,
      activeTeachers,
      teachers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatestudent = async (req, res) => {
  const { userId, ...changes } = req.body;
  try {
    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, changes);
    
    await student.save();
    
    res.status(200).json({success: true});
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getstudents, getNewStudents, getTeachers, updatestudent };
