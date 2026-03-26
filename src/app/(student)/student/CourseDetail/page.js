'use client';

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
    </div>
  );
}