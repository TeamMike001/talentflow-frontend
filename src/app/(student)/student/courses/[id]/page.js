// src/app/(student)/student/courses/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { courseService } from '@/services/courseService';
import { enrollmentService } from '@/services/enrollmentService';
import { bookmarkService } from '@/services/bookmarkService';
import { progressService } from '@/services/progressService';
import ProgressBar from '@/components/ProgressBar';
import LecturePlayer from '@/components/LecturePlayer';
import { 
  Bookmark, BookmarkCheck, Play, Clock, Users, Star, ChevronLeft, 
  ChevronDown, ChevronRight, Award, Target, ListChecks, User, 
  GraduationCap, Calendar, Globe, Heart, CheckCircle, Eye, FileText
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function StudentCourseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSections, setOpenSections] = useState({});
  const [courseProgress, setCourseProgress] = useState(0);
  const [lectureProgress, setLectureProgress] = useState({});
  const [studentCount, setStudentCount] = useState(0);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (isEnrolled && course) {
      fetchCourseProgress();
    }
  }, [isEnrolled, course]);

  useEffect(() => {
    const handleProgressUpdate = (event) => {
      if (event.detail?.courseId === id) {
        fetchCourseProgress();
      }
    };
    
    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, [id]);

  const fetchStudentCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/enrollments/course/${id}/count`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const count = await response.json();
        setStudentCount(count);
        return count;
      }
    } catch (err) {
      console.error('Failed to fetch student count:', err);
    }
    return 0;
  };

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      // Fetch course details
      const courseData = await courseService.getCourseById(id);
      setCourse(courseData);
      const firstLecture = courseData.sections?.flatMap(section => section.lectures || [])[0] || null;
      setSelectedLecture(firstLecture);
      
      // Fetch enrollment and bookmark status
      const [enrolled, bookmarked] = await Promise.all([
        enrollmentService.checkEnrollment(id).catch(() => false),
        bookmarkService.isBookmarked(id).catch(() => false),
      ]);
      setIsEnrolled(enrolled);
      setIsBookmarked(bookmarked);
      
      // Fetch student count
      await fetchStudentCount();
      
    } catch (err) {
      console.error('Failed to fetch course:', err);
      setError(err.message || 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseProgress = async () => {
    try {
      const progress = await progressService.getCourseProgress(id);
      setCourseProgress(progress);
      
      const lecturesProgress = await progressService.getAllLecturesProgress(id);
      setLectureProgress(lecturesProgress || {});
    } catch (error) {
      console.error('Failed to fetch course progress:', error);
    }
  };

  const handleEnroll = async () => {
    setActionLoading(true);
    try {
      await enrollmentService.enroll(id);
      setIsEnrolled(true);
      
      // Update student count immediately after enrollment
      const newCount = await fetchStudentCount();
      setStudentCount(newCount);
      
      alert('Successfully enrolled!');
    } catch (err) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnenroll = async () => {
    if (!confirm('Unenroll? Your progress will be lost.')) return;
    setActionLoading(true);
    try {
      await enrollmentService.unenroll(id);
      setIsEnrolled(false);
      setCourseProgress(0);
      
      // Update student count immediately after unenrollment
      const newCount = await fetchStudentCount();
      setStudentCount(newCount);
      
      alert('Successfully unenrolled');
    } catch (err) {
      alert(err.message || 'Failed to unenroll');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBookmark = async () => {
    setActionLoading(true);
    try {
      if (isBookmarked) {
        await bookmarkService.removeBookmark(id);
        setIsBookmarked(false);
      } else {
        await bookmarkService.addBookmark(id);
        setIsBookmarked(true);
      }
    } catch (err) {
      alert(err.message || 'Failed to update bookmark');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    setActiveTab('curriculum');
  };

  const isLectureCompleted = (lectureId) => {
    return lectureProgress[lectureId] === true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4 font-medium">{error || 'Course not found'}</p>
          <button 
            onClick={() => router.back()} 
            className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const totalLectures = course.sections?.reduce((acc, section) => acc + (section.lectures?.length || 0), 0) || 0;
  const completedLectures = Object.values(lectureProgress).filter(v => v === true).length;
  const formattedDate = course.createdAt ? new Date(course.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently';
  const learningItems = course.sections?.flatMap(section => section.lectures || []) || [];
  const lessonsWithVideo = learningItems.filter(lecture => lecture.videoUrl?.trim()).length;
  const lessonsWithNotes = learningItems.filter(lecture => lecture.description?.trim()).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 md:p-8">
          {/* Back Button */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-all duration-300 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Courses
          </button>

          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
            <div className="relative h-80 md:h-96 bg-gradient-to-r from-gray-900 to-gray-800">
              <img 
                src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80'} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-70"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              
              {/* Bookmark Button */}
              <button
                onClick={handleBookmark}
                disabled={actionLoading}
                className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300"
              >
                {isBookmarked ? (
                  <BookmarkCheck size={22} className="text-primary fill-primary" />
                ) : (
                  <Bookmark size={22} className="text-white" />
                )}
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.category || 'COURSE'}
                  </span>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span>{course.averageRating || course.rating || '4.8'}</span>
                    <span className="text-white/50">•</span>
                    <Users size={14} />
                    <span>{studentCount} students</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
                <p className="text-white/80 text-lg mb-6 max-w-3xl">{course.subtitle || course.description?.slice(0, 150)}</p>
                <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>By <span className="font-semibold text-white">{course.instructor?.name || 'Expert Instructor'}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Updated {formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>{course.language || 'English'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar Section - Only show if enrolled */}
          {isEnrolled && (
            <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
              <ProgressBar progress={courseProgress} size="large" />
              {courseProgress < 100 && courseProgress > 0 && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {completedLectures} of {totalLectures} lectures completed
                  </span>
                  <span className="text-primary font-medium">
                    {totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0}% complete
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Course Stats Bar */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Play size={22} className="text-primary" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{totalLectures}</p>
                <p className="text-xs text-gray-500">Lectures</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock size={22} className="text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{course.duration || 'Self-paced'}</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star size={22} className="text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{course.averageRating || course.rating || '4.8'}</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users size={22} className="text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{studentCount}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award size={22} className="text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{course.sections?.length || 0}</p>
                <p className="text-xs text-gray-500">Sections</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Course Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="border-b border-gray-200 px-6">
                  <div className="flex gap-6 overflow-x-auto">
                    {[
                      { id: 'overview', label: 'Overview', icon: Eye },
                      { id: 'curriculum', label: 'Curriculum', icon: ListChecks },
                      { id: 'instructor', label: 'Instructor', icon: User }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 text-sm font-semibold border-b-2 transition-all ${
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About This Course</h3>
                        <p className="text-gray-600 leading-relaxed">{course.description}</p>
                      </div>

                      {course.teaches && course.teaches.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Target size={20} className="text-primary" />
                            What You'll Learn
                          </h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {course.teaches.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-gray-600">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {course.audience && course.audience.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Users size={20} className="text-primary" />
                            Who This Course Is For
                          </h3>
                          <ul className="space-y-2">
                            {course.audience.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-gray-600">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {course.requirements && course.requirements.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ListChecks size={20} className="text-primary" />
                            Requirements
                          </h3>
                          <ul className="space-y-2">
                            {course.requirements.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-gray-600">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === 'curriculum' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Course Content</h3>
                      {selectedLecture && (
                        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Now learning</p>
                              <h4 className="mt-1 text-lg font-bold text-gray-900">{selectedLecture.name}</h4>
                            </div>
                            {!isEnrolled && (
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
                                Enroll to unlock lesson content
                              </span>
                            )}
                          </div>

                          {isEnrolled ? (
                            <LecturePlayer
                              courseId={id}
                              lectureId={selectedLecture.id}
                              lectureTitle={selectedLecture.name}
                              videoUrl={selectedLecture.videoUrl}
                              lectureNotes={selectedLecture.description}
                              onComplete={fetchCourseProgress}
                            />
                          ) : (
                            <div className="rounded-2xl border border-dashed border-blue-200 bg-white p-6 text-center">
                              <Play size={32} className="mx-auto mb-3 text-blue-600" />
                              <p className="font-semibold text-gray-900">Lesson content is ready</p>
                              <p className="mt-2 text-sm text-gray-500">
                                Enroll in this course to watch the videos, read the notes, and have each lesson count toward your progress bar.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {course.sections && course.sections.length > 0 ? (
                        <div className="space-y-3">
                          {course.sections.map((section, idx) => (
                            <div key={idx} className="border rounded-xl overflow-hidden">
                              <button
                                onClick={() => toggleSection(idx)}
                                className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                <span className="font-semibold text-gray-800">
                                  Section {idx + 1}: {section.name}
                                </span>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <span>{section.lectures?.length || 0} lessons</span>
                                  {openSections[idx] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </div>
                              </button>
                              {openSections[idx] && (
                                <div className="divide-y">
                                  {section.lectures?.map((lecture, lIdx) => (
                                    <button
                                      key={lIdx}
                                      onClick={() => handleLectureClick(lecture)}
                                      className={`w-full px-5 py-3 flex items-center justify-between transition-colors ${
                                        selectedLecture?.id === lecture.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        {lecture.videoUrl ? (
                                          <Play size={14} className={isLectureCompleted(lecture.id) ? 'text-green-500' : 'text-primary'} />
                                        ) : (
                                          <FileText size={14} className={isLectureCompleted(lecture.id) ? 'text-green-500' : 'text-slate-500'} />
                                        )}
                                        <div className="text-left">
                                          <span className="block text-gray-700">{lecture.name}</span>
                                          <span className="block text-xs text-gray-400">
                                            {lecture.videoUrl ? 'Video lesson' : 'Reading lesson'}
                                            {lecture.description?.trim() ? ' with notes' : ''}
                                          </span>
                                        </div>
                                      </div>
                                      {isLectureCompleted(lecture.id) && (
                                        <CheckCircle size={14} className="text-green-500" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <ListChecks size={48} className="mx-auto mb-3 text-gray-300" />
                          <p>Curriculum coming soon...</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Instructor Tab */}
                  {activeTab === 'instructor' && (
                    <div>
                      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                        <div className="flex-shrink-0">
                          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-primary to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {course.instructor?.name?.charAt(0) || 'I'}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{course.instructor?.name || 'Expert Instructor'}</h3>
                          <p className="text-primary font-medium mb-4">{course.instructor?.role || 'Senior Instructor'}</p>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {course.instructor?.bio || 'Experienced instructor passionate about teaching and helping students master new skills. With years of industry experience, brings real-world knowledge to every lesson.'}
                          </p>
                          <div className="flex flex-wrap gap-4 pt-3 border-t border-blue-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <GraduationCap size={16} className="text-primary" />
                              <span>Expert in {course.category || 'Design'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users size={16} className="text-primary" />
                              <span>{studentCount}+ students</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-gray-900 mb-2">FREE</p>
                  <p className="text-sm text-gray-500">Full lifetime access</p>
                </div>

                {isEnrolled ? (
                  <div className="space-y-4">
                    <button
                      onClick={handleUnenroll}
                      disabled={actionLoading}
                      className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                      {actionLoading ? 'Processing...' : 'Unenroll from Course'}
                    </button>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-700 font-medium">You are enrolled!</span>
                      </div>
                      <p className="text-xs text-green-600">Start learning today</p>
                      {courseProgress > 0 && (
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <p className="text-xs text-green-600 font-medium">
                            Progress: {Math.round(courseProgress)}% complete
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={handleEnroll}
                      disabled={actionLoading}
                      className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all disabled:opacity-50"
                    >
                      {actionLoading ? 'Processing...' : 'Enroll Now'}
                    </button>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-primary" />
                        <span>30-Day Guarantee</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={12} className="text-primary" />
                        <span>Certificate</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Play size={14} className="text-primary" />
                      <span>{lessonsWithVideo} video lessons and {lessonsWithNotes} note-based lessons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award size={14} className="text-primary" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={14} className="text-primary" />
                      <span>Access on mobile and desktop</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe size={14} className="text-primary" />
                      <span>{course.language || 'English'} subtitles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
