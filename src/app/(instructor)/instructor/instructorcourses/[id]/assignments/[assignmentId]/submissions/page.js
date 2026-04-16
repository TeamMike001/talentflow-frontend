// src/app/(instructor)/instructor/instructorcourses/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { instructorService } from '@/services/instructorService';
import { assignmentService } from '@/services/assignmentService';
import { ChevronRight, Save, Trash2, Eye, FileText, Plus, Edit, X, Calendar, Users, Award, BookOpen, Star, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:8080';

export default function InstructorCourseDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxScore: 100,
  });
  const [submitting, setSubmitting] = useState(false);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchCourseData();
  }, [id, router]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch course details
      const courseResponse = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!courseResponse.ok) throw new Error('Failed to fetch course');
      const courseData = await courseResponse.json();
      setCourse(courseData);
      
      // Fetch student count
      try {
        const enrollmentsResponse = await fetch(`${API_BASE_URL}/api/enrollments/course/${id}/count`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (enrollmentsResponse.ok) {
          const count = await enrollmentsResponse.json();
          setStudentCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch student count:', err);
      }
      
      // Fetch assignments
      try {
        const assignmentsData = await assignmentService.getAssignmentsByCourse(id);
        setAssignments(assignmentsData || []);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
        setAssignments([]);
      }
      
    } catch (err) {
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: course.title,
          description: course.description,
          thumbnailUrl: course.thumbnailUrl,
          published: course.published,
        })
      });
      
      if (response.ok) {
        const updated = await response.json();
        setCourse(updated);
        setIsEditing(false);
        alert('Course updated successfully!');
      } else {
        throw new Error('Failed to update');
      }
    } catch (err) {
      alert(err.message || 'Failed to update course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this course? This cannot be undone.')) return;
    setSaving(true);
    try {
      await instructorService.deleteCourse(id);
      alert('Course deleted successfully');
      router.push('/instructor/instructorcourses');
    } catch (err) {
      alert(err.message || 'Failed to delete course');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (!assignmentForm.title) {
      alert('Assignment title is required');
      return;
    }
    setSubmitting(true);
    try {
      const newAssignment = await assignmentService.createAssignment(id, assignmentForm);
      setAssignments(prev => [...prev, newAssignment]);
      setShowAssignmentModal(false);
      setAssignmentForm({ title: '', description: '', dueDate: '', maxScore: 100 });
      alert('Assignment created successfully!');
    } catch (err) {
      alert(err.message || 'Failed to create assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAssignment = async () => {
    if (!assignmentForm.title) {
      alert('Assignment title is required');
      return;
    }
    setSubmitting(true);
    try {
      const updated = await assignmentService.updateAssignment(editingAssignment.id, assignmentForm);
      setAssignments(prev => prev.map(a => a.id === updated.id ? updated : a));
      setShowAssignmentModal(false);
      setEditingAssignment(null);
      setAssignmentForm({ title: '', description: '', dueDate: '', maxScore: 100 });
      alert('Assignment updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;
    try {
      await assignmentService.deleteAssignment(assignmentId);
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
      alert('Assignment deleted successfully!');
    } catch (err) {
      alert(err.message || 'Failed to delete assignment');
    }
  };

  const openCreateModal = () => {
    setEditingAssignment(null);
    setAssignmentForm({ title: '', description: '', dueDate: '', maxScore: 100 });
    setShowAssignmentModal(true);
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      title: assignment.title,
      description: assignment.description || '',
      dueDate: assignment.dueDate?.slice(0, 16) || '',
      maxScore: assignment.maxScore || 100,
    });
    setShowAssignmentModal(true);
  };

  const viewSubmissions = (assignmentId) => {
    router.push(`/instructor/instructorcourses/${id}/assignments/${assignmentId}/submissions`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Course not found'}</p>
          <button onClick={() => router.push('/instructor/instructorcourses')} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'students', label: 'Students', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="Course Management" />
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <button onClick={() => router.push('/instructor/instructorcourses')} className="hover:text-blue-600">
              My Courses
            </button>
            <ChevronRight size={16} />
            <span className="text-gray-700 font-medium">{course.title}</span>
          </nav>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Edit Course
              </button>
            ) : (
              <>
                <button onClick={handleUpdate} disabled={saving} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-green-700 disabled:bg-gray-400 transition-colors">
                  <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
              </>
            )}
            <button onClick={handleDelete} disabled={saving} className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-red-700 disabled:bg-gray-400 transition-colors">
              <Trash2 size={18} /> Delete
            </button>
          </div>

          {/* Course Info Card */}
          <div className="bg-white rounded-2xl p-8 border shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-80 h-64 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={course.thumbnailUrl || 'https://via.placeholder.com/600x400?text=Course'} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course'; }}
                />
              </div>
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">{course.description || 'No description provided'}</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-green-100 text-green-700">
                        <Users size={16} /> {studentCount} Student{studentCount !== 1 ? 's' : ''} Enrolled
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {course.published ? '✅ Published' : '📝 Draft'}
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-700">
                        <FileText size={16} /> {assignments.length} Assignment{assignments.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Course Title</label>
                      <input 
                        type="text" 
                        value={course.title} 
                        onChange={(e) => setCourse({ ...course, title: e.target.value })} 
                        className="w-full p-4 border rounded-2xl text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea 
                        value={course.description || ''} 
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} 
                        rows={6} 
                        className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your course..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                      <input 
                        type="text" 
                        value={course.thumbnailUrl || ''} 
                        onChange={(e) => setCourse({ ...course, thumbnailUrl: e.target.value })} 
                        placeholder="https://example.com/image.jpg" 
                        className="w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={course.published} 
                        onChange={(e) => setCourse({ ...course, published: e.target.checked })} 
                        className="w-5 h-5 accent-blue-600"
                      />
                      <span className="text-lg">Publish this course</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Course Overview</h2>
              <p className="text-gray-600 leading-relaxed">{course.description || 'No description provided.'}</p>
              
              {course.category && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Category</h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">{course.category}</span>
                </div>
              )}
              
              {course.level && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Level</h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">{course.level}</span>
                </div>
              )}
              
              {course.language && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Language</h3>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">{course.language}</span>
                </div>
              )}
              
              {course.teaches && course.teaches.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">What Students Will Learn</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.teaches.map((item, idx) => <li key={idx} className="text-gray-600">{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Course Assignments</h2>
                <button onClick={openCreateModal} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
                  <Plus size={18} /> Create Assignment
                </button>
              </div>
              {assignments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No assignments created yet</p>
                  <button onClick={openCreateModal} className="mt-3 text-blue-600 hover:underline">Create your first assignment</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border rounded-xl p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{assignment.title}</h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{assignment.description || 'No description'}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Calendar size={14} /> Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}</span>
                            <span className="flex items-center gap-1"><Award size={14} /> Max Score: {assignment.maxScore}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={() => viewSubmissions(assignment.id)} 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="View Submissions"
                          >
                            <Users size={18} />
                          </button>
                          <button 
                            onClick={() => openEditModal(assignment)} 
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteAssignment(assignment.id)} 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Enrolled Students</h2>
              <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-xl">
                <Users size={24} className="text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{studentCount}</p>
                  <p className="text-sm text-gray-600">Total Students Enrolled</p>
                </div>
              </div>
              
              {studentCount === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No students enrolled yet</p>
                  <p className="text-sm mt-1">Share your course link to attract students</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-semibold text-sm">Student</th>
                        <th className="text-left p-3 font-semibold text-sm">Email</th>
                        <th className="text-left p-3 font-semibold text-sm">Enrolled Date</th>
                        <th className="text-left p-3 font-semibold text-sm">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Student data would be fetched from API */}
                      <tr>
                        <td colSpan="4" className="text-center p-8 text-gray-500">
                          Student list will appear here once students enroll
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
        <InstructorFooter />
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}</h2>
              <button onClick={() => setShowAssignmentModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); editingAssignment ? handleUpdateAssignment() : handleCreateAssignment(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input 
                  type="text" 
                  value={assignmentForm.title} 
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })} 
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={assignmentForm.description} 
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })} 
                  rows={4} 
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input 
                  type="datetime-local" 
                  value={assignmentForm.dueDate} 
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })} 
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Max Score</label>
                <input 
                  type="number" 
                  value={assignmentForm.maxScore} 
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, maxScore: parseInt(e.target.value) })} 
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  min="1" 
                  required 
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Saving...' : editingAssignment ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAssignmentModal(false)} 
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition-colors"
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