'use client';

<<<<<<< HEAD
import { useState } from 'react';
import Navbar from '@/landing_page/StudentNavbar';
import Footer from '@/landing_page/Footer';
import Link from 'next/link';
import {
  SlidersHorizontal, Search, ChevronDown, ChevronUp,
  Star, Users, ChevronLeft, ChevronRight, X
} from 'lucide-react';

/* ── Static data ───────────────────────────────────── */
const allCourses = [
  { id: 1,  tag: 'DESIGN', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',            rating: 4.6, students: '181,811', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 2,  tag: 'DESIGN', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',           rating: 4.5, students: '854',     image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 3,  tag: 'DESIGN', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',          rating: 4.2, students: '2,711',   image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80' },
  { id: 4,  tag: 'DESIGN', title: 'Learn Python Programming Masterclass',                                   rating: 4.0, students: '211,434', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 5,  tag: 'DESIGN', title: 'Data Structures & Algorithms Essentials (2021)',                         rating: 4.7, students: '451,444', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 6,  tag: 'DESIGN', title: 'Ultimate Google Ads Training 2020: Profit with Pay Per Click',           rating: 4.1, students: '154,817', image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
  { id: 7,  tag: 'DESIGN', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',            rating: 4.6, students: '181,811', image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=400&q=80' },
  { id: 8,  tag: 'DESIGN', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',           rating: 4.5, students: '854',     image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&q=80' },
  { id: 9,  tag: 'DESIGN', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',          rating: 4.2, students: '2,711',   image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&q=80' },
  { id: 10, tag: 'DESIGN', title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',            rating: 4.6, students: '181,811', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
  { id: 11, tag: 'DESIGN', title: 'Instagram Marketing 2021: Complete Guide To Instagram Gro...',           rating: 4.5, students: '854',     image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
  { id: 12, tag: 'DESIGN', title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',          rating: 4.2, students: '2,711',   image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
];

const categories = [
  { name: 'Development', count: null, children: [
    { name: 'Web development',    count: 574,  checked: false },
    { name: 'Data Science',       count: 648,  checked: false },
    { name: 'Mobile Development', count: 1345, checked: true  },
    { name: 'Software Testing',   count: 317,  checked: false },
    { name: 'No-Code Development',count: 37,   checked: false },
  ]},
  { name: 'IT & Software', count: null, children: [] },
  { name: 'Design',        count: null, children: [] },
  { name: 'Data Analysis', count: null, children: [] },
];

const tools = [
  { name: 'HTML 5',  count: 1345, checked: false },
  { name: 'CSS 3',   count: 12735,checked: false },
  { name: 'React',   count: 1345, checked: false },
  { name: 'Webflow', count: 1345, checked: true  },
  { name: 'Node.js', count: 1345, checked: false },
  { name: 'Wordpress',count: 1345,checked: false },
];

const levels      = ['All level', 'Beginner', 'Intermediate', 'Expert'];
const durations   = ['6-12 Months', '3-6 Months', '1-3 Months', '1-4 Weeks', '1-7 Days'];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-extrabold text-gray-700 uppercase tracking-wider mb-3"
      >
        {title}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && children}
    </div>
  );
}

function CheckItem({ label, count, checked: initChecked }) {
  const [checked, setChecked] = useState(initChecked || false);
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer group">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4 accent-primary rounded"
        />
        <span className={`text-sm transition-colors ${checked ? 'text-primary font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
          {label}
        </span>
      </div>
      {count !== undefined && <span className="text-xs text-gray-400">{count.toLocaleString()}</span>}
    </label>
  );
}

export default function CoursesSearchPage() {
  const [query,     setQuery]     = useState('UI/UX Design');
  const [sortBy,    setSortBy]    = useState('Trending');
  const [page,      setPage]      = useState(2);
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin,  setPriceMin]  = useState(0);
  const [priceMax,  setPriceMax]  = useState(200);
  const [catOpen,   setCatOpen]   = useState(true);
  const pages = [1, 2, 3, 4, 5];

  const suggestions = ['user interface', 'user experience', 'web design', 'interface', 'app'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Search bar */}
        <div className="border-b border-gray-100 bg-white sticky top-16 z-10 px-4 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filter
              <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </button>

            {/* Search input */}
            <div className="flex-1 min-w-48 flex items-center gap-2 border border-blue-300 rounded-xl px-4 py-2.5">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-sm text-gray-700 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:border-primary bg-white"
                >
                  <option>Trending</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Most Popular</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Suggestions + result count */}
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Suggestion:</span>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="text-primary text-xs font-medium hover:underline"
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500">3,684 results find for &quot;ui/ux design&quot;</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex gap-6">

            {/* ── FILTER SIDEBAR ── */}
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-56 flex-shrink-0`}>

              {/* Category */}
              <FilterSection title="Category">
                {categories.map((cat, ci) => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setCatOpen(!catOpen)}
                      className="flex items-center justify-between w-full py-1.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                          {ci === 0 && <div className="w-2 h-2 bg-primary rounded-sm" />}
                        </div>
                        {cat.name}
                      </div>
                      {ci === 0 && (catOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />)}
                    </button>
                    {ci === 0 && catOpen && cat.children.length > 0 && (
                      <div className="pl-4 mt-1 space-y-0.5">
                        {cat.children.map(child => (
                          <CheckItem key={child.name} label={child.name} count={child.count} checked={child.checked} />
=======
import Navbar from '@/landing_page/Navbar';
import Footer from '@/landing_page/Footer';
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
      <Navbar />

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
                    {tab}
                  </button>
                ))}
              </div>
            </div>

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
>>>>>>> parent of 4d42df6 (Complete course)
                        ))}
                      </div>
                    )}
                  </div>
                ))}
<<<<<<< HEAD
              </FilterSection>

              {/* Tools */}
              <FilterSection title="Tools">
                <div className="space-y-0.5">
                  {tools.map(t => <CheckItem key={t.name} label={t.name} count={t.count} checked={t.checked} />)}
                </div>
              </FilterSection>

              {/* Course Level */}
              <FilterSection title="Course Level">
                <div className="space-y-0.5">
                  {levels.map(l => <CheckItem key={l} label={l} count={1345} />)}
                </div>
              </FilterSection>

              {/* Price */}
              <FilterSection title="Price">
                <div className="space-y-3">
                  <div className="relative h-4 flex items-center">
                    <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
                    <div
                      className="absolute h-1 bg-primary rounded-full"
                      style={{ left: `${(priceMin/500)*100}%`, right: `${100-(priceMax/500)*100}%` }}
                    />
                    <input type="range" min="0" max="500" value={priceMin}
                      onChange={e => setPriceMin(+e.target.value)}
                      className="absolute w-full appearance-none bg-transparent accent-primary" />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 block mb-1">$ min:</label>
                      <input type="number" value={priceMin} onChange={e => setPriceMin(+e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-primary" />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-400 block mb-1">$ max:</label>
                      <input type="number" value={priceMax} onChange={e => setPriceMax(+e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <CheckItem label="Paid" count={1345} />
                    <CheckItem label="Free" count={1345} />
                  </div>
                </div>
              </FilterSection>

              {/* Duration */}
              <FilterSection title="Duration">
                <div className="space-y-0.5">
                  {durations.map((d, i) => <CheckItem key={d} label={d} count={1345} checked={i === 2} />)}
                </div>
              </FilterSection>
            </aside>

            {/* ── COURSE GRID ── */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {allCourses.map(c => (
                  <Link key={c.id} href={`/courses/${c.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-36 overflow-hidden bg-gray-100">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <span className="text-primary text-xs font-bold">{c.tag}</span>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mt-0.5 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {c.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-700">{c.rating}</span>
                        <Users size={11} className="ml-1" />
                        <span>{c.students} students</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                  <ChevronLeft size={16} />
                </button>
                {pages.map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-colors ${
                      p === page
                        ? 'bg-primary text-white shadow-md'
                        : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {String(p).padStart(2,'0')}
                  </button>
                ))}
                <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
=======
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

          {/* ── Sticky Enroll Card ──
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
          </div> */}

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
    <Footer />
      
    </div>
  );
}
>>>>>>> parent of 4d42df6 (Complete course)
