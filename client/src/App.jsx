import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import RegisterStudent from "./components/Register-students";
import RegisterTeacher from "./components/Register-teachers";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Attendance from "./pages/teachers/MarkAttendance.jsx";
import Uploadmarks from "./pages/teachers/Uploadmarks.jsx";
import ViewStudents from "./pages/teachers/ViewStudents.jsx";
import Profile from "./pages/Profile";
import AuthRoute from "./routes/authRoute.jsx";
import UnauthRoute from "./routes/UnauthRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";

function App() {
  return (

    <Router>
      <Routes>
        <Route element={<UnauthRoute />} >
          <Route path="/" element={<Signin />} />
          <Route path="/register-student" element={<RegisterStudent />} />
        </Route>
        <Route element={<AdminRoute />} >
          <Route path="/register-teacher" element={<RegisterTeacher />} />
        </Route>
        <Route element={<AuthRoute />} >
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="Upload-marks" element={<Uploadmarks />} />
            <Route path="Students" element={<ViewStudents />} />
            <Route path="profile" element={<Profile />} />
            <Route path="" element={<Navigate to="home" />} />
          </Route>
        </Route>
      </Routes>
    </Router>

  );
}

export default App
