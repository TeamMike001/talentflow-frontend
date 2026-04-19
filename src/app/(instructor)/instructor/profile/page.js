'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { User, Mail, Calendar, Award, BookOpen, Users, TrendingUp, Edit, Save, X } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function InstructorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: '',
    avatar: ''
  });
  
  const [editForm, setEditForm] = useState({
    name: ''
  });
  
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0
  });
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchUserProfile();
    fetchInstructorStats();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setUser(data);
      setEditForm({
        name: data.name || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructorStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch courses count
      const coursesRes = await fetch(`${API_BASE_URL}/api/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const courses = coursesRes.ok ? await coursesRes.json() : [];
      
      // Fetch total students from all courses
      let totalStudents = 0;
      for (const course of courses) {
        const studentsRes = await fetch(`${API_BASE_URL}/api/enrollments/course/${course.id}/count`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (studentsRes.ok) {
          const count = await studentsRes.json();
          totalStudents += count;
        }
      }
      
      setStats({
        totalCourses: courses.length,
        totalStudents: totalStudents,
        totalRevenue: 0,
        averageRating: 4.5
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleUpdateProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editForm.name
        })
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getInitials = () => {
    if (!user.name) return 'I';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title="Profile" />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Instructor Profile</h1>
              <p className="text-gray-500 mt-1">View your personal information</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                    <p className="text-xs text-gray-500">Total Courses</p>
                  </div>
                  <BookOpen size={24} className="text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                    <p className="text-xs text-gray-500">Total Students</p>
                  </div>
                  <Users size={24} className="text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                    <p className="text-xs text-gray-500">Avg Rating</p>
                  </div>
                  <TrendingUp size={24} className="text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{user.role || 'Instructor'}</p>
                    <p className="text-xs text-gray-500">Role</p>
                  </div>
                  <Award size={24} className="text-purple-500" />
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-4 border-white">
                    {getInitials()}
                  </div>
                  <h2 className="text-xl font-bold text-white mt-3">{user.name || 'Instructor'}</h2>
                  <p className="text-blue-100 text-sm">{user.role || 'Instructor'}</p>
                </div>
              </div>
              
              <div className="p-6">
                {!isEditing ? (
                  // View Mode
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <Mail className="text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <User className="text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Full Name</p>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Edit size={14} /> Edit Name
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Calendar className="text-gray-400" size={18} />
                      <div>
                        <p className="text-xs text-gray-500">Member Since</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Edit Mode - Only Name editing
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={saving}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({ name: user.name });
                        }}
                        className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <InstructorFooter />
      </div>
    </div>
  );
}