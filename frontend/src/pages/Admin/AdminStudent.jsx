"use client"

import { useState, useEffect } from "react"
import { Eye, X } from "lucide-react"
import AdminSideBar from "../../components/AdminSideBar"
import api from "../../api"

const AdminStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: "", email: "" })
  const [editStudent, setEditStudent] = useState(null)
  const [editForm, setEditForm] = useState({ name: "", email: "" })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await api.get("/admin/users")
      const studentList = response.data
        .filter(u => u.role === "STUDENT")
        .map(student => ({
          ...student,
          enrolledCourses: student.enrollments ? student.enrollments.length : 0,
          status: "Active",
        }))
      setStudents(studentList)
      setError(null)
    } catch (err) {
      console.error("Error fetching students:", err)
      setError("Failed to fetch students. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Toggle status
  const handleStatusToggle = (id) => {
    const student = students.find(s => s.id === id)
    const newStatus = student.status === "Active" ? "Blocked" : "Active"
    setStudents(students.map(s => (s.id === id ? { ...s, status: newStatus } : s)))
  }

  // View details
  const handleViewDetails = (student) => {
    console.log("View details for:", student)
  }

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/admin/users", newStudent)
      setStudents([...students, { ...response.data, enrolledCourses: 0, status: "Active" }])
      setNewStudent({ name: "", email: "" })
      setShowAddForm(false)
    } catch (err) {
      console.error("Error adding student:", err)
      setError(err.response?.data?.error || "Failed to add student")
    }
  }

  // Start editing a student
  const handleEditClick = (student) => {
    setEditStudent(student)
    setEditForm({ name: student.name, email: student.email })
  }

  // Save edited student
  const handleUpdateStudent = async (e) => {
    e.preventDefault()
    try {
      const response = await api.put(`/admin/users/${editStudent.id}`, {
        name: editForm.name,
        email: editForm.email,
      })
      setStudents(students.map(s => s.id === editStudent.id ? response.data : s))
      setEditStudent(null)
    } catch (err) {
      console.error("Error updating student:", err)
      setError(err.response?.data?.error || "Failed to update student")
    }
  }

  if (loading) return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 p-6">
        {/* Header + Add Student */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            + Add Student
          </button>
        </div>

        {/* Add Student Form */}
        {showAddForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleAddStudent}>
              <input
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                required
              />
              <input
                type="email"
                placeholder="Student Email"
                value={newStudent.email}
                onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 flex-1"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Add
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Courses</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editStudent?.id === student.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          className="border px-2 py-1 rounded"
                        />
                      ) : student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editStudent?.id === student.id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                          className="border px-2 py-1 rounded"
                        />
                      ) : student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{student.enrolledCourses}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStatusToggle(student.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {student.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                      <button
                        onClick={() => handleViewDetails(student)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {editStudent?.id === student.id ? (
                        <button
                          onClick={handleUpdateStudent}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(student)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {students.map(student => (
              <div key={student.id} className="p-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {editStudent?.id === student.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        className="border px-2 py-1 rounded mb-1"
                      />
                    ) : (
                      <h3 className="font-medium text-gray-900 mb-1">{student.name}</h3>
                    )}
                    <p className="text-sm text-gray-500">ID: {student.id}</p>
                  </div>
                  <button onClick={() => handleViewDetails(student)} className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Email:</span>
                    {editStudent?.id === student.id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{student.email}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Enrolled Courses:</span>
                    <span className="text-sm text-gray-900">{student.enrolledCourses}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <button
                    onClick={() => handleStatusToggle(student.id)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      student.status === "Active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {student.status}
                  </button>
                </div>
                {editStudent?.id === student.id && (
                  <button
                    onClick={handleUpdateStudent}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium w-full"
                  >
                    Save
                  </button>
                )}
                {editStudent?.id !== student.id && (
                  <button
                    onClick={() => handleEditClick(student)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium w-full"
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{students.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Active Students</p>
            <p className="text-2xl font-bold text-green-600">{students.filter(s => s.status === "Active").length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Blocked Students</p>
            <p className="text-2xl font-bold text-red-600">{students.filter(s => s.status === "Blocked").length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStudents
