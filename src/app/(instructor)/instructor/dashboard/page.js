// src/app/(instructor)/instructor/dashboard/page.js
'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { useState, useEffect } from 'react';
import {
  Play, Monitor, Users, Trophy, BookOpen, Star, Edit, Plus, Trash2, Eye, UserPlus, GraduationCap, TrendingUp, Award, Clock
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_BASE_URL = 'http://localhost:8080';

export default function InstructorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const [stats, setStats] = useState({
    totalMyCourses: 0,
    publishedCourses: 0,
    totalStudentsEnrolled: 0,
    totalInstructors: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [ratingData, setRatingData] = useState({
    averageRating: 0,
    ratings: [
      { stars: 5, percentage: 0 },
      { stars: 4, percentage: 0 },
      { stars: 3, percentage: 0 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ]
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch user data
      console.log('Fetching user data...');
      const userResponse = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (userResponse.ok) {
        const user = await userResponse.json();
        console.log('User data received:', user);
        setUserData(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error('Failed to fetch user data:', userResponse.status);
        // Try to get from localStorage as fallback
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('Using stored user data:', parsedUser);
          setUserData(parsedUser);
        }
      }
      
      // Fetch instructor's courses
      const coursesResponse = await fetch(`${API_BASE_URL}/api/courses/my-courses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      let courses = [];
      if (coursesResponse.ok) {
        courses = await coursesResponse.json();
        console.log('Courses received:', courses);
        
        // Fetch enrollment count for each course
        const coursesWithEnrollments = await Promise.all(
          courses.map(async (course) => {
            try {
              let studentCount = 0;
              
              if (course.studentsCount) studentCount = course.studentsCount;
              else if (course.enrolledCount) studentCount = course.enrolledCount;
              
              if (studentCount === 0) {
                const enrollmentsResponse = await fetch(`${API_BASE_URL}/api/enrollments/course/${course.id}`, {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (enrollmentsResponse.ok) {
                  const enrollments = await enrollmentsResponse.json();
                  studentCount = enrollments.length;
                }
              }
              
              if (studentCount === 0) {
                const countResponse = await fetch(`${API_BASE_URL}/api/enrollments/course/${course.id}/count`, {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (countResponse.ok) {
                  studentCount = await countResponse.json();
                }
              }
              
              return {
                ...course,
                studentCount: studentCount
              };
            } catch (err) {
              console.error(`Failed to fetch enrollment count for course ${course.id}:`, err);
              return { ...course, studentCount: 0 };
            }
          })
        );
        
        setMyCourses(coursesWithEnrollments || []);
      }
      
      // Calculate stats
      const totalMyCourses = courses?.length || 0;
      const publishedCourses = courses?.filter(c => c.published === true).length || 0;
      
      let totalStudentsEnrolled = 0;
      const coursesWithCounts = myCourses.length > 0 ? myCourses : courses;
      coursesWithCounts?.forEach(course => {
        totalStudentsEnrolled += course.studentCount || 0;
      });
      
      let instructorsCount = 0;
      try {
        const instructorsResponse = await fetch(`${API_BASE_URL}/api/users/instructors`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (instructorsResponse.ok) {
          const instructors = await instructorsResponse.json();
          setAllInstructors(instructors || []);
          instructorsCount = instructors?.length || 0;
        }
      } catch (err) {
        console.error('Failed to fetch instructors:', err);
      }
      
      setStats({
        totalMyCourses: totalMyCourses,
        publishedCourses: publishedCourses,
        totalStudentsEnrolled: totalStudentsEnrolled,
        totalInstructors: instructorsCount
      });
      
      // Fetch recent enrollments
      try {
        const allEnrollments = [];
        for (const course of courses) {
          const response = await fetch(`${API_BASE_URL}/api/enrollments/course/${course.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const enrollments = await response.json();
            allEnrollments.push(...enrollments.map(e => ({ ...e, courseTitle: course.title })));
          }
        }
        
        const sortedEnrollments = allEnrollments.sort((a, b) => 
          new Date(b.enrolledAt) - new Date(a.enrolledAt)
        ).slice(0, 5);
        
        const activities = sortedEnrollments.map(enrollment => ({
          user: enrollment.studentName || enrollment.student?.name || 'Student',
          action: 'enrolled in',
          course: enrollment.courseTitle,
          time: new Date(enrollment.enrolledAt).toLocaleDateString(),
          avatar: `https://ui-avatars.com/api/?background=2563EB&color=fff&name=${(enrollment.studentName || 'S')?.charAt(0)}`
        }));
        setRecentActivities(activities);
      } catch (err) {
        console.error('Failed to fetch enrollments:', err);
      }
      
      // Calculate rating statistics
      let totalRating = 0;
      let ratingCount = 0;
      const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      
      courses?.forEach(course => {
        if (course.reviews && course.reviews.length > 0) {
          course.reviews.forEach(review => {
            totalRating += review.rating;
            ratingCount++;
            ratingDistribution[review.rating]++;
          });
        }
      });
      
      const averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;
      const ratingPercentages = [5, 4, 3, 2, 1].map(stars => ({
        stars,
        percentage: ratingCount > 0 ? (ratingDistribution[stars] / ratingCount) * 100 : 0
      }));
      
      setRatingData({
        averageRating: parseFloat(averageRating),
        ratings: ratingPercentages
      });
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setMyCourses(prev => prev.filter(c => c.id !== courseId));
          alert('Course deleted successfully');
          fetchDashboardData();
        } else {
          throw new Error('Failed to delete course');
        }
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  const StarRow = ({ count, filled }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Get the actual name from userData (what they signed up with)
  // Check multiple possible fields where the name could be stored
  const displayName = userData?.name || userData?.fullName || userData?.username || 'Instructor';
  const userEmail = userData?.email || '';
  const userRole = userData?.role || 'Instructor';
  const userInitial = displayName?.charAt(0)?.toUpperCase() || 'I';
  
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  // Debug log to see what userData contains
  console.log('UserData in dashboard:', userData);
  console.log('Display name:', displayName);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar
          greeting={greeting}
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
          userName={displayName}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">

          {/* Welcome Section with Dynamic Name */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting}, {displayName}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Here's your teaching performance at a glance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-2xl">{stats.totalMyCourses}</p>
                  <p className="text-gray-400 text-xs">My Courses</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <Monitor size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-2xl">{stats.publishedCourses}</p>
                  <p className="text-gray-400 text-xs">Published</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-2xl">{stats.totalStudentsEnrolled}</p>
                  <p className="text-gray-400 text-xs">Total Students</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <GraduationCap size={20} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-2xl">{stats.totalInstructors}</p>
                  <p className="text-gray-400 text-xs">Instructors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-base">{displayName}</p>
              <p className="text-gray-400 text-sm">{userEmail}</p>
              <p className="text-xs text-blue-600 mt-0.5 capitalize">{userRole.toLowerCase()}</p>
            </div>
            <Link href="/instructor/profile" className="flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all">
              <Edit size={13} /> Edit Profile
            </Link>
          </div>

          {/* My Courses Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="font-bold text-gray-900 text-base">My Courses</h2>
                <p className="text-gray-400 text-xs mt-0.5">Manage and track your course performance</p>
              </div>
              <Link href="/instructor/createcourse" className="flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
                <Plus size={14} /> Create New Course
              </Link>
            </div>
            
            {myCourses.length === 0 ? (
              <div className="p-8 text-center">
                <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
                <h3 className="font-semibold text-gray-800 mb-2">No Courses Yet</h3>
                <p className="text-gray-500 text-sm mb-4">Start creating your first course to share your knowledge</p>
                <Link href="/instructor/createcourse" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all">
                  <Plus size={16} /> Create Course
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {myCourses.map((course) => (
                  <div key={course.id} className="p-4 sm:p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img 
                        src={course.thumbnailUrl || course.thumbnail || 'https://via.placeholder.com/600x400?text=Course+Image'} 
                        alt={course.title} 
                        className="w-full sm:w-32 h-24 rounded-lg object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Course+Image'; }}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/instructor/courses/${course.id}/edit`} className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                              <Edit size={16} />
                            </Link>
                            <button onClick={(e) => handleDeleteCourse(course.id, e)} className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                              <Trash2 size={16} />
                            </button>
                            <Link href={`/courses/${course.id}`} target="_blank" className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                              <Eye size={16} />
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{course.rating || course.averageRating || 4.5}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-500 font-semibold">
                              {course.studentCount || 0} student{course.studentCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${course.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {course.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Row: Activity + Rating */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h2 className="font-bold text-gray-900 text-sm mb-4">Recent Student Activity</h2>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No recent activities</p>
                ) : (
                  recentActivities.slice(0, 5).map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <img src={a.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          <strong>{a.user}</strong> {a.action} <strong>{a.course}</strong>
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Overall Course Rating */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <h2 className="font-bold text-gray-900 text-sm mb-4">Course Ratings</h2>

              <div className="flex gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center w-28 sm:w-32 flex-shrink-0">
                  <p className="font-extrabold text-gray-900 text-3xl leading-none">{ratingData.averageRating}</p>
                  <StarRow count={5} filled={Math.round(ratingData.averageRating)} />
                  <p className="text-[11px] text-gray-500 mt-1">Overall Rating</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-700">{myCourses.length}</p>
                    <p className="text-xs text-gray-400">Total Courses</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {ratingData.ratings.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <StarRow count={5} filled={r.stars} />
                    <span className="text-xs text-gray-500 w-10 flex-shrink-0">{r.stars} Star</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.percentage}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">
                      {r.percentage >= 1 ? `${Math.round(r.percentage)}%` : '<1%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <InstructorFooter />
      </div>
    </div>
  );
}