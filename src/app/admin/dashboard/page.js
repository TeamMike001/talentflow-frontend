'use client';

import { useState, useEffect } from 'react';
import { 
  Users, BookOpen, TrendingUp, Search, Trash2, Ban, 
  CheckCircle, AlertCircle, X, ChevronLeft, ChevronRight, 
  Eye, MoreVertical, Filter, Grid3x3, List 
} from 'lucide-react';

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [showFilters, setShowFilters] = useState(false);

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
    
    if (action === 'disable' && userEnrolledCourses && userEnrolledCourses.length > 0) {
      const confirmMsg = `This user is enrolled in ${userEnrolledCourses.length} course(s).\n\nDisabling this account will NOT remove their enrollments, but they won't be able to access them until re-enabled.\n\nAre you sure you want to proceed?`;
      if (!confirm(confirmMsg)) return;
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
    if (userEnrolledCourses && userEnrolledCourses.length > 0) {
      alert(`Cannot delete this user because they are enrolled in ${userEnrolledCourses.length} course(s). Please unenroll them from all courses first.`);
      return;
    }
    
    if (!confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) return;
    
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

  // Filtering logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.enabled !== false) ||
                         (statusFilter === 'disabled' && user.enabled === false);
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-2xl flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );

  // User Card Component (Mobile)
  const UserCard = ({ user }) => {
    const enrolledCourses = getUserEnrolledCourses(user.id);
    const isActionLoading = actionLoading[user.id];
    const [showActions, setShowActions] = useState(false);

    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-3 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base truncate">{user.name}</h3>
              <p className="text-gray-500 text-xs truncate">{user.email}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.enabled !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {user.enabled !== false ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors min-h-[44px]"
            >
              <MoreVertical size={18} className="text-gray-500" />
            </button>
            
            {showActions && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-20 min-w-[160px] py-1">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Eye size={14} /> View Details
                  </button>
                  <button
                    onClick={() => {
                      toggleUserStatus(user.id, user.enabled !== false, enrolledCourses);
                      setShowActions(false);
                    }}
                    disabled={isActionLoading}
                    className="w-full text-left px-4 py-2.5 text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isActionLoading ? (
                      <div className="w-3 h-3 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      user.enabled !== false ? <Ban size={14} /> : <CheckCircle size={14} />
                    )}
                    {user.enabled !== false ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(user.id, enrolledCourses);
                      setShowActions(false);
                    }}
                    disabled={isActionLoading || enrolledCourses.length > 0}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {enrolledCourses.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">
              📚 Enrolled in {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-1">
              {enrolledCourses.slice(0, 2).map(course => (
                <span key={course.id} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                  {course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title}
                </span>
              ))}
              {enrolledCourses.length > 2 && (
                <span className="text-xs text-gray-500 px-2 py-1">+{enrolledCourses.length - 2} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Course Card Component
  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-base flex-1 line-clamp-1">{course.title}</h3>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
          course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {course.published ? 'Published' : 'Draft'}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{course.description || 'No description'}</p>
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Users size={12} /> {course.studentCount || 0} Students
        </span>
        <span className="flex items-center gap-1">
          <BookOpen size={12} /> {course.instructor?.name || course.instructor || 'No instructor'}
        </span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm animate-in slide-in-from-right duration-300">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2 text-sm shadow-lg">
            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
            <span className="flex-1 text-green-700">{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="flex-shrink-0">
              <X size={14} className="text-green-600" />
            </button>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm animate-in slide-in-from-right duration-300">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-sm shadow-lg">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
            <span className="flex-1 text-red-700">{errorMessage}</span>
            <button onClick={() => setErrorMessage('')} className="flex-shrink-0">
              <X size={14} className="text-red-600" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers || 0} 
          icon={Users} 
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard 
          title="Students" 
          value={stats.totalStudents || 0} 
          icon={Users} 
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard 
          title="Instructors" 
          value={stats.totalInstructors || 0} 
          icon={BookOpen} 
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard 
          title="Courses" 
          value={stats.totalCourses || 0} 
          icon={TrendingUp} 
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => {
              setActiveTab('users');
              setCurrentPage(1);
              setSearchQuery('');
            }}
            className={`pb-3 px-1 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'users' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('courses');
              setCurrentPage(1);
              setSearchQuery('');
            }}
            className={`pb-3 px-1 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'courses' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Courses ({courses.length})
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            {activeTab === 'users' && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm min-h-[44px]"
              >
                <Filter size={16} /> Filters
              </button>
            )}
            <button
              onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
              className="lg:hidden px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm min-h-[44px]"
            >
              {viewMode === 'card' ? <List size={16} /> : <Grid3x3 size={16} />}
              {viewMode === 'card' ? 'List' : 'Grid'}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && activeTab === 'users' && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-wrap gap-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="INSTRUCTOR">Instructors</option>
                <option value="ADMIN">Admins</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
              <button
                onClick={() => {
                  setRoleFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {paginatedUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              paginatedUsers.map(user => <UserCard key={user.id} user={user} />)
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm text-gray-600">User</th>
                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Email</th>
                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Role</th>
                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Status</th>
                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Enrolled</th>
                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedUsers.map((user) => {
                    const enrolledCourses = getUserEnrolledCourses(user.id);
                    const isActionLoading = actionLoading[user.id];
                    
                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 text-sm">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            user.enabled !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.enabled !== false ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="p-4">
                          {enrolledCourses.length > 0 ? (
                            <span className="text-blue-600 font-medium text-sm">
                              {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">None</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleUserStatus(user.id, user.enabled !== false, enrolledCourses)}
                              disabled={isActionLoading}
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px]"
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
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px]"
                              title={enrolledCourses.length > 0 ? `Cannot delete: Enrolled in ${enrolledCourses.length} course(s)` : 'Delete User'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
              <div className="text-sm text-gray-500 order-2 sm:order-1">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
              </div>
              <div className="flex gap-2 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px]"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-medium text-sm transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-3">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No courses found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          )}
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowUserModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">User Details</h2>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedUser.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedUser.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedUser.email}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-lg text-xs font-medium ${getRoleBadgeColor(selectedUser.role)}`}>
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm font-medium">Status:</span>
                  <span className={selectedUser.enabled !== false ? 'text-green-600' : 'text-red-600'}>
                    {selectedUser.enabled !== false ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm font-medium">User ID:</span>
                  <span className="text-gray-900 text-sm">{selectedUser.id}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm font-medium">Joined:</span>
                  <span className="text-gray-900 text-sm">
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
