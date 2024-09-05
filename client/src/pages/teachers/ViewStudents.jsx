import React, { useEffect, useState } from 'react';
import { getFormattedDate } from './Filterdatetime';
import GetStudents from './students';

const ViewStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { students, loading, error } = GetStudents();

  const filteredStudents = students.filter((student) => {
    const matchesSearchTerm =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenderFilter =
      genderFilter === 'All' || student.gender.toLowerCase() === genderFilter.toLowerCase();

    const matchesStatusFilter =
      statusFilter === 'All' || (statusFilter === 'true' && student.active) || (statusFilter === 'false' && !student.active);

    return matchesSearchTerm && matchesGenderFilter && matchesStatusFilter;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="container p-4 mx-auto overflow-hidden">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Table */}
        <div className="-mx-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {/* Table headers */}
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <span>ID</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Created At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Updated At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th scope="col" className="px-16 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Students
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Father's Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Date of Birth
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {filteredStudents.map((student, id) => {
                    const formattedCreatedAt = getFormattedDate(student.createdAt);
                    const formattedUpdatedAt = getFormattedDate(student.updatedAt);
                    const formattedDOB = getFormattedDate(student.dob);
                    return (
                      <tr key={id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{student.userId}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formattedCreatedAt}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formattedUpdatedAt}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center rounded-full gap-x-2 ${student.active ? 'bg-emerald-100/60 dark:bg-gray-800' : 'bg-red-100/60 dark:bg-gray-800'
                              }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${student.active ? 'bg-emerald-500' : 'bg-red-500'
                                }`}
                            ></span>
                            <h2
                              className={`text-sm font-normal ${student.active ? 'text-emerald-500' : 'text-red-500'
                                }`}
                            >
                            </h2>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <button className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={student.avatar}
                              alt=""
                            />
                            <div>
                              <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                {student.name}
                              </h2>
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {student.email}
                              </p>
                            </div>
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {student.gender}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {student.mobile}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {student.father_name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {formattedDOB}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                            {/* Action icons, e.g., for editing or deleting */}
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
      </div>
    </section>
  );
};

export default ViewStudents;
