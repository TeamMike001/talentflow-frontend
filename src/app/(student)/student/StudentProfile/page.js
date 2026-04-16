'use client';

import { useState, useEffect } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { BookOpen, Award, Calendar, Clock, TrendingUp, RefreshCw } from 'lucide-react';

// ── Progress bar component ────────────────────────────────────────────────────
function ProgressBar({ value, color = 'bg-primary' }) {
  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500">Progress</span>
        <span className="font-medium text-gray-700">{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getProgressColor(value)} rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, onRefresh }) {
  const [localProgress, setLocalProgress] = useState(course.progress || 0);
  
  useEffect(() => {
    setLocalProgress(course.progress || 0);
  }, [course.progress]);
  
  return (
    <div className="border border-gray-100 rounded-2xl p-5 hover:border-primary/30 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm mb-1">{course.title}</h3>
          <p className="text-xs text-gray-400">
            Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full flex-shrink-0 ml-3 ${
          localProgress >= 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {localProgress >= 100 ? 'Completed' : 'In Progress'}
        </span>
      </div>
      
      <ProgressBar value={localProgress} />
      
      {localProgress >= 100 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link 
            href="/student/certifications" 
            className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
          >
            <Award size={12} /> View Certificate →
          </Link>
        </div>
      )}
      
      <Link 
        href={`/student/courses/${course.id}`}
        className="mt-3 inline-block text-xs text-primary hover:underline font-medium"
      >
        Continue Learning →
      </Link>
    </div>
  );
}

export default function StudentProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  // State for user data
  const [user, setUser] = useState({
    name: '',
    email: '',
    id: '',
    role: '',
    createdAt: ''
  });
  
  // State for learning history (enrolled courses with progress)
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  
  // State for certificates
  const [certificates, setCertificates] = useState([]);
  
  // Fetch user profile, enrollments, and certificates
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        window.location.href = '/signin';
        return;
      }
      
      // Fetch user profile
      const userResponse = await fetch('http://localhost:8080/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!userResponse.ok) throw new Error('Failed to fetch user profile');
      const userData = await userResponse.json();
      setUser(userData);
      
      // Fetch enrollments (courses the student is enrolled in)
      const enrollmentsResponse = await fetch('http://localhost:8080/api/enrollments/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (enrollmentsResponse.ok) {
        const enrollments = await enrollmentsResponse.json();
        
        // For each enrollment, fetch full course details and progress
        const coursesWithProgress = await Promise.all(
          enrollments.map(async (enrollment) => {
            try {
              const courseResponse = await fetch(`http://localhost:8080/api/courses/${enrollment.courseId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (courseResponse.ok) {
                const course = await courseResponse.json();
                
                // Get detailed progress from progress service
                let progress = enrollment.progressPercentage || 0;
                
                // Try to get more accurate progress from progress endpoint
                try {
                  const progressResponse = await fetch(`http://localhost:8080/api/progress/courses/${enrollment.courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                  });
                  if (progressResponse.ok) {
                    const progressData = await progressResponse.json();
                    progress = progressData.progress || progress;
                  }
                } catch (err) {
                  console.log('Progress endpoint not available, using enrollment progress');
                }
                
                return {
                  id: course.id,
                  title: course.title,
                  progress: progress,
                  enrolledAt: enrollment.enrolledAt,
                  thumbnail: course.thumbnailUrl,
                  status: progress >= 100 ? 'Completed' : 'In Progress'
                };
              }
              return null;
            } catch (err) {
              console.error(`Failed to fetch course ${enrollment.courseId}:`, err);
              return null;
            }
          })
        );
        
        setEnrolledCourses(coursesWithProgress.filter(c => c !== null));
      }
      
      // Fetch certificates
      const certsResponse = await fetch('http://localhost:8080/api/certificates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (certsResponse.ok) {
        const certs = await certsResponse.json();
        setCertificates(certs);
      }
      
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
  };
  
  // Listen for progress updates
  useEffect(() => {
    const handleProgressUpdate = () => {
      fetchUserData();
    };
    
    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, []);
  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  // Calculate total courses enrolled
  const totalCourses = enrolledCourses.length;
  
  // Calculate total certificates earned
  const totalCertificates = certificates.length;
  
  // Calculate overall progress (average of all course progress)
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / enrolledCourses.length)
    : 0;
  
  // Calculate completed courses
  const completedCourses = enrolledCourses.filter(c => c.progress >= 100).length;
  
  // Get initials for avatar placeholder
  const getInitials = () => {
    if (!user.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-center max-w-md">
          <p className="mb-4">Error loading profile: {error}</p>
          <button 
            onClick={handleRefresh} 
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 space-y-5">
          
          {/* Header with Refresh Button */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          
          {/* Top section: Profile Card + Learning History */}
          <div className="grid lg:grid-cols-5 gap-5 items-start">
            
            {/* Student Profile Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center">
              <h2 className="font-extrabold text-gray-900 text-base mb-5">Student Profile</h2>
              
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4 bg-primary/10 flex items-center justify-center">
                {user.name ? (
                  <span className="text-3xl font-bold text-primary">{getInitials()}</span>
                ) : (
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <h3 className="font-extrabold text-gray-900 text-lg">
                {user.name || 'Student'} 
              </h3>
              <p className="text-gray-400 text-xs mb-5">Student ID : #{user.id || 'N/A'}</p>
              
              <div className="w-full space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <BookOpen size={16} className="text-primary flex-shrink-0" />
                  <span>{totalCourses} {totalCourses === 1 ? 'Course' : 'Courses'} enrolled</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Award size={16} className="text-primary flex-shrink-0" />
                  <span>{completedCourses} {completedCourses === 1 ? 'Course' : 'Courses'} completed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Award size={16} className="text-yellow-500 flex-shrink-0" />
                  <span>{totalCertificates} {totalCertificates === 1 ? 'Certificate' : 'Certificates'} earned</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-primary flex-shrink-0" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>
              
              <div className="w-full border-t border-gray-100 my-4" />
              
              <div className="w-full bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">Overall Progress</span>
                  <span className="text-xs text-primary font-bold">{overallProgress}%</span>
                </div>
                <ProgressBar value={overallProgress} />
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {completedCourses} of {totalCourses} courses completed
                </p>
              </div>
              
              <div className="w-full border-t border-gray-100 my-4" />
              
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock size={16} className="text-gray-400" />
                <span>Last active: Today</span>
              </div>
            </div>
            
            {/* Learning History - My Courses */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-gray-700" />
                  <h2 className="font-extrabold text-gray-900 text-base">My Courses</h2>
                </div>
                <Link 
                  href="/student/courses" 
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Browse More Courses →
                </Link>
              </div>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onRefresh={fetchUserData} />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="mb-2">No courses enrolled yet</p>
                    <p className="text-sm">Start your learning journey today!</p>
                    <Link 
                      href="/student/courses" 
                      className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Certificates Earned Grid */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-yellow-500" />
                <h2 className="font-extrabold text-gray-900 text-base">Certificates Earned</h2>
              </div>
              {certificates.length > 0 && (
                <Link 
                  href="/student/certifications" 
                  className="text-xs text-primary hover:underline font-medium"
                >
                  View All →
                </Link>
              )}
            </div>
            
            {certificates.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {certificates.slice(0, 4).map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer border border-blue-100"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-3 shadow-sm">
                      🎓
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{cert.courseTitle}</h3>
                    <p className="text-xs text-gray-500">Issued: {formatDate(cert.issuedAt)}</p>
                    <Link 
                      href={`/student/certifications`}
                      className="mt-2 inline-block text-xs text-primary hover:underline"
                    >
                      View Certificate →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No certificates yet</p>
                <p className="text-xs mt-1">Complete a course to earn your first certificate!</p>
                <Link 
                  href="/student/courses" 
                  className="inline-block mt-3 text-primary hover:underline text-sm"
                >
                  Browse Courses →
                </Link>
              </div>
            )}
          </div>
          
          {/* Quick Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen size={18} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
              <p className="text-xs text-gray-500">Total Courses</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award size={18} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award size={18} className="text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalCertificates}</p>
              <p className="text-xs text-gray-500">Certificates</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp size={18} className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
              <p className="text-xs text-gray-500">Avg. Progress</p>
            </div>
          </div>
          
        </main>
        
        {/* Footer */}
        <footer className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-400 mt-auto flex-wrap gap-3">
          <span>© 2026 TalentFlow. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms & Condition</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}