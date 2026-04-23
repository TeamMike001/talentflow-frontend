'use client';

<<<<<<< HEAD
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
=======
import Link from 'next/link';
import { useState } from 'react';
import { Star, Users, BookOpen, ChevronDown, ChevronRight, Play, Award, Monitor, Infinity, CheckCircle2 } from 'lucide-react';

// Same PublicNavbar used in CourseSearch
function PublicNavbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">TF</span>
            </div>
            <span className="font-extrabold text-gray-900 text-sm">Talent<span className="text-primary">Flow</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary font-medium">Home</Link>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary font-medium">Courses <ChevronDown size={14} /></button>
            <Link href="/about" className="text-sm text-gray-600 hover:text-primary font-medium">About</Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-primary font-medium">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-bold text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all">Sign In</Link>
          <Link href="/sign-up" className="text-sm font-bold text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary-dark transition-all">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><span className="text-white text-xs font-black">TF</span></div>
            <span className="font-extrabold text-sm">Talent<span className="text-primary">Flow</span></span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">Top learning experiences that create more talent in the world.</p>
          <div className="flex gap-2">
            <input placeholder="Enter your email" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-primary" />
            <button className="bg-primary text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-primary-dark transition-all">Submit</button>
          </div>
        </div>
        {[
          { title: 'Product', links: ['Overview', 'Features', 'Solutions', 'Tutorials', 'Pricing'] },
          { title: 'Company', links: ['About us', 'Features', 'News'] },
          { title: 'Social', links: ['Twitter', 'LinkedIn', 'GitHub', 'Clickup'] },
          { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Contact'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">{col.links.map((l) => <li key={l}><Link href="#" className="text-gray-400 text-xs hover:text-white transition-colors">{l}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-gray-500 text-xs">© 2026 Team Mike – UI/UX. All rights reserved.</p>
      </div>
    </footer>
  );
}

const TABS = ['Overview', 'Curriculum', 'Instructor', 'Review'];

const curriculum = [
  { section: 'Section 1: Introduction', lessons: ['Welcome to the course', 'Setting up your tools', 'Navigating Figma interface', 'Your first frame'] },
  { section: 'Section 2: Design Fundamentals', lessons: ['Typography systems', 'Color theory', 'Grid & layouts', 'Component basics'] },
  { section: 'Section 3: Advanced Prototyping', lessons: ['Interactive components', 'Micro-interactions', 'Auto layout mastery', 'Exporting & handoff'] },
];

const instructors = [
  { name: 'Vako Shvili', role: 'Webflow Developer & Product Builder', avatar: 'https://randomuser.me/api/portraits/men/50.jpg', rating: 4.9, students: 256, courses: 9, bio: 'An experienced Webflow developer focused on turning designs into responsive, high-performing websites. Skilled in no-code development and helping students bring their ideas to life quickly.' },
  { name: 'Nima Tahami', role: 'UI/UX Designer & Product Design Lead', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', rating: 4.6, students: 128, courses: 1, bio: 'A passionate UI/UX designer with hands-on experience in building user-centered digital products. He specializes in creating intuitive interfaces, design systems, and guiding teams to deliver high-quality user experiences.' },
];

const reviews = [
  { name: 'Guy Hawkins', avatar: 'https://randomuser.me/api/portraits/men/60.jpg', rating: 5, time: '1 week ago', text: 'The course made UI/UX design simple and easy to understand. I was able to design my first complete project in no time!' },
  { name: 'Dianne Russell', avatar: 'https://randomuser.me/api/portraits/women/61.jpg', rating: 5, time: '51 mins ago', text: 'A perfect blend of design, development, and freelancing. Highly practical and beginner-friendly.' },
  { name: 'Ralph Edwards', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', rating: 5, time: '2 days ago', text: 'The real-life approach and portfolio guidance really stood out. I feel ready to take on clients.' },
];

const relatedCourses = [
  { id: 11, title: 'Learn Python Programming Masterclass', category: 'DESIGN', rating: 4.0, students: 211434, image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80' },
  { id: 12, title: 'Data Structures & Algorithms Essentials (2021)', category: 'DESIGN', rating: 4.7, students: 451444, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 13, title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click', category: 'DESIGN', rating: 4.1, students: 154817, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 14, title: 'Data Structures & Algorithms Essentials (2021)', category: 'DESIGN', rating: 4.7, students: 451444, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
];

function RelatedCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="h-36 rounded-xl overflow-hidden mb-3 bg-gray-100">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{course.category}</span>
      <h3 className="font-bold text-gray-900 text-sm mt-0.5 mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1"><Star size={11} className="fill-yellow-400 text-yellow-400" /><span className="font-bold text-gray-700">{course.rating}</span></div>
        <div className="flex items-center gap-1"><Users size={11} /><span>{course.students.toLocaleString()} students</span></div>
      </div>
    </Link>
  );
}

export default function CourseDetail() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openSections, setOpenSections] = useState({ 0: true });
  const [reviewFilter, setReviewFilter] = useState('5 Star Rating');

  const toggleSection = (i) => setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/courses" className="hover:text-primary transition-colors">Design</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">Figma</span>
        </nav>

        <div className="flex gap-8 items-start">

          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-gray-900 text-2xl mb-3">Figma UI UX Design..</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.
            </p>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-7 h-7 rounded-full border-2 border-white" alt="" />
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" className="w-7 h-7 rounded-full border-2 border-white -ml-2" alt="" />
                </div>
                <span className="text-xs text-gray-500">Created by <span className="text-primary font-semibold">Jane Cooper • Kristin Watson</span></span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => <Star key={s} size={13} className="fill-yellow-400 text-yellow-400" />)}
                <span className="text-sm font-bold text-gray-700 ml-1">4.8</span>
                <span className="text-xs text-gray-400 ml-1">(451,444 Rating)</span>
              </div>
            </div>

            {/* Video */}
            <div className="relative rounded-2xl overflow-hidden mb-6 bg-gray-900 cursor-pointer group">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80" alt="Course preview" className="w-full h-80 object-cover opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={22} className="text-primary ml-1" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-0">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
>>>>>>> parent of 4d42df6 (Complete course)
                    {tab}
                  </button>
                ))}
              </div>
            </div>
<<<<<<< HEAD
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
=======

            {/* ── Overview ── */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base mb-3">Course Description</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">Master the art of modern product design and build a career in tech with our Figma UI/UX Design 3-In-1 Course. This program is designed to take you from beginner to professional by combining design, development, and freelancing into one practical learning experience.</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">You'll learn how to design stunning, user-friendly websites using Figma, bring those designs to life without coding using Webflow, and confidently position yourself as a freelance designer.</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">Unlike traditional courses that overcomplicate the process, this course focuses on simplicity, real-world application, and speed.</p>
                  <p className="text-gray-600 text-sm font-semibold mb-2">By the end of this course, you will:</p>
                  <ul className="text-gray-600 text-sm space-y-1 pl-1">
                    {['Design complete, high-quality websites in Figma', 'Build responsive websites without writing code', 'Create a professional portfolio that attracts clients', 'Learn proven strategies to start freelancing and earning'].map((item) => (
                      <li key={item} className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* What you will learn */}
                <div className="bg-blue-50 rounded-2xl p-5">
                  <h2 className="font-extrabold text-gray-900 text-base mb-4">What you will learn in this course</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      'You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.',
                      'You will learn how to take your designs and build them into powerful websites using Webflow, a state of the art site builder used by teams at Dell, NASA and more.',
                      'You will learn secret tips of Freelance Web Designers and how they make great money freelancing online.',
                      'Learn to use Python professionally, learning both Python 2 and Python 3!',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <p className="text-gray-700 text-xs leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who this is for */}
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base mb-3">Who this course is for:</h2>
                  <ul className="text-gray-600 text-sm space-y-1.5 pl-1">
                    {['Beginners with no prior experience in design or tech', 'Aspiring UI/UX designers who want to learn modern tools', 'Freelancers looking to build a profitable design career', 'Students or career switchers entering the tech industry', 'Anyone interested in designing and building websites without coding'].map((item) => (
                      <li key={item} className="flex items-start gap-2"><span className="text-gray-400">•</span>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base mb-3">Course requirements</h2>
                  <ul className="text-gray-600 text-sm space-y-1.5 pl-1">
                    {['No prior design or coding experience required', 'A laptop or desktop computer', 'Internet connection', 'Basic computer knowledge', 'Willingness to learn, practice, and stay consistent'].map((item) => (
                      <li key={item} className="flex items-start gap-2"><span className="text-gray-400">•</span>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructors preview */}
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base mb-4">Course instructor (02)</h2>
                  {instructors.map((inst) => (
                    <div key={inst.name} className="border border-gray-100 rounded-2xl p-5 mb-4 flex gap-4">
                      <img src={inst.avatar} alt={inst.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm mb-0.5">{inst.name}</h3>
                        <p className="text-gray-400 text-xs mb-3">{inst.role}</p>
                        <div className="flex items-center gap-5 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1"><Star size={11} className="fill-yellow-400 text-yellow-400" /> {inst.rating} Course rating</span>
                          <span className="flex items-center gap-1"><Users size={11} /> {inst.students} Students</span>
                          <span className="flex items-center gap-1"><BookOpen size={11} /> {String(inst.courses).padStart(2,'0')} Courses</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{inst.bio} <button className="text-primary font-semibold hover:underline">READ MORE</button></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Curriculum ── */}
            {activeTab === 'Curriculum' && (
              <div>
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Course Content</h2>
                {curriculum.map((sec, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl mb-3 overflow-hidden">
                    <button
                      onClick={() => toggleSection(i)}
                      className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-bold text-gray-800 text-sm">{sec.section}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{sec.lessons.length} lessons</span>
                        {openSections[i] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </div>
                    </button>
                    {openSections[i] && (
                      <div className="px-5">
                        {sec.lessons.map((lesson, j) => (
                          <div key={j} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                            <Play size={12} className="text-gray-300 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Instructor ── */}
            {activeTab === 'Instructor' && (
              <div>
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Course instructor (02)</h2>
                {instructors.map((inst) => (
                  <div key={inst.name} className="border border-gray-100 rounded-2xl p-5 mb-4 flex gap-4">
                    <img src={inst.avatar} alt={inst.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{inst.name}</h3>
                      <p className="text-gray-400 text-xs mb-3">{inst.role}</p>
                      <div className="flex items-center gap-5 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Star size={11} className="fill-yellow-400 text-yellow-400" /> {inst.rating} Course rating</span>
                        <span className="flex items-center gap-1"><Users size={11} /> {inst.students} Students</span>
                        <span className="flex items-center gap-1"><BookOpen size={11} /> {String(inst.courses).padStart(2,'0')} Courses</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{inst.bio} <button className="text-primary font-semibold hover:underline">READ MORE</button></p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Review ── */}
            {activeTab === 'Review' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-extrabold text-gray-900 text-base">Students Feedback</h2>
                  <select value={reviewFilter} onChange={(e) => setReviewFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 bg-white outline-none focus:border-primary">
                    {['5 Star Rating', '4 Star Rating', '3 Star Rating', '2 Star Rating'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                {reviews.map((rev) => (
                  <div key={rev.name} className="py-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-gray-900 text-sm">{rev.name}</span>
                      <span className="text-xs text-gray-400 ml-auto">{rev.time}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{rev.text}</p>
                  </div>
                ))}
                <button className="mt-4 border border-gray-200 text-gray-500 text-xs font-semibold px-5 py-2.5 rounded-xl hover:border-primary hover:text-primary transition-all">
                  Load More ↻
                </button>
              </div>
            )}
          </div>

          {/* ── Sticky Enroll Card ── */}
          <div className="w-80 flex-shrink-0 sticky top-20">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <p className="font-extrabold text-gray-900 text-2xl mb-5">$89.99</p>
              <button className="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark transition-all mb-3">
                Enroll Now
              </button>
              <button className="w-full py-3 border border-primary text-primary font-bold text-sm rounded-xl hover:bg-primary/5 transition-all mb-5">
                Try for Free
              </button>
              <div className="space-y-3">
                {[
                  [Infinity, 'Full lifetime access'],
                  [Monitor, 'Access on mobile and desktop'],
                  [Award, 'Certificate of completion'],
                  [BookOpen, '42 hours on-demand video'],
                ].map(([Icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-xs text-gray-600">
                    <Icon size={15} className="text-gray-400 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-5 pt-4 border-t border-gray-100">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>

        </div>

        {/* ── Related Courses ── */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-gray-900 text-xl">Related Courses</h2>
            <Link href="/courses" className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-sm font-bold px-4 py-2 rounded-xl hover:border-primary hover:text-primary transition-all">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCourses.map((course) => <RelatedCard key={course.id} course={course} />)}
          </div>
        </div>

      </div>

      <PublicFooter />
>>>>>>> parent of 4d42df6 (Complete course)
    </div>
  );
}