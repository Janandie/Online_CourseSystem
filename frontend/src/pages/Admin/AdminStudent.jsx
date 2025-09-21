// src/pages/Admin/AdminStudent.jsx
import React from 'react';
import AdminSideBar from '../../components/AdminSideBar'; // Adjust the path based on your project structure

const AdminStudent = ({ navigateTo }) => {
  const students = [
    { id: 1, name: 'Sophia Clark', email: 'sophia.clark@email.com', enrolledCourses: 5, status: 'Active' },
    { id: 2, name: 'Ethan Miller', email: 'ethan.miller@email.com', enrolledCourses: 2, status: 'Active' },
    { id: 3, name: 'Olivia Davis', email: 'olivia.davis@email.com', enrolledCourses: 1, status: 'Blocked' },
    { id: 4, name: 'Noah Wilson', email: 'noah.wilson@email.com', enrolledCourses: 4, status: 'Active' },
    { id: 5, name: 'Ava Taylor', email: 'ava.taylor@email.com', enrolledCourses: 2, status: 'Active' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 p-0 m-0">
      {/* Render the existing AdminSideBar, hidden on mobile, with mobile toggle */}
      <AdminSideBar navigateTo={navigateTo} className="hidden lg:block" />

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto lg:ml-65 ml-0">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-6">
          <h1 className="text-2xl font-bold mb-4 lg:mb-0">Manage Students</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full lg:w-auto" onClick={() => navigateTo('add-student')}>
            + Add New Student
          </button>
        </div>

        <div className="bg-white p-4 shadow rounded-lg overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="py-2 px-3 text-sm font-semibold text-gray-600">ID</th>
                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Name</th>
                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Email</th>
                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Enrolled Courses</th>
                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="py-2 px-3 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-sm">{student.id}</td>
                  <td className="py-2 px-3 text-sm">{student.name}</td>
                  <td className="py-2 px-3 text-sm">{student.email}</td>
                  <td className="py-2 px-3 text-sm">{student.enrolledCourses}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded text-sm ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminStudent;