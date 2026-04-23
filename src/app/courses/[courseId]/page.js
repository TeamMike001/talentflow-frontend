<<<<<<< HEAD
import Navbar from '@/landing_page/StudentNavbar';
=======
import Navbar from '@/landing_page/Navbar';
>>>>>>> parent of 4d42df6 (Complete course)
import Footer from '@/landing_page/Footer';
import { Clock, Star, Users, Play, CheckCircle, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// In a real app, you'd fetch course by params.id
export default function CourseDetailPage({ params }) {
  const course = {
    id: params?.id || '1',
    title: 'Figma UI UX Design Masterclass',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80',
    rating: 4.3,
    reviews: 120,
    duration: '08 hr 12 mins',
    students: 2001,
    price: '$19.14',
    instructor: { name: 'Jane Cooper', role: 'Senior UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', courses: 8, students: 12400 },
    description: 'Use Figma to get a job in UI Design, User Interface, User Experience design. This comprehensive course takes you from complete beginner to job-ready designer with real-world projects and portfolio pieces.',
    whatYoullLearn: [
      'Master Figma from scratch',
      'Create professional UI designs',
      'Build interactive prototypes',
      'Design system fundamentals',
      'UX research methods',
      'Portfolio project: Full app design',
      'Client presentation skills',
      'Design handoff to developers',
    ],
    curriculum: [
      { section: 'Getting Started with Figma', lessons: 5, duration: '45 mins' },
      { section: 'UI Design Principles', lessons: 8, duration: '1 hr 20 mins' },
      { section: 'Component Libraries', lessons: 6, duration: '1 hr 5 mins' },
      { section: 'UX Research & Strategy', lessons: 7, duration: '1 hr 30 mins' },
      { section: 'Prototyping & Animation', lessons: 5, duration: '55 mins' },
      { section: 'Real Project: Mobile App', lessons: 10, duration: '2 hr 37 mins' },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <div className="bg-[#1E3A8A] text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-blue-200 text-sm font-semibold">{course.category}</span>
                <h1 className="text-2xl lg:text-4xl font-extrabold mt-2 mb-4 leading-tight">{course.title}</h1>
                <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-lg">{course.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-blue-200">({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-200">
                    <Users size={16} />
                    {course.students.toLocaleString()} students enrolled
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-200">
                    <Clock size={16} />
                    {course.duration}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src={course.instructor.avatar} alt={course.instructor.name} className="w-9 h-9 rounded-full object-cover" />
                  <span className="text-blue-100 text-sm">by <span className="text-white font-semibold">{course.instructor.name}</span></span>
                </div>
              </div>

              {/* Course Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-900">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Play size={20} className="text-primary fill-primary ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-extrabold text-primary mb-4">{course.price}</p>
<<<<<<< HEAD
                  <Link href="/student/checkout">
                    <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md mb-3 text-sm">
                      Enroll Now
                    </button>
                  </Link>

                  <Link href="/courses">
                    <button className="w-full py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all text-sm">
                      Try Free Preview
                    </button>
                  </Link>
=======
                  <button className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-md mb-3 text-sm">
                    Enroll Now
                  </button>
                  <button className="w-full py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all text-sm">
                    Try Free Preview
                  </button>
>>>>>>> parent of 4d42df6 (Complete course)
                  <p className="text-center text-gray-400 text-xs mt-4">30-Day Money-Back Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900 mb-5">What You&apos;ll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.whatYoullLearn.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900 mb-5">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((section, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Play size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{section.section}</p>
                          <p className="text-gray-400 text-xs">{section.lessons} lessons</p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs font-medium">{section.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-extrabold text-gray-900 mb-4">About the Instructor</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img src={course.instructor.avatar} alt={course.instructor.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-primary">{course.instructor.name}</p>
                    <p className="text-gray-400 text-xs">{course.instructor.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center py-4 border-y border-gray-100 mb-4">
                  <div>
                    <p className="text-xl font-extrabold text-gray-900">{course.instructor.courses}</p>
                    <p className="text-gray-400 text-xs">Courses</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-gray-900">{course.instructor.students.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs">Students</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Experienced designer with 8+ years in UI/UX. Has worked with leading companies and now passionate about teaching the next generation.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <p className="font-bold text-gray-900 mb-2">Need Help Choosing?</p>
                <p className="text-gray-500 text-sm mb-4">Our team can help you pick the right course for your goals.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                  Contact Us <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
