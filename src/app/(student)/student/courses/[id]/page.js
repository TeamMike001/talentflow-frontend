'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import {
  Star, Users, Clock, ChevronRight, CheckCircle, Play,
  Download, Globe, Infinity, Award, Monitor, ChevronDown,
  ChevronUp, Share2, Heart, Tag, Zap
} from 'lucide-react';

/* ── Data ──────────────────────────────────────────── */
const course = {
  id: 1,
  category: 'USER INTERFACE',
  title: 'Intro to User Design',
  subtitle: 'From foundational basics to advanced mastery—expert-led paths designed to turn your ambition into a career.',
  banner: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&q=80',
  price: '$89.99',
  originalPrice: '$149.99',
  discount: '40% OFF',
  rating: 4.8,
  ratingCount: '451,444',
  instructors: [
    { name: 'Jane Cooper',    avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ],
  includes: [
    { icon: Monitor,  text: '18 hours on-demand video' },
    { icon: Download, text: '12 downloadable resources' },
    { icon: Infinity, text: 'Full lifetime access' },
    { icon: Award,    text: 'Certificate of completion' },
  ],
  about: `This course is designed for aspiring designers who want to bridge the gap between aesthetic beauty and functional utility. You will explore the cognitive biases that drive user behavior and learn how to translate those insights into intuitive interaction designs.\n\nWe believe design is not just what it looks like, but how it works. Through a series of hands-on projects, you will develop a portfolio-ready case study starting from user research and wireframing all the way to a polished interactive prototype.`,
  whatYoullLearn: [
    'User Psychology & Mental Models',
    'Advanced Prototyping Techniques',
  ],
  prerequisites: [
    'Basic understanding of digital interfaces',
    'Access to Figma (free version)',
  ],
  curriculum: [
    { id: 1, title: 'Foundations of Experience Design', lessons: 4, duration: '1h 31m', color: 'bg-yellow-400', items: ['What is User Design?', 'The Designer\'s Mindset'], open: true },
    { id: 2, title: 'Visual Hierarchies & Layouts',      lessons: 6, duration: '2h 13m', color: 'bg-yellow-400', items: [], open: false },
    { id: 3, title: 'Prototyping & Interactions',        lessons: 8, duration: '3h 45m', color: 'bg-yellow-400', items: [], open: false },
  ],
  instructor: {
    name: 'John Smith',
    role: 'Senior UX Lead at TalentFlow',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 4.5,
    students: 15302,
    courses: 12,
    bio: 'Sarah is a veteran designer with over 12 years of experience building products for Fortune 500 companies. She has mentored over 500+ designers and is a frequent speaker at global design conferences like Config and Adobe MAX.',
  },
  reviews: [
    { id: 1, name: 'Alex Thompson',  avatar: 'https://randomuser.me/api/portraits/men/10.jpg', rating: 5, text: '"This course completely changed the way I think about UI apps. The module on psychological triggers was worth the price alone."' },
    { id: 2, name: 'Elena Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', rating: 5, text: '"Great production quality and practical assignments. I would highly recommend this to any junior designer."' },
    { id: 3, name: 'Elena Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', rating: 5, text: '"Great production quality and practical assignments. I would highly recommend this to any junior designer."' },
  ],
  whoFor: [
    'Beginners with no prior experience in design or tech',
    'Aspiring UI/UX designers who want to learn modern tools',
    'Freelancers looking to build a profitable design career',
    'Students or career switchers entering the tech industry',
    'Anyone interested in designing and building websites without coding',
  ],
  requirements: [
    'No prior design or coding experience required',
    'A laptop or desktop computer',
    'Internet connection',
    'Basic computer knowledge',
    'Willingness to learn, practice, and stay consistent',
  ],
  relatedCourses: [
    { id: 2, tag: 'DESIGN',  tagColor: 'text-red-500 bg-red-50',    title: 'Learn Python Programming Masterclass',              rating: 4.0, students: '211,434', price: '$57', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&q=80' },
    { id: 3, tag: 'DESIGN',  tagColor: 'text-blue-500 bg-blue-50',  title: 'Data Structures & Algorithms Essentials (2021)',    rating: 4.7, students: '451,444', price: '$57', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80' },
    { id: 4, tag: 'DESIGN',  tagColor: 'text-green-600 bg-green-50',title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click', rating: 4.1, students: '154,817', price: '$57', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80' },
    { id: 5, tag: 'DESIGN',  tagColor: 'text-blue-500 bg-blue-50',  title: 'Data Structures & Algorithms Essentials (2021)',    rating: 4.7, students: '451,444', price: '$57', image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=300&q=80' },
  ],
};

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} className={s <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
      ))}
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

        <p className="text-center text-gray-400 text-xs mt-3">THIS COURSE INCLUDES:</p>
        <ul className="space-y-2 mt-2">
          {course.includes.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-xs text-gray-600">
              <Icon size={14} className="text-gray-400 flex-shrink-0" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-100 px-5 py-4">
        <div className="flex gap-4 text-xs font-semibold border-b border-gray-100 mb-4">
          {['Overview', 'Curriculum', 'Instructor'].map((t, i) => (
            <button key={t} className={`pb-2 ${i === 0 ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}>{t}</button>
          ))}
        </div>
        {/* mini content */}
        <p className="text-xs font-bold text-gray-900 mb-2">Course Description</p>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">
          Master the art of modern product design and build a career in tech with our Figma UI/UX Design 3-in-1 Course...
        </p>
        <p className="text-xs font-bold text-gray-900 mt-3 mb-2">What you will learn in this course</p>
        {['You will learn how to design beautiful websites using Figma...', 'You will learn how to take your designs and build them into powerful websites...', 'You will learn secret tips of Freelance Web Designers...', 'Learn to use Python professionally...'].map(item => (
          <div key={item} className="flex items-start gap-2 mb-1.5">
            <CheckCircle size={12} className="text-primary flex-shrink-0 mt-0.5" />
            <span className="text-xs text-gray-600 line-clamp-2">{item}</span>
          </div>
        ))}
        <p className="text-xs font-bold text-gray-900 mt-3 mb-2">Who this course is for:</p>
        {['Beginners with no prior experience...', 'Aspiring UI/UX designers...', 'Freelancers looking to build...', 'Students or career switchers...', 'Anyone interested in designing...'].map(item => (
          <div key={item} className="flex items-start gap-2 mb-1">
            <span className="text-gray-400 text-xs mt-0.5">•</span>
            <span className="text-xs text-gray-600">{item}</span>
          </div>
        ))}
        <p className="text-xs font-bold text-gray-900 mt-3 mb-2">Course requirements</p>
        {['No prior design or coding experience required', 'A laptop or desktop computer', 'Internet connection', 'Basic computer knowledge', 'Willingness to learn...'].map(item => (
          <div key={item} className="flex items-start gap-2 mb-1">
            <span className="text-gray-400 text-xs mt-0.5">•</span>
            <span className="text-xs text-gray-600">{item}</span>
          </div>
        ))}
        <p className="text-xs font-bold text-gray-900 mt-3 mb-2">Course instructor (02)</p>
        <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-3">
          <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Instructor" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-bold text-primary text-xs">Vako Shvili</p>
            <p className="text-gray-400 text-xs">UX Design Lead</p>
            <p className="text-gray-400 text-xs mt-0.5">Lena brings 10+ years of experience in creating innovative design solutions for tech startups and global brands.</p>
          </div>
        </div>
        <p className="text-xs font-bold text-gray-900 mt-3 mb-2">Students Feedback</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span>5 Star Rating</span>
          <ChevronDown size={12} />
        </div>
        {[
          { name: 'Guy Hawkins', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', time: '1 week ago', text: 'The course made UI/UX design simple and easy to understand.' },
          { name: 'Dianne Russell', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', time: '51 mins ago', text: 'A perfect blend of design, development, and freelancing.' },
          { name: 'Ralph Edwards', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', time: '2 days ago', text: 'The real-life approach and portfolio guidance really stood out.' },
        ].map(r => (
          <div key={r.name} className="flex gap-2 mb-3">
            <img src={r.avatar} alt={r.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-900">{r.name}</span>
                <span className="text-gray-300 text-xs">• {r.time}</span>
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const [openSections, setOpenSections] = useState({ 0: true });
  const toggleSection = (i) => setOpenSections(p => ({ ...p, [i]: !p[i] }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Banner */}
        <div className="relative h-64 lg:h-80 bg-gray-900 overflow-hidden">
          <img src={course.banner} alt={course.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded mb-3 w-fit uppercase tracking-wider">
              {course.category}
            </span>
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white mb-2">{course.title}</h1>
            <p className="text-white/80 text-sm max-w-xl">{course.subtitle}</p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="border-b border-gray-100 py-3 px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-400 max-w-7xl mx-auto">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <Link href="/courses" className="hover:text-primary">Design</Link>
            <ChevronRight size={12} />
            <span className="text-gray-600">Figma</span>
          </nav>
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
                        <div className="text-center">
                          <p className="text-xl font-extrabold text-gray-900">{course.instructor.courses}</p>
                          <p className="text-xs text-gray-400">COURSES</p>
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
