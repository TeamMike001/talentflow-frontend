// src/app/(instructor)/instructor/instructorcourses/[id]/assignments/[assignmentId]/submissions/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { 
  Users, FileText, Calendar, CheckCircle, XCircle, Clock, 
  Download, Eye, MessageCircle, Star, ChevronLeft, Search,
  Filter, Award, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = 'http://localhost:8080';

export default function AssignmentSubmissions() {
  const { id: courseId, assignmentId } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [gradeData, setGradeData] = useState({ score: '', feedback: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [courseId, assignmentId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/signin');
        return;
      }

      // Fetch assignment details
      const assignmentResponse = await fetch(`${API_BASE_URL}/api/courses/${courseId}/assignments/${assignmentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (assignmentResponse.ok) {
        const assignmentData = await assignmentResponse.json();
        setAssignment(assignmentData);
      } else {
        throw new Error('Failed to fetch assignment details');
      }

      // Fetch course details
      const courseResponse = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (courseResponse.ok) {
        const courseData = await courseResponse.json();
        setCourse(courseData);
      }

      // Fetch submissions
      const submissionsResponse = await fetch(`${API_BASE_URL}/api/assignments/${assignmentId}/submissions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (submissionsResponse.ok) {
        const submissionsData = await submissionsResponse.json();
        setSubmissions(submissionsData);
      } else {
        setSubmissions([]);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError(err.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async (submissionId) => {
    if (!gradeData.score || gradeData.score < 0 || gradeData.score > (assignment?.maxScore || 100)) {
      alert(`Please enter a valid score between 0 and ${assignment?.maxScore || 100}`);
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/submissions/${submissionId}/grade?score=${gradeData.score}&feedback=${encodeURIComponent(gradeData.feedback)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Submission graded successfully!');
        setGradeModalOpen(false);
        setSelectedSubmission(null);
        setGradeData({ score: '', feedback: '' });
        fetchData(); // Refresh submissions
      } else {
        throw new Error('Failed to grade submission');
      }
    } catch (err) {
      console.error('Failed to grade submission:', err);
      alert('Failed to grade submission');
    } finally {
      setSubmitting(false);
    }
  };

  const openGradeModal = (submission) => {
    setSelectedSubmission(submission);
    setGradeData({
      score: submission.score || '',
      feedback: submission.feedback || ''
    });
    setGradeModalOpen(true);
  };

  const getStatusBadge = (submission) => {
    if (submission.score !== undefined && submission.score !== null) {
      return (
        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          <CheckCircle size={12} /> Graded: {submission.score}/{assignment?.maxScore}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
        <Clock size={12} /> Pending Review
      </span>
    );
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.studentEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'graded' && submission.score !== undefined && submission.score !== null) ||
                         (statusFilter === 'pending' && (submission.score === undefined || submission.score === null));
    return matchesSearch && matchesStatus;
  });

  const submittedCount = submissions.length;
  const gradedCount = submissions.filter(s => s.score !== undefined && s.score !== null).length;
  const pendingCount = submittedCount - gradedCount;
  const averageScore = gradedCount > 0 
    ? (submissions.reduce((sum, s) => sum + (s.score || 0), 0) / gradedCount).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title="Assignment Submissions" />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-4 transition-colors"
              >
                <ChevronLeft size={18} /> Back to Assignments
              </button>
              
              <h1 className="text-2xl font-bold text-gray-900">{assignment?.title || 'Assignment Submissions'}</h1>
              <p className="text-gray-500 mt-1">
                {course?.title} • Due: {assignment?.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">{error}</div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{submittedCount}</p>
                    <p className="text-xs text-gray-500">Total Submissions</p>
                  </div>
                  <FileText size={24} className="text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{gradedCount}</p>
                    <p className="text-xs text-gray-500">Graded</p>
                  </div>
                  <CheckCircle size={24} className="text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                    <p className="text-xs text-gray-500">Pending Review</p>
                  </div>
                  <Clock size={24} className="text-yellow-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{averageScore}</p>
                    <p className="text-xs text-gray-500">Average Score</p>
                  </div>
                  <Award size={24} className="text-purple-500" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by student name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Submissions</option>
                    <option value="graded">Graded</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Users size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No submissions found</p>
                <p className="text-sm text-gray-400 mt-1">Students haven't submitted this assignment yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="bg-white rounded-2xl border p-6 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {submission.studentName?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{submission.studentName || 'Student'}</h3>
                            <p className="text-xs text-gray-500">{submission.studentEmail || submission.student?.email}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 space-y-2">
                          {submission.content && (
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {submission.content}
                            </p>
                          )}
                          
                          {submission.attachmentUrl && (
                            <a
                              href={submission.attachmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                            >
                              <Download size={14} /> Download Attachment
                            </a>
                          )}
                          
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} /> Submitted: {new Date(submission.submittedAt).toLocaleString()}
                            </span>
                            {getStatusBadge(submission)}
                          </div>
                          
                          {submission.feedback && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs font-medium text-gray-700 mb-1">Feedback:</p>
                              <p className="text-sm text-gray-600">{submission.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {submission.score === undefined || submission.score === null ? (
                          <button
                            onClick={() => openGradeModal(submission)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors"
                          >
                            <Star size={14} /> Grade
                          </button>
                        ) : (
                          <button
                            onClick={() => openGradeModal(submission)}
                            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-xl text-sm hover:bg-blue-50 transition-colors"
                          >
                            <Edit size={14} /> Regrade
                          </button>
                        )}
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

      {/* Grade Modal */}
      {gradeModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Grade Submission</h2>
              <button
                onClick={() => setGradeModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Student: <span className="font-medium text-gray-900">{selectedSubmission.studentName}</span></p>
              <p className="text-sm text-gray-500 mt-1">Assignment: <span className="font-medium text-gray-900">{assignment?.title}</span></p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Score (max: {assignment?.maxScore || 100})
              </label>
              <input
                type="number"
                value={gradeData.score}
                onChange={(e) => setGradeData({ ...gradeData, score: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max={assignment?.maxScore || 100}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
              <textarea
                value={gradeData.feedback}
                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Provide feedback to the student..."
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleGradeSubmission(selectedSubmission.id)}
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Saving...' : 'Submit Grade'}
              </button>
              <button
                onClick={() => setGradeModalOpen(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}