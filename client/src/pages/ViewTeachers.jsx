import React, { useState } from "react";
import { getFormattedDate } from "./Filterdatetime";

import Teachers from "../hooks/Teachers";
import TeacherDetailPopup from "./interfaces/TeacherDetailPopup";

const ViewTeachers = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setstatusFilter] = useState("");

  const { teachers, totalPages, loading, error } = Teachers(
    page,
    limit,
    searchQuery,
    genderFilter,
    statusFilter
  );

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTeacher(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search"
            className="px-2 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <select
              className="md:mr-4 px-2 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setstatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <select
              className="px-2 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800 hidden xl:table-header-group">
              <tr>
                {/* Table headers */}
                <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  ID
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Created At
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Updated At
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-16 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Teachers
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Gender
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Phone
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Father's Name
                </th>
                <th className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Date of Birth
                </th>
                <th className="relative py-3.5 px-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              {teachers.map((teacher, id) => {
                const formattedCreatedAt = getFormattedDate(teacher.createdAt);
                const formattedUpdatedAt = getFormattedDate(teacher.updatedAt);
                const formattedDOB = getFormattedDate(teacher.dob);
                return (
                  <tr key={id} className="block md:table-row">
                    {/* Mobile view stacking */}
                    <td className="px-4 py-4 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">ID: </span>
                      {teacher.userId}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">Created At: </span>
                      {formattedCreatedAt}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">Updated At: </span>
                      {formattedUpdatedAt}
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">Status: </span>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800 ${
                          teacher.active ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            teacher.active ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-normal ${
                            teacher.active ? "text-emerald-100" : "text-red-100"
                          }`}
                        >
                          {teacher.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                      <button className="flex items-center gap-x-2">
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={teacher.avatar}
                          alt="profile-pic"
                        />
                        <div>
                          <h2 className="ttext-xs font-medium text-gray-800 dark:text-white">
                            {teacher.name}
                          </h2>
                          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                            {teacher.email}
                          </p>
                        </div>
                      </button>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">Gender: </span>
                      {teacher.gender}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">Phone: </span>
                      {teacher.mobile}
                    </td><td className="px-4 py-4 text-xs  text-gray-500 dark:text-gray-300 whitespace-nowrap block xl:table-cell">
                      <span className="xl:hidden font-bold">
                        Father's Name:{" "}
                      </span>
                      {teacher.father_name}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                      <span className="md:hidden font-bold">
                        Date of Birth:{" "}
                      </span>
                      {formattedDOB}
                    </td>
                    <td className="px-4 py-4 text-xs  whitespace-nowrap block xl:table-cell">
                      <button onClick={() => handleViewDetails(teacher)}>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <title>view details</title>
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() =>
            handlePageChange(page < totalPages ? page + 1 : totalPages)
          }
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-md"
        >
          Next
        </button>
      </div>

      {/* Popup Component */}
      {isPopupOpen && selectedTeacher && (
        <TeacherDetailPopup teacher={selectedTeacher} onClose={closePopup} />
      )}
    </section>
  );
};

export default ViewTeachers;
