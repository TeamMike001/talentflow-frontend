'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { assignmentService } from '@/services/assignmentService';
import { Plus, Edit, Trash2, Eye, Calendar, FileText, Users, X } from 'lucide-react';

export default function ManageAssignments() {
  const { id: courseId } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxScore: 100,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await assignmentService.getAssignmentsByCourse(courseId);
      setAssignments(data || []);
      setError('');
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
      setError(err.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await assignmentService.createAssignment(courseId, formData);
      alert('Assignment created successfully!');
      setShowModal(false);
      setFormData({ title: '', description: '', dueDate: '', maxScore: 100 });
      await fetchAssignments();
    } catch (err) {
      console.error('Failed to create assignment:', err);
      alert(err.message || 'Failed to create assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await assignmentService.updateAssignment(editingAssignment.id, formData);
      alert('Assignment updated successfully!');
      setShowModal(false);
      setEditingAssignment(null);
      setFormData({ title: '', description: '', dueDate: '', maxScore: 100 });
      await fetchAssignments();
    } catch (err) {
      console.error('Failed to update assignment:', err);
      alert(err.message || 'Failed to update assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
      return;
    }
    try {
      await assignmentService.deleteAssignment(assignmentId);
      alert('Assignment deleted successfully!');
      await fetchAssignments();
    } catch (err) {
      console.error('Failed to delete assignment:', err);
      alert(err.message || 'Failed to delete assignment');
    }
  };

  const openCreateModal = () => {
    setEditingAssignment(null);
    setFormData({ title: '', description: '', dueDate: '', maxScore: 100 });
    setShowModal(true);
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description || '',
      dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 16) : '',
      maxScore: assignment.maxScore,
    });
    setShowModal(true);
  };

  const viewSubmissions = (assignmentId) => {
    router.push(`/instructor/instructorcourses/${courseId}/assignments/${assignmentId}/submissions`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar title="Manage Assignments" onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Course Assignments</h1>
                <p className="text-gray-500 mt-1">Manage assignments for this course</p>
              </div>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
              >
                <Plus size={18} /> Create Assignment
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">{error}</div>
            )}

            {assignments.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No assignments created yet</p>
                <button
                  onClick={openCreateModal}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
                >
                  Create First Assignment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-2xl border p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{assignment.description || 'No description'}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={14} /> Max Score: {assignment.maxScore}
                          </span>
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
        </main>
        <InstructorFooter />
      </div>

      {/* Modal for Create/Edit Assignment */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={editingAssignment ? handleUpdateAssignment : handleCreateAssignment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Week 1 Assignment"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what students need to do..."
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Score
                </label>
                <input
                  type="number"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({ ...formData, maxScore: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? 'Saving...' : (editingAssignment ? 'Update Assignment' : 'Create Assignment')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
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