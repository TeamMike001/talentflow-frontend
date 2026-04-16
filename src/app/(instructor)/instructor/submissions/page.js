'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { Users, CheckCircle, Clock, XCircle, Eye, FileText, Calendar, Send, X, Download, Image, File, Award, RefreshCw } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function InstructorSubmissions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [gradeForm, setGradeForm] = useState({ score: '', feedback: '' });
  const [grading, setGrading] = useState(false);
  const [viewingFile, setViewingFile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchAllSubmissions();
  }, [router]);

  const refreshSubmissions = async () => {
    setRefreshing(true);
    await fetchAllSubmissions();
    setRefreshing(false);
  };

  const fetchAllSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      console.log('=== FETCHING SUBMISSIONS ===');
      
      const coursesResponse = await fetch(`${API_BASE_URL}/api/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (coursesResponse.ok) {
        const courses = await coursesResponse.json();
        console.log('Courses:', courses);
        let allSubmissions = [];
        
        for (const course of courses) {
          console.log(`Fetching assignments for course: ${course.id} - ${course.title}`);
          
          const assignmentsResponse = await fetch(`${API_BASE_URL}/api/courses/${course.id}/assignments`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (assignmentsResponse.ok) {
            const assignments = await assignmentsResponse.json();
            console.log(`Assignments for course ${course.id}:`, assignments);
            
            for (const assignment of assignments) {
              console.log(`Fetching submissions for assignment: ${assignment.id} - ${assignment.title}`);
              
              const submissionsResponse = await fetch(`${API_BASE_URL}/api/assignments/${assignment.id}/submissions`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (submissionsResponse.ok) {
                const submissionsData = await submissionsResponse.json();
                console.log(`Submissions for assignment ${assignment.id}:`, submissionsData);
                
                allSubmissions.push(...submissionsData.map(s => ({
                  ...s,
                  courseTitle: course.title,
                  assignmentTitle: assignment.title,
                  assignmentId: assignment.id,
                  courseId: course.id,
                  maxScore: assignment.maxScore
                })));
              } else {
                console.log(`No submissions for assignment ${assignment.id}`);
              }
            }
          }
        }
        
        console.log('Total submissions found:', allSubmissions.length);
        // Sort submissions by submitted date (newest first)
        allSubmissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setSubmissions(allSubmissions);
        
        if (allSubmissions.length === 0) {
          setError('No submissions found. Students need to submit assignments first.');
        }
      } else {
        console.error('Failed to fetch courses:', coursesResponse.status);
        setError('Failed to fetch your courses');
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
      setError(err.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const openGradeModal = (submission) => {
    console.log('Opening grade modal for submission:', submission);
    setSelectedSubmission(submission);
    setGradeForm({
      score: submission.score || '',
      feedback: submission.feedback || ''
    });
    setShowGradeModal(true);
  };

  const handleGradeSubmit = async () => {
    if (!gradeForm.score) {
      alert('Please enter a score');
      return;
    }
    
    const scoreNum = parseInt(gradeForm.score);
    if (scoreNum > selectedSubmission.maxScore) {
      alert(`Score cannot exceed ${selectedSubmission.maxScore}`);
      return;
    }
    
    setGrading(true);
    try {
      const token = localStorage.getItem('token');
      
      console.log('Grading submission:', selectedSubmission.id, 'with score:', scoreNum);
      
      // Grade the submission
      const response = await fetch(`${API_BASE_URL}/api/submissions/${selectedSubmission.id}/grade?score=${scoreNum}&feedback=${encodeURIComponent(gradeForm.feedback || '')}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Send notification to student
        try {
          await fetch(`${API_BASE_URL}/api/notifications/send`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              recipientId: selectedSubmission.studentId,
              title: 'Assignment Graded ✨',
              message: `Your assignment "${selectedSubmission.assignmentTitle}" has been graded! You scored ${scoreNum}/${selectedSubmission.maxScore}.`,
              type: 'assignment'
            })
          });
        } catch (notifErr) {
          console.error('Failed to send notification:', notifErr);
        }
        
        alert('Grade submitted successfully! Notification sent to student.');
        setShowGradeModal(false);
        setSelectedSubmission(null);
        // Refresh submissions
        await fetchAllSubmissions();
      } else {
        const errorText = await response.text();
        console.error('Grade submission failed:', errorText);
        throw new Error(errorText || 'Failed to grade submission');
      }
    } catch (err) {
      console.error('Failed to grade:', err);
      alert(err.message || 'Failed to grade submission');
    } finally {
      setGrading(false);
    }
  };

  const getFileIcon = (url) => {
    if (!url) return <File size={16} />;
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <Image size={16} />;
    }
    if (extension === 'pdf') return <FileText size={16} />;
    return <File size={16} />;
  };

  const getStatusBadge = (submission) => {
    if (submission.graded || (submission.score !== null && submission.score !== undefined)) {
      return <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs"><CheckCircle size={12} /> Graded: {submission.score}/{submission.maxScore}</span>;
    }
    if (submission.submittedAt) {
      return <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs"><Clock size={12} /> Pending Review</span>;
    }
    return <span className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full text-xs"><XCircle size={12} /> Not Submitted</span>;
  };

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
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title="Student Submissions" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Submissions</h1>
                <p className="text-gray-500 mt-1">Review and grade student assignment submissions</p>
              </div>
              <button
                onClick={refreshSubmissions}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {error && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-2xl mb-6">
                {error}
              </div>
            )}

            {submissions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No submissions yet</p>
                <p className="text-sm text-gray-400 mt-1">Students will appear here when they submit assignments</p>
                <button
                  onClick={refreshSubmissions}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{submission.studentName || 'Student'}</h3>
                          {getStatusBadge(submission)}
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Course:</span> {submission.courseTitle}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Assignment:</span> {submission.assignmentTitle}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> Submitted: {new Date(submission.submittedAt).toLocaleString()}
                          </span>
                        </p>
                        
                        {/* Show submission content if exists */}
                        {submission.content && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Student's Answer:</p>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.content}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Show attachment if exists */}
                        {submission.attachmentUrl && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Attached File:</p>
                            <button
                              onClick={() => setViewingFile(submission)}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                            >
                              {getFileIcon(submission.attachmentUrl)}
                              <span className="truncate max-w-xs">
                                {submission.attachmentUrl.split('/').pop()}
                              </span>
                              <Eye size={14} />
                            </button>
                          </div>
                        )}
                        
                        {/* If no content and no attachment */}
                        {!submission.content && !submission.attachmentUrl && (
                          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-yellow-700">No content submitted</p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => openGradeModal(submission)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Award size={14} /> {submission.graded || submission.score ? 'Edit Grade' : 'Grade'}
                      </button>
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
      {showGradeModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Grade Submission</h2>
              <button
                onClick={() => setShowGradeModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Student Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Student</p>
                    <p className="font-semibold text-gray-900">{selectedSubmission.studentName || 'Student'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assignment</p>
                    <p className="font-semibold text-gray-900">{selectedSubmission.assignmentTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-semibold text-gray-900">{selectedSubmission.courseTitle}</p>
                  </div>
                </div>
              </div>
              
              {/* Submission Content */}
              {selectedSubmission.content && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Student's Answer</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.content}</p>
                  </div>
                </div>
              )}
              
              {/* File Attachment */}
              {selectedSubmission.attachmentUrl && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Attached File</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(selectedSubmission.attachmentUrl)}
                        <span className="text-sm text-gray-600 break-all">
                          {selectedSubmission.attachmentUrl.split('/').pop()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={selectedSubmission.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          <Download size={14} /> Download
                        </a>
                        <button
                          onClick={() => window.open(selectedSubmission.attachmentUrl, '_blank')}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          <Eye size={14} /> View Fullscreen
                        </button>
                      </div>
                    </div>
                    
                    {/* Image Preview */}
                    {selectedSubmission.attachmentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                      <div className="mt-4">
                        <img
                          src={selectedSubmission.attachmentUrl}
                          alt="Student submission"
                          className="max-w-full max-h-96 rounded-lg border object-contain mx-auto"
                        />
                      </div>
                    )}
                    
                    {/* PDF Preview */}
                    {selectedSubmission.attachmentUrl.match(/\.pdf$/i) && (
                      <div className="mt-4">
                        <iframe
                          src={selectedSubmission.attachmentUrl}
                          className="w-full h-96 rounded-lg border"
                          title="PDF Preview"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Grading Form */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Grade Assignment</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score (max: {selectedSubmission.maxScore})
                  </label>
                  <input
                    type="number"
                    value={gradeForm.score}
                    onChange={(e) => setGradeForm({ ...gradeForm, score: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter score out of ${selectedSubmission.maxScore}`}
                    min="0"
                    max={selectedSubmission.maxScore}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feedback (Optional)</label>
                  <textarea
                    value={gradeForm.feedback}
                    onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide feedback to the student..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleGradeSubmit}
                    disabled={grading || !gradeForm.score}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                  >
                    {grading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <><Send size={16} /> Submit Grade</>
                    )}
                  </button>
                  <button
                    onClick={() => setShowGradeModal(false)}
                    className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* File Viewer Modal */}
      {viewingFile && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">File Preview</h2>
              <button
                onClick={() => setViewingFile(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">
                <strong>Student:</strong> {viewingFile.studentName} | <strong>Assignment:</strong> {viewingFile.assignmentTitle}
              </p>
              
              {viewingFile.attachmentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img
                  src={viewingFile.attachmentUrl}
                  alt="Student submission"
                  className="max-w-full rounded-lg mx-auto"
                />
              ) : viewingFile.attachmentUrl.match(/\.pdf$/i) ? (
                <iframe
                  src={viewingFile.attachmentUrl}
                  className="w-full h-[70vh] rounded-lg"
                  title="PDF Preview"
                />
              ) : (
                <div className="text-center py-12">
                  <File size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-4">Preview not available for this file type</p>
                  <a
                    href={viewingFile.attachmentUrl}
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