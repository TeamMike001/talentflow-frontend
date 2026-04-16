// src/app/(instructor)/instructor/assignments/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { BookOpen, Calendar, Users, Eye, ChevronRight, FileText, Clock, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

export default function InstructorAssignments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchCoursesWithAssignments();
  }, [router]);

  const fetchCoursesWithAssignments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch instructor's courses
      const coursesResponse = await fetch(`${API_BASE_URL}/api/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        
        // Fetch assignments for each course
        const coursesWithAssignments = await Promise.all(
          coursesData.map(async (course) => {
            try {
              const assignmentsResponse = await fetch(`${API_BASE_URL}/api/courses/${course.id}/assignments`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              const assignments = assignmentsResponse.ok ? await assignmentsResponse.json() : [];
              
              // Get submission counts for each assignment
              const assignmentsWithStats = await Promise.all(
                assignments.map(async (assignment) => {
                  try {
                    const submissionsResponse = await fetch(`${API_BASE_URL}/api/assignments/${assignment.id}/submissions`, {
                      headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const submissions = submissionsResponse.ok ? await submissionsResponse.json() : [];
                    const submittedCount = submissions.length;
                    const gradedCount = submissions.filter(s => s.score !== null && s.score !== undefined).length;
                    
                    return {
                      ...assignment,
                      submittedCount,
                      gradedCount,
                      pendingCount: submittedCount - gradedCount
                    };
                  } catch (err) {
                    return { ...assignment, submittedCount: 0, gradedCount: 0, pendingCount: 0 };
                  }
                })
              );
              
              return { ...course, assignments: assignmentsWithStats };
            } catch (err) {
              return { ...course, assignments: [] };
            }
          })
        );
        
        setCourses(coursesWithAssignments);
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const viewAssignmentSubmissions = (courseId, assignmentId) => {
    router.push(`/instructor/instructorcourses/${courseId}/assignments/${assignmentId}/submissions`);
  };

  const getStatusColor = (assignment) => {
    if (assignment.pendingCount === 0 && assignment.submittedCount > 0) return 'text-green-600';
    if (assignment.pendingCount > 0) return 'text-yellow-600';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title="Assignments" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">All Assignments</h1>
              <p className="text-gray-500 mt-1">Manage and grade student submissions across all your courses</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6">{error}</div>
            )}

            {courses.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No courses found</p>
                <button
                  onClick={() => router.push('/instructor/createcourse')}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Create your first course
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                    <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
                          <p className="text-sm text-gray-500 mt-1">
                            {course.assignments?.length || 0} assignment{course.assignments?.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => router.push(`/instructor/instructorcourses/${course.id}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                          Manage Course <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {course.assignments?.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No assignments created for this course yet</p>
                        <button
                          onClick={() => router.push(`/instructor/instructorcourses/${course.id}/assignments`)}
                          className="mt-2 text-blue-600 text-sm hover:underline"
                        >
                          Create Assignment
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {course.assignments.map((assignment) => (
                          <div key={assignment.id} className="p-5 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start flex-wrap gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{assignment.description}</p>
                                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Calendar size={12} /> Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FileText size={12} /> Max Score: {assignment.maxScore}
                                  </span>
                                  <span className={`flex items-center gap-1 ${getStatusColor(assignment)}`}>
                                    <Users size={12} /> {assignment.submittedCount || 0} submitted
                                  </span>
                                  {assignment.pendingCount > 0 && (
                                    <span className="flex items-center gap-1 text-yellow-600">
                                      <Clock size={12} /> {assignment.pendingCount} pending
                                    </span>
                                  )}
                                  {assignment.gradedCount > 0 && (
                                    <span className="flex items-center gap-1 text-green-600">
                                      <CheckCircle size={12} /> {assignment.gradedCount} graded
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => viewAssignmentSubmissions(course.id, assignment.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors"
                              >
                                <Eye size={14} /> View Submissions
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <InstructorFooter />
      </div>
    </div>
  );
}