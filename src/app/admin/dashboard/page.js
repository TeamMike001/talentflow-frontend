'use client';
import { useState, useEffect } from 'react';
import { adminService } from '/services/adminService';
import { userService } from '/services/userService';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await adminService.getAllUsers();
      const coursesData = await adminService.getAllCourses();
      setUsers(usersData);
      setCourses(coursesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const promoteToInstructor = async (userId) => {
    await adminService.updateUserRole(userId, 'INSTRUCTOR');
    setUsers(users.map(u => u.id === userId ? { ...u, role: 'INSTRUCTOR' } : u));
  };

  const deleteUser = async (userId) => {
    if (confirm('Delete user?')) {
      await adminService.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <table className="w-full text-left">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="py-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'STUDENT' && <button onClick={() => promoteToInstructor(user.id)} className="text-blue-600 mr-2">Make Instructor</button>}
                  <button onClick={() => deleteUser(user.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">All Courses</h2>
        {courses.map(course => <div key={course.id} className="border-b py-2">{course.title} (Instructor: {course.instructor?.name})</div>)}
      </div>
    </div>
  );
}