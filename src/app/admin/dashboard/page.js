// src/app/admin/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, TrendingUp, Search, Trash2, Ban, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://talentflow-backend-9hue.onrender.com';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const statsRes = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsRes.ok) setStats(await statsRes.json());

      const usersRes = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (usersRes.ok) setUsers(await usersRes.json());

      const coursesRes = await fetch(`${API_BASE_URL}/api/admin/courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (coursesRes.ok) setCourses(await coursesRes.json());

    } catch (error) {
      console.error('Failed to fetch data:', error);
      showTemporaryMessage('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showTemporaryMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const toggleUserStatus = async (userId, currentStatus, userEnrolledCourses = []) => {
    const action = currentStatus ? 'disable' : 'enable';
    
    // Check if user has enrolled courses when trying to disable
    if (action === 'disable' && userEnrolledCourses && userEnrolledCourses.length > 0) {
      const courseNames = userEnrolledCourses.map(c => c.title).join(', ');
      const confirmMsg = `This user is enrolled in ${userEnrolledCourses.length} course(s):\n${courseNames}\n\nDisabling this account will NOT remove their enrollments, but they won't be able to access them until re-enabled.\n\nAre you sure you want to proceed?`;
      
      if (!confirm(confirmMsg)) {
        return;
      }
    } else if (!confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }
    
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUsers(prevUsers => prevUsers.map(u => 
          u.id === userId ? { ...u, enabled: data.enabled } : u
        ));
        showTemporaryMessage(data.message || `User ${action}d successfully`, 'success');
      } else {
        showTemporaryMessage(data.error || `Failed to ${action} user`, 'error');
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      showTemporaryMessage('Failed to update user status. Please try again.', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const deleteUser = async (userId, userEnrolledCourses = []) => {
    // Check if user has enrolled courses
    if (userEnrolledCourses && userEnrolledCourses.length > 0) {
      const courseNames = userEnrolledCourses.map(c => c.title).join('\n• ');
      alert(`Cannot delete this user because they are enrolled in ${userEnrolledCourses.length} course(s):\n\n• ${courseNames}\n\nPlease unenroll them from all courses first.`);
      return;
    }
    
    if (!confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
      return;
    }
    
    setActionLoading(prev => ({ ...prev, [userId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
        showTemporaryMessage('User deleted successfully', 'success');
      } else {
        const error = await response.json();
        showTemporaryMessage(error.message || 'Failed to delete user', 'error');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showTemporaryMessage('Failed to delete user. Please try again.', 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const getUserEnrolledCourses = (userId) => {
    // Find courses where this user is enrolled
    return courses.filter(course => 
      course.students && course.students.some(student => student.id === userId)
    );
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-700';
      case 'INSTRUCTOR': return 'bg-blue-100 text-blue-700';
      case 'STUDENT': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
          <CheckCircle size={16} />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
            </div>
            <Users size={32} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents || 0}</p>
            </div>
            <Users size={32} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Instructors</p>
              <p className="text-2xl font-bold">{stats.totalInstructors || 0}</p>
            </div>
            <BookOpen size={32} className="text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Courses</p>
              <p className="text-2xl font-bold">{stats.totalCourses || 0}</p>
            </div>
            <TrendingUp size={32} className="text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-2 font-medium transition-colors ${
            activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 px-2 font-medium transition-colors ${
            activeTab === 'courses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
        >
          Courses
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">User</th>
                  <th className="text-left p-4 font-semibold text-sm">Email</th>
                  <th className="text-left p-4 font-semibold text-sm">Role</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Enrolled Courses</th>
                  <th className="text-left p-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const enrolledCourses = getUserEnrolledCourses(user.id);
                  const isActionLoading = actionLoading[user.id];
                  
                  return (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {user.name?.charAt(0) || 'U'}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                       </td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.enabled !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.enabled !== false ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-4">
                        {enrolledCourses.length > 0 ? (
                          <div className="group relative">
                            <span className="text-blue-600 cursor-help font-medium">
                              {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}
                            </span>
                            <div className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg p-2 mt-1 whitespace-nowrap">
                              {enrolledCourses.map(c => c.title).join(', ')}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleUserStatus(user.id, user.enabled !== false, enrolledCourses)}
                            disabled={isActionLoading}
                            className="p-1 text-yellow-600 hover:bg-yellow-50 rounded transition-colors disabled:opacity-50"
                            title={user.enabled !== false ? 'Disable Account' : 'Enable Account'}
                          >
                            {isActionLoading ? (
                              <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              user.enabled !== false ? <Ban size={16} /> : <CheckCircle size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => deleteUser(user.id, enrolledCourses)}
                            disabled={isActionLoading}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                            title={enrolledCourses.length > 0 ? `Cannot delete: Enrolled in ${enrolledCourses.length} course(s)` : 'Delete User'}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {enrolledCourses.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            {enrolledCourses.length} course(s) - must unenroll first to delete
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{course.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {course.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users size={14} /> 
                  {course.studentCount || 0} Student{course.studentCount !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={14} /> 
                  Instructor: {course.instructor}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}