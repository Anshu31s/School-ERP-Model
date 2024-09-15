import React, { useState } from 'react';
import { getFormattedDate } from './Filterdatetime';
import GetTeachers from '../data/teachers';

const ViewTeachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { teachers, loading, error } = GetTeachers();

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearchTerm =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenderFilter =
      genderFilter === 'All' || teacher.gender.toLowerCase() === genderFilter.toLowerCase();

    const matchesStatusFilter =
      statusFilter === 'All' || (statusFilter === 'true' && teacher.active) || (statusFilter === 'false' && !teacher.active);

    return matchesSearchTerm && matchesGenderFilter && matchesStatusFilter;
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className='flex flex-row justify-between'>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-2 md:px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="min-w-full py-2 align-middle">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800 hidden md:table-header-group">
                <tr>
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
                    Department
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
                {filteredTeachers.map((teacher, id) => {
                  const formattedCreatedAt = getFormattedDate(teacher.createdAt);
                  const formattedUpdatedAt = getFormattedDate(teacher.updatedAt);
                  const formattedDOB = getFormattedDate(teacher.dob);
                  return (
                    <tr key={id} className="block md:table-row">
                      {/* Mobile view stacking */}
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">ID: </span>
                        {teacher.userId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Created At: </span>
                        {formattedCreatedAt}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Updated At: </span>
                        {formattedUpdatedAt}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Status: </span>
                        <div
                          className={`inline-flex items-center rounded-full gap-x-2 ${teacher.active ? 'bg-emerald-100/60 dark:bg-gray-800' : 'bg-red-100/60 dark:bg-gray-800'
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${teacher.active ? 'bg-emerald-500' : 'bg-red-500'
                              }`}
                          ></span>
                          <h2
                            className={`text-sm font-normal ${teacher.active ? 'text-emerald-500' : 'text-red-500'
                              }`}
                          >
                            {teacher.active ? 'Active' : 'Inactive'}
                          </h2>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <button className="flex items-center gap-x-2">
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={teacher.avatar}
                            alt=""
                          />
                          <div>
                            <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                              {teacher.name}
                            </h2>
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                              {teacher.email}
                            </p>
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Gender: </span>
                        {teacher.gender}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Phone: </span>
                        {teacher.mobile}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Department: </span>
                        {teacher.department}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap block md:table-cell">
                        <span className="md:hidden font-bold">Date of Birth: </span>
                        {formattedDOB}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap block md:table-cell">
                        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                          {/* Action icons */}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewTeachers;
