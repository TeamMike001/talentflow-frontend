// src/app/(student)/student/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { BookOpen, BookMarked, Star, Users, TrendingUp, Clock, Award, CheckCircle, Circle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({
    totalEnrolled: 0,
    completedCourses: 0,
    averageProgress: 0,
    certificatesEarned: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/signin');
          return;
        }

        // Fetch user data
        const userResponse = await fetch(`${API_BASE_URL}/api/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserData(user);
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Fetch enrolled courses with progress
        const enrolledResponse = await fetch(`${API_BASE_URL}/api/enrollments/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        let enrollments = [];
        let coursesWithProgress = [];
        
        if (enrolledResponse.ok) {
          enrollments = await enrolledResponse.json();
          
          // Fetch full course details for each enrollment
          coursesWithProgress = await Promise.all(
            enrollments.map(async (enrollment) => {
              try {
                const courseResponse = await fetch(`${API_BASE_URL}/api/courses/${enrollment.courseId}`, {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (courseResponse.ok) {
                  const course = await courseResponse.json();
                  return {
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    thumbnail: course.thumbnailUrl,
                    progress: enrollment.progressPercentage || 0,
                    status: enrollment.progressPercentage === 100 ? 'Completed' : 'In Progress',
                    enrolledAt: enrollment.enrolledAt
                  };
                }
              } catch (err) {
                console.error(`Failed to fetch course ${enrollment.courseId}:`, err);
              }
              return null;
            })
          );
          
          coursesWithProgress = coursesWithProgress.filter(c => c !== null);
          setEnrolledCourses(coursesWithProgress);
        }

        // Fetch certificates
        const certResponse = await fetch(`${API_BASE_URL}/api/certificates`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        let certificatesList = [];
        if (certResponse.ok) {
          certificatesList = await certResponse.json();
          setCertificates(certificatesList);
        }

        // Calculate stats
        const totalEnrolled = coursesWithProgress.length;
        const completedCourses = coursesWithProgress.filter(c => c.progress === 100).length;
        const certificatesEarned = certificatesList.length;
        const avgProgress = totalEnrolled > 0 
          ? Math.round(coursesWithProgress.reduce((sum, c) => sum + (c.progress || 0), 0) / totalEnrolled)
          : 0;
        
        setStats({
          totalEnrolled: totalEnrolled,
          completedCourses: completedCourses,
          averageProgress: avgProgress,
          certificatesEarned: certificatesEarned
        });

        // Fetch recommended courses (published courses not enrolled in)
        const recResponse = await fetch(`${API_BASE_URL}/api/courses/published`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (recResponse.ok) {
          let allCourses = await recResponse.json();
          const enrolledIds = new Set(coursesWithProgress.map(c => c.id));
          const recommendedCourses = allCourses.filter(c => !enrolledIds.has(c.id)).slice(0, 4);
          setRecommended(recommendedCourses);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const displayName = userData?.name || userData?.fullName || 'Student';
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 space-y-6">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
              {error}
            </div>
          )}

          {/* Welcome Section */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting}, {displayName} 👋
            </h1>
            <p className="text-gray-500">Here's what's happening with your learning today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalEnrolled}</p>
                  <p className="text-gray-500 text-sm">Courses Enrolled</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stats.completedCourses}</p>
                  <p className="text-gray-500 text-sm">Courses Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stats.averageProgress}%</p>
                  <p className="text-gray-500 text-sm">Avg Progress</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stats.certificatesEarned}</p>
                  <p className="text-gray-500 text-sm">Certificates</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Courses Section */}
          {enrolledCourses.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">My Courses</h2>
                <Link href="/student/courses" className="text-sm text-blue-600 hover:text-blue-700">
                  Browse More Courses →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <img 
                      src={course.thumbnail || 'https://via.placeholder.com/600x400?text=Course'} 
                      alt={course.title} 
                      className="w-full h-36 object-cover" 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course'; }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-1">{course.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`rounded-full h-2 transition-all duration-500 ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{course.progress}%</span>
                      </div>
                      {course.progress === 100 ? (
                        <div className="flex items-center justify-center gap-2 py-2 bg-green-50 text-green-700 text-xs font-semibold rounded-xl">
                          <Award size={14} /> Completed
                        </div>
                      ) : (
                        <Link 
                          href={`/student/courses/${course.id}`} 
                          className="block text-center py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          Continue Learning
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {enrolledCourses.length > 3 && (
                <div className="text-center mt-4">
                  <Link href="/student/courses" className="text-sm text-blue-600 hover:underline">
                    View all {enrolledCourses.length} courses →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Recommended Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Recommended for You</h2>
            {recommended.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recommended.map((course) => (
                  <div key={course.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <img 
                      src={course.thumbnailUrl || 'https://via.placeholder.com/600x400?text=Course'} 
                      alt={course.title} 
                      className="w-full h-40 object-cover" 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course'; }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                      <Link 
                        href={`/student/courses/${course.id}`} 
                        className="block text-center py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
                <p>No recommended courses available at the moment.</p>
                <p className="text-sm mt-1">Check back later for new courses!</p>
              </div>
            )}
          </div>

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-green-800">🎉 Your Certificates</h2>
                <Link href="/student/certifications" className="text-sm text-green-600 hover:text-green-700">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.slice(0, 3).map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Award size={32} className="text-green-600" />
                      <div>
                        <p className="font-semibold text-sm">{cert.courseTitle}</p>
                        <p className="text-xs text-gray-500">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}