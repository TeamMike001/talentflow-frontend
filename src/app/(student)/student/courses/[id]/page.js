'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { courseService } from '@/services/courseService';
import { enrollmentService } from '@/services/enrollmentService';
import { bookmarkService } from '@/services/bookmarkService';
import { progressService } from '@/services/progressService';
import ProgressBar from '@/components/ProgressBar';
import { 
  Bookmark, BookmarkCheck, Play, Clock, Users, Star, ChevronLeft, 
  ChevronDown, ChevronRight, Award, Target, ListChecks, User, 
  GraduationCap, Calendar, Globe, Heart, CheckCircle, Eye  // Added Eye here
} from 'lucide-react';

export default function StudentCourseDetail() {
  // Fix: Properly get the id from params
  const params = useParams();
  const id = params?.id;
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

  // Debug: Log the id
  useEffect(() => {
    console.log('Course ID from params:', id);
    console.log('Full params object:', params);
  }, [id, params]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    
    // Validate id before fetching
    if (!id) {
      setError('Course ID is required');
      setLoading(false);
      return;
    }
    
    fetchCourseData();
  }, [id]); // Add id as dependency

  useEffect(() => {
    if (isEnrolled && course && id) {
      fetchCourseProgress();
    }
  }, [isEnrolled, course, id]);

  useEffect(() => {
    // Listen for progress updates
    const handleProgressUpdate = (event) => {
      if (event.detail?.courseId === id && id) {
        fetchCourseProgress();
      }
    };
    
    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching course with ID:', id);
      const courseData = await courseService.getCourseById(id);
      console.log('Course data received:', courseData);
      setCourse(courseData);
      
      const [enrolled, bookmarked] = await Promise.all([
        enrollmentService.checkEnrollment(id).catch(() => false),
        bookmarkService.isBookmarked(id).catch(() => false),
      ]);
      setIsEnrolled(enrolled);
      setIsBookmarked(bookmarked);
      
    } catch (err) {
      console.error('Failed to fetch course:', err);
      setError(err.message || 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseProgress = async () => {
    if (!id) return;
    try {
      const progress = await progressService.getCourseProgress(id);
      setCourseProgress(progress);
      
      // Fetch individual lecture progress
      const lecturesProgress = await progressService.getAllLecturesProgress(id);
      setLectureProgress(lecturesProgress || {});
    } catch (error) {
      console.error('Failed to fetch course progress:', error);
    }
  };

  const handleEnroll = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      await enrollmentService.enroll(id);
      setIsEnrolled(true);
      alert('Successfully enrolled!');
    } catch (err) {
      alert(err.message || 'Failed to enroll');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnenroll = async () => {
    if (!id) return;
    if (!confirm('Unenroll? Your progress will be lost.')) return;
    setActionLoading(true);
    try {
      await enrollmentService.unenroll(id);
      setIsEnrolled(false);
      setCourseProgress(0);
      alert('Successfully unenrolled');
    } catch (err) {
      alert(err.message || 'Failed to unenroll');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!id) return;
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
    if (!id) return;
    router.push(`/student/courses/${id}/lectures/${lecture.id}`);
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

function StickyCard() {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xl bg-white">
      {/* Price */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl font-extrabold text-gray-900">{course.price}</span>
          <span className="text-gray-400 line-through text-sm">{course.originalPrice}</span>
          <span className="bg-orange-100 text-orange-500 text-xs font-bold px-2 py-1 rounded">{course.discount}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mb-4">
          <Zap size={12} /> <span>2 days left at this price!</span>
        </div>

        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all text-sm mb-2.5 flex items-center justify-center gap-2">
          <Zap size={15} /> Enroll Course
        </button>
        <button className="w-full py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-primary hover:text-primary transition-all text-sm">
          Free Preview
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
                    <span>{course.averageRating || '4.8'}</span>
                    <span className="text-white/50">•</span>
                    <Users size={14} />
                    <span>{course.enrolledCount || 0} students</span>
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
              <Stars rating={5} size={10} />
              <p className="text-xs text-gray-500 mt-0.5">{r.text}</p>
            </div>
          </div>
        ))}
        <button className="text-xs text-primary font-semibold border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50">Load More →</button>
      </div>

      {/* Related courses in sidebar */}
      <div className="border-t border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-900">Related Courses</p>
          <Link href="/courses" className="text-primary text-xs font-semibold hover:underline flex items-center gap-0.5">View All <ChevronRight size={11} /></Link>
        </div>
        <div className="space-y-3">
          {course.relatedCourses.slice(0, 2).map(rc => (
            <Link key={rc.id} href={`/courses/${rc.id}`} className="flex gap-3 group">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={rc.image} alt={rc.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${rc.tagColor}`}>{rc.tag}</span>
                <p className="text-xs font-semibold text-gray-900 mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">{rc.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">{rc.rating}</span>
                  <span className="text-xs text-gray-400">• {rc.students}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star size={22} className="text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{course.averageRating || '4.8'}</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users size={22} className="text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{course.enrolledCount || 0}</p>
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

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── LEFT MAIN ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* About Course */}
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">About Course</h2>
                <div className="grid sm:grid-cols-2 gap-5 mb-4">
                  <div>
                    {course.about.split('\n\n').map((p, i) => (
                      <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">{p}</p>
                    ))}
                  </div>
                  {/* Price card - shows on mobile/small */}
                  <div className="sm:hidden">
                    <StickyCard />
                  </div>
                  {/* What you'll learn + price inline */}
                  <div className="bg-blue-50 rounded-2xl p-5 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-2">What you&apos;ll learn</p>
                      {course.whatYoullLearn.map(item => (
                        <div key={item} className="flex items-start gap-2 mb-1.5">
                          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle size={10} className="text-white" />
                          </div>
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-2">Prerequisites</p>
                      {course.prerequisites.map(item => (
                        <div key={item} className="flex items-start gap-2 mb-1.5">
                          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle size={10} className="text-white" />
                          </div>
                          <span className="text-xs text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    {/* Inline price + enroll */}
                    <div className="pt-3 border-t border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-extrabold text-gray-900">{course.price}</span>
                        <span className="text-gray-400 line-through text-xs">{course.originalPrice}</span>
                        <span className="bg-orange-100 text-orange-500 text-xs font-bold px-2 py-0.5 rounded">{course.discount}</span>
                      </div>
                      <button className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                        <Zap size={14} /> Enroll Course
                      </button>
                      <button className="w-full py-2.5 border-2 border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:border-primary hover:text-primary transition-all mt-2">
                        Free Preview
                      </button>
                      <p className="text-center text-xs text-gray-400 mt-2">THIS COURSE INCLUDES:</p>
                      {course.includes.map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2 mt-1.5 text-xs text-gray-600">
                          <Icon size={13} className="text-gray-400" />{text}
                        </div>
                      ))}
                      <button className="w-full mt-3 py-2.5 bg-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5">
                        30-Day Money-Back Guarantee
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Curriculum */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold text-gray-900">Course Curriculum</h2>
                  <p className="text-gray-400 text-xs">12 Modules · 45 lessons · 18h Total Length</p>
                  <button className="text-primary text-sm font-semibold hover:underline">Expand All</button>
                </div>
                <div className="space-y-2">
                  {course.curriculum.map((sec, i) => (
                    <div key={sec.id} className="border border-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection(i)}
                        className="w-full flex items-center justify-between px-5 py-3.5 bg-yellow-400 hover:bg-yellow-500 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-gray-900 text-sm">
                            {String(i + 1).padStart(2, '0')} {sec.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-700">
                          <span>{sec.lessons} Lessons · {sec.duration}</span>
                          {openSections[i] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>
                      {openSections[i] && sec.items.length > 0 && (
                        <div>
                          {sec.items.map((item, j) => (
                            <div key={j} className="flex items-center gap-3 px-5 py-3 border-t border-gray-50 hover:bg-gray-50">
                              <Play size={13} className="text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-700 flex-1">{item}</span>
                              <span className="text-xs text-gray-400">0:4{j}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Instructor */}
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">Lead Instructor</h2>
                <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex gap-5">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-extrabold text-gray-900 text-lg">{course.instructor.name}</h3>
                      <p className="text-primary text-sm font-semibold mb-3">{course.instructor.role}</p>
                      <div className="grid grid-cols-3 gap-4 mb-3 py-3 border-y border-gray-100">
                        <div className="text-center">
                          <p className="text-xl font-extrabold text-gray-900">{course.instructor.rating}</p>
                          <p className="text-xs text-gray-400">INSTRUCTOR RATING</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-extrabold text-gray-900">{course.instructor.students.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">TOTAL STUDENTS</p>
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
                              <span>10,000+ students</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Reviews */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-extrabold text-gray-900">Student Reviews</h2>
                  <button className="text-primary text-sm font-semibold border border-primary rounded-xl px-4 py-2 hover:bg-blue-50 transition-colors">
                    Write a Review
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {course.reviews.map(r => (
                    <div key={r.id} className="p-4 border border-gray-100 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-gray-900 text-xs">{r.name}</p>
                          <Stars rating={r.rating} size={11} />
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who this course is for + Requirements */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 mb-3">Who this course is for:</h2>
                  <ul className="space-y-2">
                    {course.whoFor.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 mb-3">Course requirements</h2>
                  <ul className="space-y-2">
                    {course.requirements.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Courses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold text-gray-900">Related Courses</h2>
                  <Link href="/courses" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                    View All <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {course.relatedCourses.map(rc => (
                    <Link key={rc.id} href={`/courses/${rc.id}`} className="group">
                      <div className="h-32 rounded-xl overflow-hidden bg-gray-100 mb-2">
                        <img src={rc.image} alt={rc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${rc.tagColor}`}>{rc.tag}</span>
                        <span className="text-primary font-bold text-sm">{rc.price}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-xs leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">{rc.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star size={11} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{rc.rating}</span>
                        <Users size={10} className="ml-1" />
                        <span>{rc.students}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT STICKY SIDEBAR (desktop) ── */}
            <div className="hidden sm:block">
              <div className="sticky top-24">
                <StickyCard />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
