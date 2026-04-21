'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import {
  ChevronRight, Star, CheckCircle, Play, Lock,
  ChevronUp, AlertCircle, Globe, Monitor, FileText,
  Clock, Users, Link2,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */
const course = {
  id: 1,
  title: 'Figma UI UX Design..',
  subtitle: '3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.',
  heroImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80',
  heroTag: 'USER INTERFACE',
  heroTagColor: '#f59e0b',
  rating: 4.8, totalRatings: 45444,
  price: '$89.99', originalPrice: '$149.99', discount: '40% OFF',
  urgency: '2 days left at this price!',
  duration: '6 Month', level: 'Beginner and Intermediate',
  instructors: [
    { name: 'Jane Cooper',    avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ],
  includes: [
    { icon: Clock,   text: '18 hours on-demand video' },
    { icon: FileText, text: '12 downloadable resources' },
    { icon: Monitor, text: 'Full lifetime access' },
    { icon: Globe,   text: 'Certificate of completion' },
  ],
  whatYoullLearn: [
    'You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.',
    'You will learn how to take your designs and build them into powerful websites using Webflow.',
    'You will learn secret tips of Freelance Web Designers and how they make great money freelancing online.',
    'Learn to use Python professionally, learning both Python 2 and Python 3!',
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
  curriculum: [
    {
      id: 1, title: 'Foundations of Experience Design',
      lessons: 4, duration: '1h 31m', open: true,
      items: [
        { title: 'What is User Design?',    duration: '12:45' },
        { title: "The Designer's Mindset",  duration: '51:22' },
      ],
    },
    { id: 2, title: 'Visual Hierarchies & Layouts',  lessons: 6, duration: '2h 31m', open: false, items: [] },
    { id: 3, title: 'Prototyping & Interactions',    lessons: 8, duration: '3h 49m', open: false, locked: true, items: [] },
  ],
  instructorDetails: {
    name: 'John Smith',
    role: 'Senior UX Lead at TalentFlow',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 4.9, students: 15302, courses: 12,
    bio: 'Sarah is a veteran designer with over 12 years of experience building products for Fortune 500 companies. She has mentored over 500+ designers and is a frequent speaker at global design conferences like Config and Adobe MAX.',
  },
  reviews: [
    { id: 1, name: 'Alex Thompson',   avatar: 'https://randomuser.me/api/portraits/men/10.jpg',   rating: 5, text: 'This course completely changed the way I think about UI apps. The module on psychological triggers was worth the price alone.' },
    { id: 2, name: 'Elena Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', rating: 5, text: 'Great production quality and practical assignments. I would highly recommend this to any junior designer.' },
    { id: 3, name: 'Elena Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', rating: 5, text: 'Great production quality and practical assignments. I would highly recommend this to any junior designer.' },
  ],
  relatedCourses: [
    { id: 2, tag: 'Design', title: 'Learn Python Programming Masterclass',                           price: '$57', rating: 4.6, students: '251,434 students', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
    { id: 3, tag: 'Design', title: 'Data Structures & Algorithms Essentials (2021)',                 price: '$57', rating: 4.7, students: '451,444 students', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
    { id: 4, tag: 'Design', title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click',   price: '$57', rating: 4.3, students: '154,817 students', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
    { id: 5, tag: 'Design', title: 'Data Structures & Algorithms Essentials (2021)',                 price: '$57', rating: 4.7, students: '451,444 students', image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
  ],
};

const tabs = ['Overview', 'Curriculum', 'Instructor', 'Review'];

/* ─────────────────────────── HELPERS ─────────────────────────── */
function Stars({ rating, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size}
          className={s <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />
      ))}
    </div>
  );
}

/* ─────────────────────────── RIGHT STICKY CARD ─────────────────────────── */
function PriceCard({ c }) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
        <div className="p-5">
          {/* Price row */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900">{c.price}</span>
            <span className="text-sm text-gray-400 line-through">{c.originalPrice}</span>
            <span className="bg-orange-100 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-md">{c.discount}</span>
          </div>
          <div className="flex items-center gap-1 text-red-500 text-[10px] font-medium mb-4">
            <AlertCircle size={11} />
            <span>{c.urgency}</span>
          </div>

          {/* Buttons */}
          <Link href={`/student/checkout?course=${c.id}`}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center flex items-center justify-center gap-2 hover:bg-blue-700 transition-all mb-2">
            Enroll Course 🚀
          </Link>
          <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all mb-4">
            Free Preview
          </button>

          {/* This course includes */}
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">This Course Includes:</p>
          <ul className="space-y-2 mb-4">
            {c.includes.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-xs text-gray-600">
                <Icon size={13} className="text-blue-500 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>

          {/* Guarantee */}
          <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all">
            30-Day Money-Back Guarantee
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── CURRICULUM SECTION ─────────────────────────── */
function CurriculumSection({ modules }) {
  const [open, setOpen] = useState({ 1: true });
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-400">12 Modules • 48 lessons • 18h Total Length</p>
        <button className="text-blue-600 text-sm font-semibold hover:underline">Expand All</button>
      </div>
      <div className="space-y-2">
        {modules.map((mod) => (
          <div key={mod.id} className="rounded-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <button
              onClick={() => setOpen((p) => ({ ...p, [mod.id]: !p[mod.id] }))}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-yellow-400 hover:bg-yellow-300 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-white font-extrabold text-[10px]">
                  {String(mod.id).padStart(2, '0')}
                </span>
                <span className="text-white font-bold text-sm">{mod.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {mod.locked && <Lock size={13} className="text-white/80" />}
                <span className="text-white/90 text-xs hidden sm:block">{mod.lessons} Lessons • {mod.duration}</span>
                {open[mod.id]
                  ? <ChevronUp size={14} className="text-white" />
                  : <ChevronRight size={14} className="text-white" />}
              </div>
            </button>
            {/* Lessons */}
            {open[mod.id] && mod.items.length > 0 && (
              <div className="bg-white divide-y divide-gray-50">
                {mod.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Play size={12} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{item.title}</span>
                    </div>
                    <span className="text-xs text-gray-400">{item.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function CourseDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab]     = useState('Overview');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Shared Sidebar ── */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        {/* ── Shared Navbar ── */}
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-w-0 overflow-x-hidden pb-24 lg:pb-0">

          {/* ── HERO IMAGE ── */}
          <div className="relative h-56 sm:h-72 lg:h-80 bg-gray-900 overflow-hidden">
            <img src={course.heroImage} alt={course.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded text-white w-fit mb-3"
                style={{ backgroundColor: course.heroTagColor }}>
                {course.heroTag}
              </span>
              <h1 className="text-white text-2xl sm:text-4xl font-extrabold mb-2 leading-tight">Intro to User Design</h1>
              <p className="text-white/70 text-xs sm:text-sm max-w-lg">
                From foundational basics to advanced mastery — expert-led paths designed to turn your ambition into a career.
              </p>
            </div>
          </div>

          {/* ── TABS ── */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10 lg:top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8">

              {/* ══ LEFT COLUMN ══ */}
              <div className="space-y-10 min-w-0">

                {/* ── OVERVIEW TAB ── */}
                {activeTab === 'Overview' && (
                  <>
                    {/* ABOUT COURSE */}
                    <section>
                      <h2 className="text-xl font-extrabold text-gray-900 mb-4">About Course</h2>

                      {/* Description + price card (mobile: stacked, tablet: side by side) */}
                      <div className="grid lg:grid-cols-[1fr] gap-6">
                        <div>
                          <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            This course is designed for aspiring designers who want to bridge the gap between aesthetic beauty and functional utility. You will explore the cognitive biases that drive user behavior and learn how to translate those insights into intuitive interface designs.
                          </p>
                          <p className="text-gray-500 text-sm leading-relaxed mb-5">
                            We believe design is not just what it looks like, but how it works. Through a series of hands-on projects, you will develop a portfolio-ready case study starting from user research and wireframing all the way to a polished interactive prototype.
                          </p>

                          {/* What you'll learn + Prerequisites */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-xl p-4">
                              <p className="font-bold text-sm text-gray-900 mb-2">What you'll learn</p>
                              <ul className="space-y-1.5">
                                {['User Psychology & Mental Models', 'Advanced Prototyping Techniques'].map((item) => (
                                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                      <CheckCircle size={9} className="text-white" />
                                    </div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                              <p className="font-bold text-sm text-gray-900 mb-2">Prerequisites</p>
                              <ul className="space-y-1.5">
                                {['Basic understanding of digital interfaces', 'Access to Figma (free version)'].map((item) => (
                                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                                    <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                      <CheckCircle size={9} className="text-white" />
                                    </div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile price card */}
                      <div className="lg:hidden mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-extrabold text-gray-900">{course.price}</span>
                          <span className="text-sm text-gray-400 line-through">{course.originalPrice}</span>
                          <span className="bg-orange-100 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-md">{course.discount}</span>
                        </div>
                        <div className="flex gap-2 mb-3">
                          <Link href={`/student/checkout?course=${course.id}`}
                            className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs text-center hover:bg-blue-700">
                            Enroll Course 🚀
                          </Link>
                          <button className="flex-1 py-2.5 border border-blue-600 text-blue-600 font-bold rounded-xl text-xs hover:bg-blue-50">
                            Free Preview
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {course.includes.map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                              <Icon size={11} className="text-blue-500 flex-shrink-0" />{text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* COURSE CURRICULUM */}
                    <section>
                      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Course Curriculum</h2>
                      <CurriculumSection modules={course.curriculum} />
                    </section>

                    {/* LEAD INSTRUCTOR */}
                    <section>
                      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Lead Instructor</h2>
                      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
                        <div className="flex gap-4 items-start">
                          <img src={course.instructorDetails.avatar} alt={course.instructorDetails.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-extrabold text-gray-900 text-base">{course.instructorDetails.name}</p>
                                <p className="text-blue-500 text-xs mt-0.5">{course.instructorDetails.role}</p>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600">
                                  <Link2 size={12} />
                                </button>
                                <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600">
                                  <Globe size={12} />
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-3">{course.instructorDetails.bio}</p>
                            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 text-center">
                              <div>
                                <p className="text-lg sm:text-xl font-extrabold text-gray-900">{course.instructorDetails.rating}</p>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide">Instructor Rating</p>
                              </div>
                              <div>
                                <p className="text-lg sm:text-xl font-extrabold text-gray-900">{course.instructorDetails.students.toLocaleString()}</p>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide">Total Students</p>
                              </div>
                              <div>
                                <p className="text-lg sm:text-xl font-extrabold text-gray-900">{course.instructorDetails.courses}</p>
                                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wide">Courses</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* STUDENT REVIEWS */}
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-extrabold text-gray-900">Student Reviews</h2>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-50">
                          Write a Review
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {course.reviews.map((r) => (
                          <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="text-xs font-bold text-gray-900">{r.name}</p>
                                <Stars rating={r.rating} size={11} />
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{r.text}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* WHO FOR + REQUIREMENTS */}
                    <section className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-base font-extrabold text-gray-900 mb-3">Who this course is for:</h2>
                        <ul className="space-y-2">
                          {course.whoFor.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-base font-extrabold text-gray-900 mb-3">Course requirements</h2>
                        <ul className="space-y-2">
                          {course.requirements.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  </>
                )}

                {/* ── CURRICULUM TAB ── */}
                {activeTab === 'Curriculum' && (
                  <section>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-4">Course Curriculum</h2>
                    <CurriculumSection modules={course.curriculum} />
                  </section>
                )}

                {/* ── INSTRUCTOR TAB ── */}
                {activeTab === 'Instructor' && (
                  <section>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-4">Lead Instructor</h2>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
                      <div className="flex gap-4 items-start">
                        <img src={course.instructorDetails.avatar} alt={course.instructorDetails.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-extrabold text-gray-900 text-base">{course.instructorDetails.name}</p>
                              <p className="text-blue-500 text-xs mt-0.5">{course.instructorDetails.role}</p>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed mt-3">{course.instructorDetails.bio}</p>
                          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 text-center">
                            <div>
                              <p className="text-xl font-extrabold text-gray-900">{course.instructorDetails.rating}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Instructor Rating</p>
                            </div>
                            <div>
                              <p className="text-xl font-extrabold text-gray-900">{course.instructorDetails.students.toLocaleString()}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Total Students</p>
                            </div>
                            <div>
                              <p className="text-xl font-extrabold text-gray-900">{course.instructorDetails.courses}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* ── REVIEW TAB ── */}
                {activeTab === 'Review' && (
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-xl font-extrabold text-gray-900">Student Reviews</h2>
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-50">
                        Write a Review
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {course.reviews.map((r) => (
                        <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="text-xs font-bold text-gray-900">{r.name}</p>
                              <Stars rating={r.rating} size={11} />
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* ── RELATED COURSES (shown on all tabs) ── */}
                <section>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-extrabold text-gray-900">Related Courses</h2>
                    <Link href="/student/StudentCourses"
                      className="flex items-center gap-1 text-blue-600 text-sm font-semibold border border-blue-600 rounded-xl px-3 py-1.5 hover:bg-blue-50">
                      View All <ChevronRight size={13} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {course.relatedCourses.map((rc) => (
                      <Link key={rc.id} href="/student/CourseDetail"
                        className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                        <div className="h-24 sm:h-28 overflow-hidden">
                          <img src={rc.image} alt={rc.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-2.5">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-red-500 bg-red-50">{rc.tag}</span>
                          <h3 className="text-[10px] font-bold text-gray-800 leading-snug line-clamp-2 mt-1 group-hover:text-blue-600">{rc.title}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={9} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-[9px] font-medium text-gray-700">{rc.rating}</span>
                            <span className="text-[9px] text-gray-400">{rc.students}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              {/* ══ RIGHT STICKY PRICE CARD ══ */}
              <PriceCard c={course} />
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="border-t border-gray-100 bg-white px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            <span>© 2026 Team Mike - UI/UX. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/faqs" className="hover:text-gray-600">FAQs</Link>
              <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-600">Terms & Condition</Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile bottom enroll bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 shadow-xl">
        <div>
          <span className="font-extrabold text-gray-900 text-lg">{course.price}</span>
          <span className="text-gray-400 text-xs line-through ml-1">{course.originalPrice}</span>
        </div>
        <Link href={`/student/checkout?course=${course.id}`}
          className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm text-center hover:bg-blue-700 transition-all">
          Enroll Now
        </Link>
      </div>
    </div>
  );
}