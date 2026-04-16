// src/app/(student)/student/assignments/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { FileText, Calendar, Award, Upload, Eye, Clock, CheckCircle, AlertCircle, RefreshCw, Send, X, Paperclip, Download } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function StudentAssignments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchEnrolledCourses();
  }, []);

  // First fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      console.log('Fetching enrolled courses...');
      const response = await fetch(`${API_BASE_URL}/api/enrollments/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const enrollments = await response.json();
        console.log('Enrollments:', enrollments);
        
        const courses = enrollments.map(e => ({
          id: e.courseId,
          title: e.courseTitle || `Course ${e.courseId}`,
          enrolledAt: e.enrolledAt
        }));
        
        setEnrolledCourses(courses);
        // After getting enrolled courses, fetch their assignments
        if (courses.length > 0) {
          await fetchAssignmentsForCourses(courses);
        } else {
          setError('You are not enrolled in any courses yet.');
          setLoading(false);
        }
      } else {
        console.error('Failed to fetch enrollments:', response.status);
        setError('Failed to fetch your enrolled courses');
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      setError(error.message || 'Failed to load enrolled courses');
      setLoading(false);
    }
  };

  // Fetch assignments for all enrolled courses
  const fetchAssignmentsForCourses = async (courses) => {
    try {
      const token = localStorage.getItem('token');
      let allAssignments = [];
      let submissionsData = {};
      
      console.log(`Fetching assignments for ${courses.length} courses:`, courses.map(c => c.id));
      
      for (const course of courses) {
        console.log(`\n--- Fetching assignments for course ID: ${course.id} (${course.title}) ---`);
        
        try {
          const assignmentsResponse = await fetch(`${API_BASE_URL}/api/courses/${course.id}/assignments`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (assignmentsResponse.ok) {
            const courseAssignments = await assignmentsResponse.json();
            console.log(`Found ${courseAssignments.length} assignments for course ${course.id}`);
            
            for (const assignment of courseAssignments) {
              // Fetch submission for this assignment
              let submission = null;
              try {
                const submissionResponse = await fetch(`${API_BASE_URL}/api/assignments/${assignment.id}/my-submission`, {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (submissionResponse.ok) {
                  submission = await submissionResponse.json();
                  submissionsData[assignment.id] = submission;
                  console.log(`Found submission for assignment ${assignment.id}`);
                }
              } catch (err) {
                console.log(`No submission for assignment ${assignment.id}`);
              }
              
              allAssignments.push({
                ...assignment,
                courseTitle: course.title,
                courseId: course.id,
                submitted: !!submission,
                submission: submission,
                isOverdue: assignment.dueDate && new Date(assignment.dueDate) < new Date() && !submission,
                isGraded: submission?.score !== null && submission?.score !== undefined
              });
            }
          } else {
            console.log(`No assignments found for course ${course.id}`);
          }
        } catch (err) {
          console.error(`Error fetching assignments for course ${course.id}:`, err);
        }
      }
      
      // Sort assignments by due date
      allAssignments.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      
      console.log(`Total assignments found: ${allAssignments.length}`);
      setAssignments(allAssignments);
      setSubmissions(submissionsData);
      
      if (allAssignments.length === 0) {
        setError('No assignments found for your enrolled courses.');
      } else {
        setError('');
      }
      
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      setError(error.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const refreshAssignments = async () => {
    setRefreshing(true);
    await fetchEnrolledCourses();
    setRefreshing(false);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Upload failed');
    }
    const url = await response.text();
    return url;
  };

  const handleSubmit = async () => {
    if (!submissionFile && !submissionText.trim()) {
      alert('Please either enter text or upload a file');
      return;
    }
    
    setSubmitting(true);
    setUploading(true);
    
    try {
      let fileUrl = null;
      if (submissionFile) {
        fileUrl = await uploadFile(submissionFile);
        console.log('File uploaded:', fileUrl);
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/assignments/${selectedAssignment.id}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          attachmentUrl: fileUrl,
          content: submissionText.trim()
        })
      });
      
      if (response.ok) {
        alert('Assignment submitted successfully!');
        setSelectedAssignment(null);
        setViewingAssignment(null);
        setSubmissionFile(null);
        setSubmissionText('');
        setIsEditing(false);
        await refreshAssignments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit assignment');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert(error.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!submissionFile && !submissionText.trim()) {
      alert('Please either enter text or upload a file');
      return;
    }
    
    setSubmitting(true);
    setUploading(true);
    
    try {
      let fileUrl = viewingAssignment.submission?.attachmentUrl;
      if (submissionFile) {
        fileUrl = await uploadFile(submissionFile);
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/assignments/${selectedAssignment.id}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          attachmentUrl: fileUrl,
          content: submissionText.trim()
        })
      });
      
      if (response.ok) {
        alert('Assignment updated successfully!');
        setSelectedAssignment(null);
        setViewingAssignment(null);
        setSubmissionFile(null);
        setSubmissionText('');
        setIsEditing(false);
        await refreshAssignments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update assignment');
      }
    } catch (error) {
      console.error('Failed to update:', error);
      alert(error.message || 'Failed to update assignment');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSubmissionFile(file);
    }
  };

  const removeFile = () => {
    setSubmissionFile(null);
    if (document.getElementById('file-input')) {
      document.getElementById('file-input').value = '';
    }
  };

  const openAssignmentDetail = (assignment) => {
    setViewingAssignment(assignment);
    setSelectedAssignment(assignment);
    setSubmissionText(assignment.submission?.content || '');
    setIsEditing(false);
  };

  const openEditMode = () => {
    setIsEditing(true);
    setSubmissionText(viewingAssignment.submission?.content || '');
    setSubmissionFile(null);
  };

  const openFilePreview = (url) => {
    setPreviewFile(url);
  };

  const getFileExtension = (url) => {
    if (!url) return '';
    const parts = url.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  const isImageFile = (url) => {
    const ext = getFileExtension(url);
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
  };

  const isPdfFile = (url) => {
    const ext = getFileExtension(url);
    return ext === 'pdf';
  };

  const getStatusBadge = (assignment) => {
    if (assignment.submitted) {
      const submission = assignment.submission;
      if (submission?.score !== null && submission?.score !== undefined) {
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle size={12} /> Graded: {submission.score}/{assignment.maxScore}
          </span>
        );
      }
      return (
        <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs">
          <Clock size={12} /> Submitted
        </span>
      );
    }
    
    if (assignment.isOverdue) {
      return (
        <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
          <AlertCircle size={12} /> Overdue
        </span>
      );
    }
    
    return (
      <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs">
        <Clock size={12} /> Pending
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
                <p className="text-gray-500 mt-1">View and submit your course assignments</p>
                {enrolledCourses.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    You are enrolled in {enrolledCourses.length} course(s)
                  </p>
                )}
              </div>
              <button
                onClick={refreshAssignments}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
            
            {error && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl mb-6">
                {error}
                {error.includes('No assignments found') && enrolledCourses.length === 0 && (
                  <div className="mt-2">
                    <button
                      onClick={() => router.push('/student/courses')}
                      className="text-blue-600 hover:underline"
                    >
                      Browse Courses →
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {assignments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border">
                <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No assignments yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  {enrolledCourses.length === 0 
                    ? "You are not enrolled in any courses yet."
                    : "Your instructors haven't created any assignments for your enrolled courses."}
                </p>
                <button
                  onClick={refreshAssignments}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => openAssignmentDetail(assignment)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-bold text-lg text-gray-900">{assignment.title}</h3>
                          {getStatusBadge(assignment)}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Course: {assignment.courseTitle}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{assignment.description || 'No description provided'}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> 
                            Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award size={14} /> Max Score: {assignment.maxScore}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button 
                          className="text-blue-600 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAssignmentDetail(assignment);
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Assignment Detail Modal */}
      {viewingAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Assignment Details</h2>
              <button
                onClick={() => {
                  setViewingAssignment(null);
                  setSelectedAssignment(null);
                  setSubmissionFile(null);
                  setSubmissionText('');
                  setIsEditing(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Assignment Info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{viewingAssignment.title}</h3>
                <p className="text-gray-500 mb-4">Course: {viewingAssignment.courseTitle}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} /> Due: {viewingAssignment.dueDate ? new Date(viewingAssignment.dueDate).toLocaleDateString() : 'No due date'}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <Award size={16} /> Max Score: {viewingAssignment.maxScore}
                  </span>
                  {getStatusBadge(viewingAssignment)}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-600">{viewingAssignment.description || 'No description provided'}</p>
                </div>
              </div>
              
              {/* Submission Section */}
              {!viewingAssignment.submitted ? (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Submit Your Work</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                    <textarea
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your answer here..."
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attach File (Optional)</label>
                    <div className="flex items-center gap-3">
                      <input
                        id="file-input"
                        type="file"
                        onChange={handleFileSelect}
                        className="flex-1 p-2 border rounded-lg"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                      />
                      {submissionFile && (
                        <button
                          onClick={removeFile}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                    {submissionFile && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <Paperclip size={14} /> {submissionFile.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || (!submissionFile && !submissionText.trim())}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        uploading ? 'Uploading...' : 'Submitting...'
                      ) : (
                        <><Send size={18} /> Submit Assignment</>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setViewingAssignment(null);
                        setSelectedAssignment(null);
                        setSubmissionFile(null);
                        setSubmissionText('');
                      }}
                      className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-6">
                  {!isEditing ? (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Submission</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        {viewingAssignment.submission?.content && (
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-700 mb-1">Your Answer:</h4>
                            <p className="text-gray-600 whitespace-pre-wrap">{viewingAssignment.submission.content}</p>
                          </div>
                        )}
                        {viewingAssignment.submission?.attachmentUrl && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Attached File:</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <button
                                onClick={() => openFilePreview(viewingAssignment.submission.attachmentUrl)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                              >
                                <Eye size={14} /> Preview
                              </button>
                              <a
                                href={viewingAssignment.submission.attachmentUrl}
                                download
                                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm"
                              >
                                <Download size={14} /> Download
                              </a>
                            </div>
                          </div>
                        )}
                        {viewingAssignment.submission?.score !== null && viewingAssignment.submission?.score !== undefined && (
                          <div className="mt-3 pt-3 border-t">
                            <h4 className="font-semibold text-green-700 mb-1">Grade: {viewingAssignment.submission.score}/{viewingAssignment.maxScore}</h4>
                            {viewingAssignment.submission.feedback && (
                              <p className="text-gray-600 mt-1">
                                <span className="font-medium">Feedback:</span> {viewingAssignment.submission.feedback}
                              </p>
                            )}
                          </div>
                        )}
                        {!viewingAssignment.submission?.content && !viewingAssignment.submission?.attachmentUrl && (
                          <p className="text-gray-500">No content submitted</p>
                        )}
                      </div>
                      {!viewingAssignment.isGraded && (
                        <button
                          onClick={openEditMode}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Edit Submission
                        </button>
                      )}
                      {viewingAssignment.isGraded && (
                        <p className="text-center text-gray-500 text-sm mt-2">
                          This assignment has been graded. You cannot edit it anymore.
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Your Submission</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                        <textarea
                          value={submissionText}
                          onChange={(e) => setSubmissionText(e.target.value)}
                          rows={6}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Type your answer here..."
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Attach File (Optional)</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            className="flex-1 p-2 border rounded-lg"
                            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                          />
                          {submissionFile && (
                            <button
                              onClick={removeFile}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <X size={20} />
                            </button>
                          )}
                        </div>
                        {submissionFile && (
                          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                            <Paperclip size={14} /> {submissionFile.name}
                          </p>
                        )}
                        {viewingAssignment.submission?.attachmentUrl && !submissionFile && (
                          <p className="text-sm text-gray-500 mt-2">
                            Current file: {viewingAssignment.submission.attachmentUrl.split('/').pop()}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={handleUpdate}
                          disabled={submitting || (!submissionFile && !submissionText.trim())}
                          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            uploading ? 'Uploading...' : 'Updating...'
                          ) : (
                            <><Send size={18} /> Update Submission</>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setSubmissionFile(null);
                            setSubmissionText(viewingAssignment.submission?.content || '');
                          }}
                          className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setViewingAssignment(null);
                    }}
                    className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors mt-3"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">File Preview</h2>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {isImageFile(previewFile) && (
                <img src={previewFile} alt="Preview" className="max-w-full rounded-lg mx-auto" />
              )}
              {isPdfFile(previewFile) && (
                <iframe src={previewFile} className="w-full h-[70vh] rounded-lg" title="PDF Preview" />
              )}
              {!isImageFile(previewFile) && !isPdfFile(previewFile) && (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">Preview not available for this file type</p>
                  <a
                    href={previewFile}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download size={16} /> Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}