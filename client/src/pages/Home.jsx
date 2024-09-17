import React from "react";
import GetStudents from "../data/students";
import GetTeachers from "../data/teachers";
import AdmissionGrowth from "./AdmissionGrowth";
import GetAttendance from "./ShowAttendace";
import { useSelector } from "react-redux";
const Home = () => {
  const { totalStudents, activeStudents, loading, error } = GetStudents();
  const {
    totalTeachers,
    activeTeachers,
    loading: loadingTeachers,
    error: errorTeachers,
  } = GetTeachers();
  const userRole = useSelector((state) => state.auth.user.userType);

  if (loading || loadingTeachers) {
    return <p>Loading...</p>;
  }

  if (error || errorTeachers) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userRole === "admin" && (
          <>
            <div className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="red"
              >
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>
              <div className="mx-2">
                <h3 className="text-md font-medium text-gray-800">
                  Total Students
                </h3>
                <p className="mt-1 text-sm text-gray-500">{totalStudents}</p>
              </div>
            </div>

            <div className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                fill="green"
                height="40"
              >
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>

              <div className="mx-2">
                <h3 className="text-md font-medium text-gray-800">
                  Active Students
                </h3>
                <p className="mt-1 text-sm text-gray-500">{activeStudents}</p>
              </div>
            </div>
            <div className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="red"
              >
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>
              <div className="mx-2">
                <h3 className="text-md font-medium text-gray-800">
                  Total Teachers
                </h3>
                <p className="mt-1 text-sm text-gray-500">{totalTeachers}</p>
              </div>
            </div>
            <div className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                fill="green"
                height="40"
              >
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>

              <div className="mx-2">
                <h3 className="text-md font-medium text-gray-800">
                  Active Teachers
                </h3>
                <p className="mt-1 text-sm text-gray-500">{activeTeachers}</p>
              </div>
            </div>
          </>
        )}

        {userRole === "student" && (
          <>
            <a className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48"
                height="48"
              >
                <path
                  d="M24 0C10.751 0 0 10.751 0 24s10.751 24 24 24 24-10.751 24-24S37.249 0 24 0zm0 1c12.708 0 23 10.292 23 23 0 12.709-10.292 23-23 23S1 36.709 1 24C1 11.292 11.292 1 24 1zM10 15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V17c0-1.1-.9-2-2-2H10zm0 1h28c.563 0 1 .437 1 1v14c0 .563-.437 1-1 1H10c-.563 0-1-.437-1-1V17c0-.563.437-1 1-1zm3 1v.5c0 1.387-1.113 2.5-2.5 2.5H10v8h.5c1.387 0 2.5 1.113 2.5 2.5v.5h22v-.5c0-1.387 1.113-2.5 2.5-2.5h.5v-8h-.5a2.492 2.492 0 0 1-2.5-2.5V17H13zm.898 1h6.5a6.996 6.996 0 0 0 0 12h-6.5A3.426 3.426 0 0 0 11 27.102v-6.204A3.426 3.426 0 0 0 13.898 18zm10.082 0c3.326 0 6.02 2.685 6.02 6 0 3.316-2.694 6-6.02 6A5.971 5.971 0 0 1 18 24c0-3.319 2.654-6 5.98-6zm3.577 0h6.545A3.426 3.426 0 0 0 37 20.898v6.204A3.426 3.426 0 0 0 34.102 30h-6.526C29.622 28.775 31 26.547 31 24a.5.5 0 0 0-.04-.195A7.016 7.016 0 0 0 27.558 18zm-6.03 2v.01h-.023v1h1.027c.934 0 1.408.442 1.578.99h-2.582v1h2.582c-.17.548-.644.99-1.578.99h-1.027v1h.267L24.855 28l.698-.715-2.412-2.355c1.095-.222 1.8-1.035 1.994-1.93H26.5v-1h-1.365c-.078-.36-.244-.7-.479-1H26.5v-1h-4.973zM14 23c-.546 0-1 .454-1 1s.454 1 1 1 1-.454 1-1-.454-1-1-1zm20 0c-.546 0-1 .454-1 1s.454 1 1 1 1-.454 1-1-.454-1-1-1z"
                  color="#000"
                  fontFamily="sans-serif"
                  fontWeight="400"
                  overflow="visible"
                  fill="#34a853"
                ></path>
              </svg>
              <p className="text-sm text-gray-500">PAY FEES</p>
            </a>

            <a className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 446 511.568"
              >
                <path d="M81.772.188h339.507c8.355 0 15.131 6.775 15.131 15.131 0 96.062.132 157.363.274 215.529.574.482 1.13.99 1.661 1.52l.059.06c4.682 4.689 7.596 11.146 7.596 18.248v46.23c0 7.102-2.914 13.559-7.596 18.248l-.059.059c-.467.467-.954.915-1.455 1.345.148 62.962.27 121.655.27 164.116 0 8.508-3.463 16.225-9.049 21.811-5.585 5.586-13.302 9.049-21.811 9.049H78.394l-1.13-.042c-5.154.066-9.973.087-14.483.03a15.514 15.514 0 01-2.8-.039c-4.588-.094-8.854-.293-12.829-.638l-.496-.044-.295-.025-.566-.052-.219-.023-.631-.062-.144-.016c-8.964-.915-16.338-2.642-22.539-5.72C6.981 497.318.524 484.74.032 462.552l-.014-.602-.004-.327-.009-.773v-.165L0 459.736V81.958h.059C.055 75.48.03 68.996.08 62.519.329 32.531 2.566 15.646 20.016 7.172 31.994 1.028 51.143-.694 81.772.236V.188zm-5.055 15.007v481.231l1.677-.023H406.3c8.662 0 15.73-7.068 15.73-15.729 0-54.753-.085-106.786-.197-157.924-.574.036-1.153.059-1.736.059H297.751c-8.355 0-15.13-6.775-15.13-15.13v-67.776c0-8.356 6.775-15.13 15.13-15.13h122.346c.503 0 1.004.013 1.5.043-.167-67.874-.318-136.25-.318-209.497h-37.284v141.746a2.81 2.81 0 01-.508 1.583 2.753 2.753 0 01-3.834.668l-31.143-21.917-32.71 21.82a2.758 2.758 0 01-4.481-2.154V15.319H81.772a491.646 491.646 0 00-5.11-.131v.007h.055zm-15.13 481.243a244.333 244.333 0 01-6.683-.193c-29.285-1.185-39.774-7.403-39.774-39.178V81.958c0-9.666-.345-20.43.391-30.562.833-11.425 2.521-23.291 13.489-29.881l.26-.151c8.854-5.014 22.351-5.896 32.317-6.169v481.243zm57.563-362.522c-4.876 0-8.833-3.957-8.833-8.834 0-4.876 3.957-8.833 8.833-8.833h137.364c4.877 0 8.834 3.957 8.834 8.833a8.836 8.836 0 01-8.834 8.834H119.15zm0-44.307c-4.876 0-8.833-3.957-8.833-8.833 0-4.877 3.957-8.834 8.833-8.834h137.364a8.836 8.836 0 018.834 8.834c0 4.876-3.957 8.833-8.834 8.833H119.15zm.003 88.615c-4.877 0-8.834-3.957-8.834-8.833s3.957-8.833 8.834-8.833h116.423c4.877 0 8.834 3.957 8.834 8.833s-3.957 8.833-8.834 8.833H119.153zm178.598 61.679h26.763v67.776h-26.763v-67.776zm101.367 24.4c5.24 0 9.487 4.248 9.487 9.488a9.486 9.486 0 01-9.487 9.487 9.488 9.488 0 010-18.975zm-60.354-24.4h81.333c5.926 0 10.773 4.846 10.773 10.773v46.23c0 5.926-4.847 10.773-10.773 10.773h-81.333v-67.776z" />
              </svg>
              <p className="text-sm text-gray-500">Syllabus</p>
            </a>

            <a className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 117.91 122.88"
                width="40"
                height="40"
              >
                <g>
                  <path d="M91.79,109.33l-3.01-0.54l-1.51,2.71c-0.01,0.02-0.02,0.04-0.04,0.05c-0.63,0.78-1.21,0.76-1.71,0.35 c-0.54-0.44-0.9-1.38-1.13-2l-0.09-0.23l-3.19-6.02c-0.1-0.19-0.03-0.42,0.16-0.51c0.02-0.01,0.04-0.02,0.05-0.02 c0.33-0.11,0.7-0.34,1.1-0.64c0.42-0.31,0.86-0.7,1.31-1.1c0.08-0.07,0.18-0.11,0.29-0.1c0.86,0.02,1.7-0.05,2.45-0.3 c0.74-0.25,1.42-0.69,2-1.43c0.13-0.17,0.37-0.2,0.53-0.07c0.04,0.04,0.08,0.08,0.1,0.13l3.69,7.12l0.32,0.69 c0.01,0.02,0.02,0.04,0.02,0.06c0.15,0.53,0.18,0.99,0,1.34c-0.2,0.39-0.59,0.59-1.25,0.54C91.86,109.35,91.82,109.34,91.79,109.33 L91.79,109.33z M28.41,98.96c5.66-7.43,10.49-4.05,17.25,0.67c0.34,0.24,0.68,0.47,1.02,0.71c0.97,0.67,1.98,0.55,3,0.05 c1.1-0.55,2.21-1.53,3.31-2.5l0.02-0.01c0.99-0.87,1.96-1.73,3-2.39c0.18-0.11,0.41-0.06,0.52,0.12l1.54,2.42 c0.11,0.18,0.06,0.41-0.12,0.52c-0.8,0.51-1.67,1.28-2.56,2.07l-0.02,0.02c-1.54,1.36-3.12,2.75-4.86,3.47 c-1.8,0.74-3.74,0.74-5.9-0.76l-1.03-0.72c-2.6-1.82-4.83-3.37-6.83-3.86c-1.92-0.46-3.67,0.09-5.44,2.41 c-0.13,0.17-0.37,0.2-0.53,0.07l-2.29-1.75C28.31,99.37,28.28,99.13,28.41,98.96L28.41,98.96z M90.58,3.91 c-0.66,0.75-1.18,1.51-1.57,2.26l0,0c-0.41,0.8-0.69,1.6-0.84,2.41c-0.17,0.9-0.2,1.82-0.1,2.76c0.1,0.95,0.32,1.93,0.65,2.93 l0.67,2.05c0.06,0.2-0.04,0.41-0.24,0.48c-0.04,0.01-0.08,0.02-0.12,0.02l-70.45,0v93.23c0,0.03,0,0.05-0.01,0.07 c0.01,1.64,0.18,3.05,0.54,4.23c0.35,1.17,0.87,2.12,1.58,2.81c0.68,0.67,1.57,1.14,2.67,1.41c1.13,0.27,2.49,0.32,4.08,0.14 c20.29-1.77,50.07-0.02,71.4-0.02V13.18c0-0.02,0-0.05,0.01-0.07l0-0.01c0.09-1.99-0.09-3.56-0.48-4.79 c-0.38-1.2-0.98-2.07-1.74-2.69C95.9,5.03,95,4.62,93.96,4.36C92.95,4.09,91.81,3.96,90.58,3.91L90.58,3.91z M14.68,16.82H0.38 C0.17,16.82,0,16.65,0,16.44l0.06-1.63c0.06-1.67,0.26-3.26,0.63-4.74C1.06,8.58,1.6,7.2,2.34,5.94C3.11,4.65,4.07,3.5,5.28,2.52 c1.2-0.98,2.63-1.78,4.34-2.4c0.02-0.01,0.04-0.01,0.06-0.02l0.53-0.1C10.22,0,10.25,0,10.27,0l83.2,0c0.2,0,0.37,0.16,0.38,0.36 c0.9,0.16,1.75,0.39,2.55,0.71c0.98,0.38,1.88,0.89,2.68,1.54c1.24,1.01,2.21,2.35,2.84,4.1c0.62,1.71,0.91,3.83,0.8,6.43l0,0.04 v92.62h10.72c0.15,0,0.28,0.01,0.39,0.02c0.03-0.01,0.06-0.01,0.09-0.01l0.09,0c0.84,0,1.45-0.01,1.96,0.11 c0.56,0.13,0.98,0.39,1.38,0.9c0.61,0.79,0.58,1.44,0.52,2.62l0,0.02c-0.02,0.34-0.04,0.77-0.04,1.46c0,2.81-0.49,5.03-1.39,6.77 c-0.92,1.75-2.25,3-3.92,3.85c-1.46,0.74-3.16,1.14-5.04,1.29c-1.85,0.14-3.89,0.04-6.06-0.22H27.72 c-2.14,0.23-4.02,0.11-5.64-0.33c-1.64-0.45-3.02-1.23-4.14-2.34c-1.1-1.09-1.92-2.48-2.46-4.14c-0.53-1.62-0.79-3.51-0.79-5.66 c0-0.02-0.01-0.05-0.01-0.08V16.82L14.68,16.82z M84.35,7.85c0.15-0.78,0.37-1.54,0.68-2.3c0.22-0.56,0.49-1.11,0.81-1.66H10.6 C9.46,4.34,8.49,4.9,7.69,5.57c-0.82,0.68-1.48,1.47-2,2.35c-0.45,0.76-0.8,1.6-1.07,2.5c-0.23,0.79-0.4,1.63-0.52,2.51h80.27 c-0.14-0.78-0.22-1.55-0.24-2.32C84.11,9.68,84.18,8.76,84.35,7.85L84.35,7.85z M102.73,109.69v9.15c1.6,0.16,3.09,0.21,4.42,0.11 c1.4-0.11,2.62-0.38,3.62-0.89c0.99-0.5,1.78-1.29,2.32-2.43c0.56-1.17,0.86-2.72,0.86-4.72c0-0.28,0.01-0.58,0.02-0.88l0.02-0.39 c-0.06,0.03-0.13,0.05-0.2,0.05l-0.02,0c-0.08,0-0.15,0.01-0.22,0L102.73,109.69L102.73,109.69z M29.85,32.5 c-0.54,0-1.02-0.22-1.37-0.57l0,0c-0.35-0.35-0.57-0.84-0.57-1.37c0-0.54,0.22-1.02,0.57-1.37l0,0c0.35-0.35,0.84-0.57,1.37-0.57 h45.18c0.54,0,1.02,0.22,1.37,0.57l0,0c0.35,0.35,0.57,0.84,0.57,1.37c0,0.54-0.22,1.02-0.57,1.37l0,0 c-0.35,0.35-0.84,0.57-1.37,0.57H29.85L29.85,32.5z M29.85,48.51c-0.54,0-1.03-0.22-1.38-0.57c-0.35-0.35-0.57-0.84-0.57-1.37 c0-0.54,0.22-1.02,0.57-1.37c0.35-0.35,0.84-0.57,1.38-0.57h55.42c0.54,0,1.03,0.22,1.38,0.57c0.35,0.35,0.57,0.84,0.57,1.37 c0,0.54-0.22,1.02-0.57,1.37c-0.35,0.35-0.84,0.57-1.38,0.57H29.85L29.85,48.51z M29.85,64.54c-0.54,0-1.02-0.22-1.37-0.57l0,0 c-0.35-0.35-0.57-0.84-0.57-1.37c0-0.54,0.22-1.02,0.57-1.38c0.35-0.35,0.84-0.57,1.38-0.57h44.29c0.54,0,1.02,0.22,1.37,0.57l0,0 c0.35,0.35,0.57,0.84,0.57,1.37c0,0.54-0.22,1.02-0.57,1.37l0,0c-0.35,0.35-0.84,0.57-1.37,0.57H29.85L29.85,64.54z M29.85,80.58 c-0.53,0-1.02-0.22-1.37-0.57c-0.35-0.35-0.57-0.84-0.57-1.38c0-0.54,0.22-1.03,0.57-1.38c0.35-0.35,0.84-0.57,1.37-0.57h22.92 c0.53,0,1.02,0.22,1.37,0.57c0.35,0.35,0.57,0.84,0.57,1.38c0,0.54-0.22,1.03-0.57,1.38c-0.35,0.35-0.84,0.57-1.37,0.57H29.85 L29.85,80.58z M79.59,76.11c0.36-0.02,0.68,0.04,0.98,0.14c0.29,0.1,0.56,0.25,0.84,0.42c0.28,0.18,0.57,0.42,0.88,0.69l0.02,0.02 c0.39,0.33,0.82,0.7,1.3,0.97c0.39,0.22,0.97,0.24,1.58,0.27c1.15,0.04,2.4,0.09,3.23,1.32l0,0c0.71,1.07,0.77,1.88,0.82,2.69 l0.01,0.09c0.02,0.39,0.07,0.76,0.21,1.16c0.14,0.41,0.38,0.85,0.78,1.39h0c0.75,0.99,1.2,1.83,1.37,2.6 c0.18,0.81,0.06,1.54-0.35,2.28l-0.01,0.02c-0.31,0.53-0.76,0.92-1.15,1.25c-0.29,0.25-0.55,0.47-0.63,0.65 c-0.21,0.49-0.22,0.94-0.22,1.41c-0.01,0.64-0.02,1.3-0.44,2.14l-0.01,0.02c-0.27,0.52-0.61,0.96-1.02,1.31 c-0.42,0.36-0.91,0.63-1.47,0.81c-0.5,0.16-0.96,0.13-1.41,0.1c-0.37-0.03-0.71-0.05-0.97,0.06l-0.03,0.01 c-0.54,0.23-1.03,0.63-1.5,1c-0.52,0.42-1.01,0.81-1.57,0.99l0,0c-0.41,0.13-0.82,0.19-1.23,0.19c-0.41,0-0.82-0.06-1.23-0.19 l-0.02-0.01c-0.55-0.17-1.04-0.57-1.56-0.99c-0.47-0.38-0.97-0.78-1.52-1.01c-0.26-0.11-0.6-0.08-0.97-0.06 c-0.44,0.03-0.91,0.06-1.42-0.1l-0.03-0.01c-0.55-0.18-1.03-0.45-1.45-0.8c-0.41-0.36-0.76-0.8-1.02-1.33 c-0.42-0.84-0.43-1.5-0.44-2.14c-0.01-0.47-0.01-0.92-0.22-1.41l-0.01-0.01c-0.09-0.19-0.35-0.41-0.64-0.66 c-0.4-0.34-0.85-0.72-1.15-1.25l-0.02-0.03c-0.41-0.73-0.52-1.45-0.34-2.26c0.17-0.77,0.63-1.61,1.38-2.6 c0.41-0.53,0.64-0.98,0.78-1.39c0.14-0.4,0.19-0.78,0.21-1.17l0.01-0.08c0.05-0.81,0.11-1.64,0.82-2.69l0.02-0.02 c0.82-1.21,2.06-1.25,3.2-1.29c0.61-0.02,1.2-0.05,1.59-0.27l0.01-0.01c0.47-0.27,0.9-0.63,1.29-0.97c0.31-0.27,0.6-0.52,0.9-0.7 c0.27-0.18,0.55-0.32,0.84-0.42C78.92,76.15,79.24,76.1,79.59,76.11L79.59,76.11z M84.25,83.45c-1.19-1.19-2.83-1.93-4.65-1.93 c-1.82,0-3.46,0.74-4.65,1.93c-1.19,1.19-1.93,2.83-1.93,4.65c0,1.82,0.74,3.46,1.93,4.65c1.19,1.19,2.83,1.93,4.65,1.93 c1.82,0,3.46-0.74,4.65-1.93c1.19-1.19,1.93-2.83,1.93-4.65C86.17,86.29,85.44,84.64,84.25,83.45L84.25,83.45z M70.42,108.79 l-3.01,0.54c-0.03,0.01-0.06,0.01-0.1,0.01c-0.66,0.05-1.05-0.15-1.25-0.54c-0.18-0.34-0.15-0.8,0-1.34l0.02-0.06l0.32-0.69 l3.69-7.12c0.02-0.05,0.06-0.09,0.1-0.13c0.17-0.13,0.4-0.1,0.53,0.07c0.57,0.73,1.25,1.17,2,1.43c0.76,0.26,1.59,0.32,2.45,0.3 c0.1-0.01,0.2,0.02,0.29,0.1c0.45,0.4,0.89,0.79,1.31,1.1c0.4,0.3,0.77,0.53,1.1,0.64l0.05,0.02c0.19,0.1,0.26,0.33,0.16,0.51 l-3.19,6.02l-0.09,0.23c-0.23,0.62-0.59,1.56-1.13,2c-0.5,0.4-1.07,0.43-1.71-0.35c-0.01-0.02-0.03-0.03-0.04-0.05L70.42,108.79 L70.42,108.79z" />
                </g>
              </svg>
              <p className="text-sm text-gray-500">Exam Results</p>
            </a>

            <a className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 99.39 122.88"
              >
                <g>
                  <path d="M65.72,12.72c-0.31,0-0.58-0.04-0.85-0.13c-1.38,0-2.54-1.12-2.54-2.54v-5H37.7v5c0,1.29-1.03,2.41-2.28,2.5 c-0.27,0.09-0.58,0.13-0.89,0.13h-9.28v10.35h48.59V12.67h-8.21L65.72,12.72L65.72,12.72z M22.85,75.03c2.76,0,5,2.24,5,5 s-2.24,5-5,5s-5-2.24-5-5S20.09,75.03,22.85,75.03L22.85,75.03z M17.07,62.7c-0.69-1.03-0.42-2.43,0.62-3.12 c1.03-0.69,2.43-0.42,3.12,0.62l1.23,1.82l4.87-5.92c0.79-0.96,2.21-1.1,3.17-0.31c0.96,0.79,1.1,2.21,0.31,3.17l-6.74,8.2 c-0.15,0.19-0.33,0.36-0.54,0.51c-1.03,0.69-2.43,0.42-3.12-0.62L17.07,62.7L17.07,62.7z M17.07,45.38 c-0.69-1.03-0.42-2.43,0.62-3.12c1.03-0.69,2.43-0.42,3.12,0.62l1.23,1.82l4.87-5.93c0.79-0.96,2.21-1.1,3.17-0.31 c0.96,0.79,1.1,2.21,0.31,3.17l-6.74,8.2c-0.15,0.19-0.33,0.36-0.54,0.51c-1.03,0.69-2.43,0.42-3.12-0.62L17.07,45.38L17.07,45.38z M69.2,122.21c-0.45,0.4-1.07,0.67-1.7,0.67c-0.13,0-0.27,0-0.4-0.04H5.62c-1.52,0-2.94-0.62-3.97-1.65 C0.62,120.16,0,118.78,0,117.21l0-97.36c0-1.56,0.62-2.94,1.65-3.97c1.03-1.03,2.41-1.65,3.97-1.65h14.63v-2.77 c0-1.03,0.4-1.96,1.12-2.68c0.67-0.67,1.61-1.12,2.68-1.12h8.66V4.19c0-1.16,0.49-2.19,1.25-2.94C34.71,0.49,35.74,0,36.9,0h26.37 c1.16,0,2.19,0.49,2.94,1.25c0.76,0.76,1.25,1.78,1.25,2.94v3.48h7.81c1.03,0,1.96,0.45,2.68,1.12c0.67,0.67,1.12,1.65,1.12,2.68 v2.77h14.63c1.56,0,2.94,0.62,3.97,1.65c1.03,1.03,1.65,2.41,1.65,3.97v70.23c0.2,1.01-0.01,1.79-0.76,2.54l-29.05,29.4 c-0.09,0.09-0.13,0.13-0.22,0.18H69.2L69.2,122.21z M64.96,117.79c0-33.62-4.24-29.63,29.22-29.63V19.85c0-0.13-0.04-0.31-0.18-0.4 c-0.09-0.09-0.22-0.18-0.4-0.18l-14.63,0v5.09c0,1.03-0.4,1.96-1.12,2.68c-0.67,0.67-1.61,1.12-2.68,1.12H24 c-1.03,0-2.01-0.45-2.68-1.12c-0.09-0.09-0.13-0.18-0.22-0.27c-0.54-0.67-0.89-1.52-0.89-2.41v-5.09H5.58 c-0.13,0-0.31,0.04-0.4,0.18C5.09,19.54,5,19.72,5,19.85v97.36c0,0.18,0.04,0.31,0.18,0.4c0.09,0.09,0.22,0.18,0.4,0.18h59.34 H64.96L64.96,117.79z M41.23,81.8c-1.38,0-2.54-1.12-2.54-2.54c0-1.38,1.12-2.54,2.54-2.54h24.13c1.38,0,2.54,1.12,2.54,2.54 c0,1.38-1.12,2.54-2.54,2.54H41.23L41.23,81.8z M41.23,45.52c-1.38,0-2.54-1.12-2.54-2.54c0-1.38,1.12-2.54,2.54-2.54h37.16 c1.38,0,2.54,1.12,2.54,2.54c0,1.38-1.12,2.54-2.54,2.54L41.23,45.52L41.23,45.52z M41.23,63.66c-1.38,0-2.54-1.12-2.54-2.54 c0-1.38,1.12-2.54,2.54-2.54h37.16c1.38,0,2.54,1.12,2.54,2.54c0,1.38-1.12,2.54-2.54,2.54H41.23L41.23,63.66z" />
                </g>
              </svg>
              <p className="text-sm text-gray-500">Assignments</p>
            </a>

            <a className="rounded-lg border shadow-sm flex items-center justify-between p-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 67 67"
                wwidth="40"
                height="40"
              >
                <path d="M61.8 7.3h-5.6c-.1-3.2-2.7-5.5-5.6-5.5H8c-3.6 0-6.5 2.9-6.5 6.5v53.2c0 2.1 1.7 3.7 3.7 3.7H43c2.1 0 3.7-1.7 3.7-3.7V52l4.6 8.7c.2.3.5.5.9.5h.1c.4 0 .7-.3.9-.7l1-3.2 3.1 1.9c.4.2.8.2 1.2-.1.3-.3.4-.7.3-1.1l-3.4-9c1.7-.7.9-2.7 1.1-4.4l2.3-1.3c.9-.5 1.2-1.6.7-2.5l-1.3-2.3 1.4-2.3c.5-.9.2-2-.7-2.5l-2.3-1.3v-2.7c0-1-.8-1.9-1.9-1.9H52l-1.3-2.3c-.5-.9-1.6-1.2-2.5-.7l-1.3.8v-2.2h13c3.2 0 5.7-2.6 5.7-5.8v-6.5c-.1-2.1-1.8-3.8-3.8-3.8zM43.1 63.2H5.2c-1 0-1.7-.8-1.7-1.7V8.3c0-2.5 2-4.5 4.5-4.5h38.1c-.9 1-1.3 2.5-1.3 3.7v18.1l-1.3-.8c-.8-.4-1.7-.2-2.2.4-.1.1-.1.2-.2.3l-1.3 2.3H37c-.4 0-.7.1-1 .3-.5.3-.8.9-.8 1.5v2.7l-2.3 1.3c-.2.1-.4.3-.6.6-.3.5-.4 1.1-.2 1.7 0 .1.1.2.1.2l1.3 2.3-1.4 2.4c0 .1-.1.2-.1.3-.3.7-.1 1.5.5 2l.3.3 2.3 1.3c0 2.1-.4 3.7 1.1 4.4l-3.4 9c-.2.4 0 .8.3 1.1.3.3.8.3 1.2.1l3.1-1.9 1 3.2c.1.4.5.7.9.7h.1c.4 0 .7-.2.9-.5l4.6-8.7v9.4c-.1.9-.9 1.7-1.8 1.7zm-.7-10.8-2.8 5.2-.7-2.1c-.1-.3-.3-.5-.6-.6-.1 0-.2-.1-.4-.1s-.4 0-.5.1l-1.7 1 2.6-6.8h1.3v.1c1 1.6 1.4 3.1 2.8 3.2zM54.2 55c-.3-.2-.6-.2-.9-.1-.3.1-.5.3-.6.6l-.7 2.1-2.8-5.2c1.6-.2 1.8-2 2.7-3.2h1.3l2.6 6.9-1.6-1.1zM49 26.6l1.5 2.7c.2.3.5.5.9.5h3.1v3.1c0 .4.2.7.5.9l2.7 1.5-1.5 2.7c-.2.3-.2.7 0 1l1.6 2.7-2.8 1.6c-.3.2-.5.5-.5.9v3.1h-3.1c-1 0-1 1-2.4 3.2-2.9-1.7-3.1-1.9-3.7-1.6-.1.1-1.4.8-1.3.8-.1.1-1.5.9-1.4.8-.1-.1-1.7-2.9-1.6-2.7-.5-.8-1.5-.4-4-.5-.1-2.9.2-3.3-.3-3.8l-.2-.2-2.7-1.5 1.6-2.7c.2-.3.2-.7 0-1l-1.6-2.7 2.7-1.5c.2-.1.3-.3.4-.5.1-.1.1-.3.1-.4v-3.1h3.1c.3 0 .5-.1.7-.3l.2-.2 1.5-2.7 1.3.8 1.4.8c.3.2.7.2 1 0l2.8-1.7zm-2.2-5.2V7.5c0-2 1.6-3.7 3.7-3.7 1.8 0 3.7 1.5 3.7 3.7v10.2c0 .4 0 .7.1 1.1.2.8.6 1.9 1.2 2.6h-8.7zm16.7-3.9c0 1.8-1.3 3.5-3 3.8-2.2.4-4.3-1.3-4.3-3.6V9.3h5.6c1 0 1.7.8 1.7 1.7v6.5z"></path>
                <path d="M19.8 56.2H8.9c-.6 0-1 .4-1 1s.4 1 1 1h10.8c.6 0 1-.4 1-1s-.4-1-.9-1zm11.7-9.1H8.9c-.6 0-1 .4-1 1s.4 1 1 1h22.6c.6 0 1-.4 1-1s-.4-1-1-1zM8.9 37.9c-.6 0-1 .4-1 1s.4 1 1 1h12.3c.6 0 1-.4 1-1s-.4-1-1-1H8.9zm22-8.2c0-.6-.4-1-1-1h-21c-.6 0-1 .4-1 1s.4 1 1 1h20.9c.6 0 1.1-.4 1.1-1zm-7.6-13.2h3.1v3.1c0 .6.4 1 1 1s1-.4 1-1v-3.1h3.1c.6 0 1-.4 1-1s-.4-1-1-1h-3.1v-3.1c0-.6-.4-1-1-1-.5 0-1 .4-1 1v3.1h-3.1c-.6 0-1 .4-1 1s.5 1 1 1zm15.1 22c0 4.1 3.3 7.4 7.4 7.4 4.1 0 7.4-3.3 7.4-7.4 0-4.1-3.3-7.4-7.4-7.4-4.1 0-7.4 3.3-7.4 7.4zm12.8 0c0 3-2.4 5.4-5.4 5.4-3 0-5.4-2.4-5.4-5.4 0-3 2.4-5.4 5.4-5.4 3 0 5.4 2.4 5.4 5.4zM8.5 23.7c.5.2 1.1 0 1.3-.5l1.5-3.6h6.9l1.4 3.6c.2.4.5.6.9.6.1 0 .2 0 .4-.1.5-.2.8-.8.6-1.3L16 8c-.1-.4-.5-.6-.9-.6s-.8.2-.9.6L8 22.4c-.2.5 0 1.1.5 1.3zM15 11l2.5 6.5h-5.3L15 11z"></path>
              </svg>
              <p className="text-sm text-gray-500">Academic scores</p>
            </a>
          </>
        )}
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {userRole === "admin" && (
          <div className="bg-white rounded-md p-4">
            <AdmissionGrowth />
          </div>
        )}
        {userRole === "student" && (
          <>
            <div className="bg-white rounded-md p-4">
              <GetAttendance />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
