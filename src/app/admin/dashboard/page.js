  // src/app/admin/dashboard/page.js - Fixed toggleUserStatus function
  'use client';

  import { useState, useEffect } from 'react';
  import { useRouter } from 'next/navigation';
  import { 
    Users, BookOpen, Calendar, TrendingUp, 
    Search, Trash2, Ban, CheckCircle, Plus, X,
    MapPin, Clock, LogOut
  } from 'lucide-react';

  const API_BASE_URL = 'http://localhost:8080';

  export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users');
    const [searchQuery, setSearchQuery] = useState('');
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventForm, setEventForm] = useState({
      title: '',
      description: '',
      venue: '',
      eventDate: '',
      ticketsAvailable: 50,
      published: true
    });
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!token || user.role !== 'ADMIN') {
        router.push('/admin/login');
        return;
      }
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

        const eventsRes = await fetch(`${API_BASE_URL}/api/admin/events`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (eventsRes.ok) setEvents(await eventsRes.json());

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/admin/login');
    };

    // FIXED: toggleUserStatus function with better error handling
    const toggleUserStatus = async (userId, currentStatus) => {
      const action = currentStatus ? 'disable' : 'enable';
      if (!confirm(`Are you sure you want to ${action} this user?`)) return;
      
      try {
        const token = localStorage.getItem('token');
        console.log(`Toggling user ${userId} status. Current: ${currentStatus}, Action: ${action}`);
        
        const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/toggle-status`, {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log('Response:', data);
        
        if (response.ok) {
          // Update the user in the local state
          setUsers(prevUsers => prevUsers.map(u => 
            u.id === userId ? { ...u, enabled: data.enabled } : u
          ));
          alert(data.message || `User ${action}d successfully`);
        } else {
          alert(data.error || `Failed to ${action} user`);
        }
      } catch (error) {
        console.error('Error toggling user status:', error);
        alert('Failed to update user status. Please check the console for details.');
      }
    };

    const deleteUser = async (userId) => {
      if (!confirm('Are you sure you want to permanently delete this user?')) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setUsers(users.filter(u => u.id !== userId));
          alert('User deleted successfully');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to delete user');
        }
      } catch (error) {
        alert('Failed to delete user');
      }
    };

    const createEvent = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/admin/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(eventForm)
        });
        
        if (response.ok) {
          const data = await response.json();
          setEvents([...events, data.event]);
          setShowEventModal(false);
          setEventForm({
            title: '',
            description: '',
            venue: '',
            eventDate: '',
            ticketsAvailable: 50,
            published: true
          });
          alert('Event created successfully');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to create event');
        }
      } catch (error) {
        alert('Failed to create event');
      } finally {
        setSubmitting(false);
      }
    };

    const deleteEvent = async (eventId) => {
      if (!confirm('Are you sure you want to delete this event?')) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setEvents(events.filter(e => e.id !== eventId));
          alert('Event deleted successfully');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to delete event');
        }
      } catch (error) {
        alert('Failed to delete event');
      }
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
            <p className="text-xs text-gray-500 mt-1">Manage your platform</p>
          </div>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users size={18} /> Manage Users
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={18} /> Manage Courses
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'events' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar size={18} /> Manage Events
            </button>
            <div className="border-t my-4"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 p-8">
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
                      <th className="text-left p-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
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
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleUserStatus(user.id, user.enabled !== false)}
                              className="p-1 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                              title={user.enabled !== false ? 'Disable Account' : 'Enable Account'}
                            >
                              {user.enabled !== false ? <Ban size={16} /> : <CheckCircle size={16} />}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Users size={14} /> {course.studentCount || 0} Students</span>
                    <span className="flex items-center gap-1"><BookOpen size={14} /> Instructor: {course.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Events</h2>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} /> Create Event
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} /> {event.venue || 'Online'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} /> {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} /> {new Date(event.eventDate).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} /> Tickets: {event.ticketsAvailable}
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-4 flex justify-end">
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={14} /> Delete Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Create Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Event</h2>
                <button onClick={() => setShowEventModal(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={createEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={eventForm.eventDate}
                    onChange={(e) => setEventForm({ ...eventForm, eventDate: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Tickets</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={eventForm.ticketsAvailable}
                    onChange={(e) => setEventForm({ ...eventForm, ticketsAvailable: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }