import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import RegisterStudent from "./components/Register-students";
import RegisterTeacher from "./components/Register-teachers";
import Dashboard from "./layout/Dashboard";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Attendance from "./pages/teachers/MarkAttendance.jsx";
import Uploadmarks from "./pages/teachers/Uploadmarks.jsx";
import ViewStudents from "./pages/ViewStudents.jsx";
import Profile from "./pages/Profile";
import AuthRoute from "./routes/authRoute.jsx";
import UnauthRoute from "./routes/UnauthRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import TeacherRoute from "./routes/teacherRoute.jsx";
import ViewTeacher from "./pages/ViewTeachers.jsx";
function App() {
  return (

    <Router>
      <Routes>
        <Route element={<UnauthRoute />} >
          <Route path="/" element={<Signin />} />
          <Route path="/register-student" element={<RegisterStudent />} />
        </Route>
        <Route element={<AuthRoute />} >
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route element={<TeacherRoute />} >
              <Route path="attendance" element={<Attendance />} />
              <Route path="Upload-marks" element={<Uploadmarks />} />
            </Route>
            <Route element={<AdminRoute />} >
              <Route path="register-teacher" element={<RegisterTeacher />} />
              <Route path="Students" element={<ViewStudents />} />
              <Route path="Teachers" element={<ViewTeacher />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="" element={<Navigate to="home" />} />
          </Route>
        </Route>
      </Routes>
    </Router>

  );
}

export default App
