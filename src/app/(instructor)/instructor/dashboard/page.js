'use client';

import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { useState } from 'react';
import {
  Play, Monitor, Users, Trophy, BookOpen, ChevronDown, Star, Edit, ArrowDown,
} from 'lucide-react';

<<<<<<< HEAD
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
=======
// ── Stat cards data ──────────────────────────────────────────────────────────
const stats = [
  { icon: <Play    size={20} className="text-blue-500"   />, iconBg: 'bg-blue-50',   value: '20',  label: 'Enrolled Courses'  },
  { icon: <Monitor size={20} className="text-purple-500" />, iconBg: 'bg-purple-50', value: '9',   label: 'Active Courses'    },
  { icon: <Users   size={20} className="text-blue-400"   />, iconBg: 'bg-blue-50',   value: '12',  label: 'Course Instructors'},
  { icon: <Trophy  size={20} className="text-green-500"  />, iconBg: 'bg-green-50',  value: '15',  label: 'Completed Courses' },
  { icon: <Users   size={20} className="text-blue-400"   />, iconBg: 'bg-blue-50',   value: '523', label: 'Students'          },
  { icon: <BookOpen size={20} className="text-green-500" />, iconBg: 'bg-green-50',  value: '3',   label: 'Online Courses'    },
];
>>>>>>> parent of 4d42df6 (Complete course)

// ── Activity feed ────────────────────────────────────────────────────────────
const activities = [
  { avatar: 'https://randomuser.me/api/portraits/men/10.jpg',   text: <><strong>Kevin</strong> comments on your lecture &quot;What is ux&quot; in &quot;2026 ui/ux design with figma&quot;</>,   time: 'Just now'   },
  { avatar: 'https://randomuser.me/api/portraits/men/11.jpg',   text: <><strong>John</strong> give a 5 star rating on your course &quot;2026 ui/ux design with figma&quot;</>,                  time: '5 mins ago' },
  { avatar: 'https://randomuser.me/api/portraits/women/12.jpg', text: <><strong>Sraboni</strong> purchase your course &quot;2026 ui/ux design with figma&quot;</>,                               time: '6 mins ago' },
  { avatar: 'https://randomuser.me/api/portraits/men/13.jpg',   text: <><strong>Monir</strong> give a 5 star rating on your course &quot;2026 ui/ux design with figma&quot;</>,                  time: '8 mins ago' },
];

// ── Rating data ──────────────────────────────────────────────────────────────
const ratingBars = [
  { stars: 5, pct: 56   },
  { stars: 4, pct: 37   },
  { stars: 3, pct: 8    },
  { stars: 2, pct: 1    },
  { stars: 1, pct: 0.5  },
];

<<<<<<< HEAD
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
=======
function StarRow({ count, filled }) {
  return (
>>>>>>> parent of 4d42df6 (Complete course)
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
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-14" fill="none">
      <polyline
        points="0,45 25,35 50,42 75,25 100,38 125,20 150,32 175,15 200,28"
        stroke="#3B82F6"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function InstructorDashboard() {
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [activityFilter, setActivityFilter] = useState('Today');
  const [ratingFilter,   setRatingFilter]   = useState('This week');

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

      {/* Sidebar receives open state + close handler */}
      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content — offset by sidebar width only on lg+ */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">

        {/* Navbar receives hamburger click handler */}
        <InstructorNavbar
          greeting="Good Morning"
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">

<<<<<<< HEAD
          {/* Welcome Section with Dynamic Name */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {greeting}, {displayName}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Here's your teaching performance at a glance</p>
          </div>

          {/* Stats Grid */}
=======
          {/* ── Stats Grid — 1 col / 2 col / 4 col ── */}
>>>>>>> parent of 4d42df6 (Complete course)
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-lg sm:text-xl leading-none">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Profile Completion Banner ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Jese Leos"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm">Jese Leos</p>
              <p className="text-gray-400 text-xs">Jese.leos@gmail.com</p>
<<<<<<< HEAD
            </div>

            {/* Progress — full width on mobile, inline on sm+ */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
              <span className="text-xs text-gray-400 whitespace-nowrap">1/4 Steps</span>
              <div className="flex-1 sm:w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-xs text-gray-600 font-semibold whitespace-nowrap">25% Completed</span>
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

=======
            </div>

            {/* Progress — full width on mobile, inline on sm+ */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
              <span className="text-xs text-gray-400 whitespace-nowrap">1/4 Steps</span>
              <div className="flex-1 sm:w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-xs text-gray-600 font-semibold whitespace-nowrap">25% Completed</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-all flex-1 sm:flex-none justify-center">
                <Edit size={13} />
                Edit Biography
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all flex-shrink-0">
                <ArrowDown size={15} />
              </button>
            </div>
          </div>

>>>>>>> parent of 4d42df6 (Complete course)
          {/* ── Bottom Row: Activity + Rating ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Recent Activity</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                  {activityFilter} <ChevronDown size={13} />
                </button>
              </div>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img
                      src={a.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                      <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Course Rating */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 text-sm">Overall Course Rating</h2>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors">
                  {ratingFilter} <ChevronDown size={13} />
                </button>
              </div>

              {/* Rating summary + sparkline */}
              <div className="flex gap-3 mb-5">
                <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center w-28 sm:w-32 flex-shrink-0">
                  <p className="font-extrabold text-gray-900 text-3xl leading-none">4.6</p>
                  <StarRow count={5} filled={4} />
                  <p className="text-[11px] text-gray-500 mt-1">Overall Rating</p>
                </div>
                <div className="flex-1 min-w-0">
                  <Sparkline />
                </div>
              </div>

              {/* Rating bars */}
              <div className="space-y-2">
                {ratingBars.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <StarRow count={5} filled={r.stars} />
                    <span className="text-xs text-gray-500 w-10 flex-shrink-0">{r.stars} Star</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">
                      {r.pct >= 1 ? `${r.pct}%` : '<1%'}
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