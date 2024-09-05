import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.js';
import Student from '../models/students.js';
import Teacher from '../models/teachers.js';
import transporter from '../mailer/email.js';
import { currentSession } from '../datetime.js';
import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();

const generateUserId = (prefix) => `${prefix}@${uuidv4().split('-')[0]}`;

const hashPassword = async (userId) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userId, salt);
};

const sendRegistrationEmail = async (email, userId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Successful',
    text: `Your user ID is ${userId} and password is ${userId}. Please keep it safe.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (emailErr) {
    console.error('Error sending email:', emailErr);
  }
};

const registerStudent = async (req, res) => {
  const {
    name, email, dob, gender, blood, mobile, father_name, mother_name,
    father_mobile, mother_mobile, current_address, current_class
  } = req.body;

  try {

    const userId = generateUserId('stu');
    const hashedPassword = await hashPassword(userId);
    const current_session = currentSession;


    const NewStudent = new Student({
      name, email, userId, password: hashedPassword, dob, gender, blood, mobile,
      father_name, mother_name, father_mobile, mother_mobile, current_address,
      current_class, current_session,
    });

    const NewUser = new User({ userId, password: hashedPassword, userType: 'student' });

    await Promise.all([NewUser.save(), NewStudent.save()]);

    // await sendRegistrationEmail(email, userId);

    res.status(201).json({ success: true, message: 'Student registered successfully', userId });
  } catch (err) {
    console.error('Error registering student:', err);

    if (err.name === 'ValidationError') {
      res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
    } else if (err.code === 11000) {
      res.status(409).json({ success: false, message: 'Mobile number or email already registered' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const registerTeacher = async (req, res) => {
  const {
    name, email, dob, gender, blood, mobile, father_name, mother_name,
    father_mobile, mother_mobile, current_address
  } = req.body;

  try {

    const userId = generateUserId('emp');
    const hashedPassword = await hashPassword(userId);

    const NewTeacher = new Teacher({
      name, email, userId, password: hashedPassword, dob, gender, blood, mobile,
      father_name, mother_name, father_mobile, mother_mobile, current_address,
    });

    const NewUser = new User({ userId, password: hashedPassword, userType: 'teacher' });

    await Promise.all([NewUser.save(), NewTeacher.save()]);

    await sendRegistrationEmail(email, userId);

    res.status(201).json({ success: true, message: 'Teacher registered successfully', userId });
  } catch (err) {
    console.error('Error registering teacher:', err);

    if (err.name === 'ValidationError') {
      res.status(400).json({ success: false, message: 'Validation error', errors: err.errors });
    } else if (err.code === 11000) {
      res.status(409).json({ success: false, message: 'Mobile number or email already registered' });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).json({ error: 'Invalid user ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid user ID or password' });
    }

    let token;
    let cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    };


    token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
    );

    res.cookie('token', token, cookieOptions);
    res.status(200).json({ success: true, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getuser = async (req, res) => {
  const id = req.user.id
  try {
    const user = await User.findById(id).select('-password -_id');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.userType === 'student') {
      const student = await
        Student.findOne({ userId: user.userId }).select('-password -_id');
      return res.json({ user, student });
    } else {
      const teacher = await
        Teacher.findOne({ userId: user.userId }).select('-password -_id');
      return res.json({ user, teacher });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getusers = async (req, res) => {
  try {
    const students = await Student.find().select('-password');

    if (!students) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



const promoteStudents = async () => {
  try {
    const students = await Student.find({ score: { $gt: 40 } });

    const classHierarchy = ['6', '7', '8', '9', '10', '11', '12'];

    for (const student of students) {
      const currentIndex = classHierarchy.indexOf(student.grade);

      if (currentIndex < classHierarchy.length - 1) {
        student.grade = classHierarchy[currentIndex + 1];
        await student.save();
      }
    }

    console.log('Student classes updated successfully');
  } catch (error) {
    console.error('Error updating student classes:', error);
  }
};


async function updateSession() {
  try {
    await Student.updateMany({ active: true }, { session : currentSession });
    console.log('Current session updated successfully for active students');
  } catch (error) {
    console.error('Error updating current session for active students:', error);
  }
}


cron.schedule('0 0 1 4 *', async () => {
  try {
    await updateSession();
    await promoteStudents();
  } catch (error) {
    console.error('Error executing scheduled task:', error);
  }
});
console.log('Cron job scheduled successfully.');


const deleteUser = async (req, res) => {
  const id = req.user.id;
  try {
    const getUser = await User.findById(id);

    if (!getUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const deleteUser = await User.deleteOne({ _id: id });

    if (deleteUser.deletedCount === 0) {
      return res.status(400).json({ message: "Delete failed" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



function logout(req, res) {
  res.clearCookie('_csrf');
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export { registerStudent, registerTeacher, login, getuser, getusers, deleteUser, logout };