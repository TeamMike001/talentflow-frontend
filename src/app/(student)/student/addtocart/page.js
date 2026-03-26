'use client';

import { useState } from 'react';
import Navbar from '@/landing_page/StudentNavbar';
import Footer from '@/landing_page/Footer';
import Link from 'next/link';
import {
  Star, Clock, Users, Play, CheckCircle, Heart, Share2,
  Copy, Mail, ChevronRight, AlertCircle, Laptop, Globe,
  FileText, Award, Monitor, BookOpen, Download
} from 'lucide-react';

/* ─── Static Data ─────────────────────────────────────── */
const course = {
  id: 1,
  title: 'Figma UI UX Design..',
  subtitle: '3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.',
  category: 'Design',
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80',
  rating: 4.8,
  totalRatings: 45444,
  price: '$19.14',
  urgency: '2 days left at this price!',
  duration: '6 Month',
  level: 'Beginner and Intermediate',
  studentsEnrolled: 69419618,
  language: 'Mandarin',
  subtitleLanguage: 'English',
  instructors: [
    { name: 'Jane Cooper', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ],
  includes: [
    'Lifetime access',
    '30-days money-back guarantee',
    'Free exercises file & downloadable resources',
    'Shareable certificate of completion',
    'Access on mobile, tablet and TV',
    'English subtitles',
    '100% online course',
  ],
  description: `Master the art of modern product design and build a career in tech with our Figma UI/UX Design 3-in-1 Course. This program is designed to take you from beginner to professional by combining design, development, and freelancing into one practical learning experience.

You'll learn how to design stunning, user-friendly websites using Figma, bring those designs to life without coding using Webflow, and confidently position yourself to earn as a freelance designer.

Unlike traditional courses that overcomplicate the process, this course focuses on simplicity, real-world application, and speed. You'll work on real projects, build a strong portfolio, and gain the exact skills needed to start making money from your designs.

By the end of this course, you will:`,
  bullets: [
    'Design complete, high-quality websites in Figma',
    'Build responsive websites without writing code',
    'Create a professional portfolio that attracts clients',
    'Learn proven strategies to start freelancing and earning',
  ],
  finalLine: "Whether you're starting from scratch or looking to upgrade your skills, this course gives you everything you need to design, build, and earn all in one place.",
  whatYoullLearn: [
    'You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.',
    'You will learn how to take your designs and build them into powerful websites using Webflow, a state of the art site builder used by teams at Dell, NASA and more.',
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
  instructorDetails: [
    {
      name: 'Vako Shvili',
      role: 'Webflow Developer & Product Builder',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      avatarBg: 'bg-purple-200',
      rating: 4.9,
      students: 256,
      courses: 9,
      bio: 'An experienced Webflow developer focused on turning designs into responsive, high-performing websites. Skilled in no-code development and helping students bring their ideas to life quickly.',
    },
    {
      name: 'Nima Tahami',
      role: 'UI/UX Designer & Product Design Lead',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      avatarBg: 'bg-yellow-200',
      rating: 4.6,
      students: 128,
      courses: 1,
      bio: 'Nima is a passionate UI/UX designer with hands-on experience in building user-centered digital products. He specializes in creating intuitive interfaces, design systems, and guiding teams to deliver high-quality user experiences.',
    },
  ],
  reviews: [
    { id: 1, name: 'Guy Hawkins', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', rating: 5, time: '1 week ago', text: 'The course made UI/UX design simple and easy to understand. I was able to design my first complete project in no time!' },
    { id: 2, name: 'Dianne Russell', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', rating: 4, time: '51 mins ago', text: 'A perfect blend of design, development, and freelancing. Highly practical and beginner-friendly.' },
    { id: 3, name: 'Ralph Edwards', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', rating: 5, time: '2 days ago', text: 'The real-life approach and portfolio guidance really stood out. I feel ready to take on clients.' },
  ],
  relatedCourses: [
    { id: 2, tag: 'DESIGN', tagColor: 'bg-red-100 text-red-500', title: 'Machine Learning A-Z™: Hands-On Python & R In Data...', price: '$57', rating: 5.0, students: '265.7K', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80' },
    { id: 3, tag: 'DEVELOPMENTS', tagColor: 'bg-blue-100 text-blue-600', title: 'The Complete 2021 Web Development Bootcamp', price: '$57', rating: 5.0, students: '265.7K', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80' },
    { id: 4, tag: 'BUSINESS', tagColor: 'bg-green-100 text-green-600', title: 'Learn Python Programming Masterclass', price: '$57', rating: 5.0, students: '265.7K', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
    { id: 5, tag: 'IT & SOFTWARE', tagColor: 'bg-orange-100 text-orange-500', title: 'Reiki Level I, II and Master/ Teacher Program', price: '$57', rating: 5.0, students: '265.7K', image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&q=80' },
  ],
};

const tabs = ['Overview', 'Curriculum', 'Instructor', 'Review'];

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} className={s <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [expandedInstructor, setExpandedInstructor] = useState({});

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/student/dashboard" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <Link href="/courses" className="hover:text-primary">Design</Link>
            <ChevronRight size={12} />
            <span className="text-gray-600">Figma</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── LEFT MAIN CONTENT ── */}
            <div className="lg:col-span-2">
              {/* Title */}
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 text-sm mb-4">{course.subtitle}</p>

              {/* Instructors + Rating */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {course.instructors.map(ins => (
                      <img key={ins.name} src={ins.avatar} alt={ins.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">
                    Created by: <span className="font-medium text-gray-700">{course.instructors.map(i => i.name).join(' • ')}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Stars rating={course.rating} size={16} />
                  <span className="font-bold text-sm text-gray-800">{course.rating}</span>
                  <span className="text-gray-400 text-xs">({course.totalRatings.toLocaleString()} Rating)</span>
                </div>
              </div>

              {/* Video Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden mb-6 bg-gray-900 h-64 lg:h-80">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href={`/learn/${course.id}`}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                  >
                    <Play size={24} className="text-primary fill-primary ml-1" />
                  </Link>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── OVERVIEW TAB ── */}
              {activeTab === 'Overview' && (
                <div className="space-y-8">
                  {/* Course Description */}
                  <div>
                    <h2 className="text-lg font-extrabold text-gray-900 mb-3">Course Description</h2>
                    {course.description.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">{para}</p>
                    ))}
                    <ul className="space-y-1 mb-3">
                      {course.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-600 text-sm leading-relaxed">{course.finalLine}</p>
                  </div>

                  {/* What you'll learn */}
                  <div className="bg-blue-50/60 rounded-2xl p-6">
                    <h2 className="text-base font-extrabold text-gray-900 mb-4">What you will learn in this course</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {course.whatYoullLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle size={12} className="text-white" />
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Who this course is for */}
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 mb-3">Who this course is for:</h2>
                    <ul className="space-y-1.5">
                      {course.whoFor.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 mb-3">Course requirements</h2>
                    <ul className="space-y-1.5">
                      {course.requirements.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructors */}
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 mb-4">
                      Course instructor <span className="text-gray-400 font-normal">({String(course.instructorDetails.length).padStart(2,'0')})</span>
                    </h2>
                    <div className="space-y-4">
                      {course.instructorDetails.map(ins => (
                        <div key={ins.name} className="border border-gray-100 rounded-2xl p-5">
                          <div className="flex gap-4">
                            <img src={ins.avatar} alt={ins.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-extrabold text-gray-900">{ins.name}</p>
                              <p className="text-gray-400 text-xs mb-2">{ins.role}</p>
                              <div className="flex flex-wrap gap-4 text-xs mb-3">
                                <span className="flex items-center gap-1 text-gray-600">
                                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                  {ins.rating} Course rating
                                </span>
                                <span className="flex items-center gap-1 text-gray-600">
                                  <Users size={12} className="text-blue-400" />
                                  {ins.students} Students
                                </span>
                                <span className="flex items-center gap-1 text-gray-600">
                                  <BookOpen size={12} className="text-red-400" />
                                  {String(ins.courses).padStart(2,'0')} Courses
                                </span>
                              </div>
                              <p className="text-gray-500 text-xs leading-relaxed">
                                {expandedInstructor[ins.name] ? ins.bio : ins.bio.slice(0, 120) + '...'}
                                {' '}
                                <button
                                  onClick={() => setExpandedInstructor(p => ({ ...p, [ins.name]: !p[ins.name] }))}
                                  className="text-gray-900 font-bold text-xs hover:underline"
                                >
                                  {expandedInstructor[ins.name] ? 'SHOW LESS' : 'READ MORE'}
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Students Feedback */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-base font-extrabold text-gray-900">Students Feedback</h2>
                      <select className="border border-gray-200 text-sm rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:border-primary">
                        <option>5 Star Rating</option>
                        <option>4 Star Rating</option>
                        <option>3 Star Rating</option>
                      </select>
                    </div>
                    <div className="space-y-5">
                      {course.reviews.map(review => (
                        <div key={review.id} className="flex gap-3">
                          <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900">{review.name}</span>
                              <span className="text-gray-400 text-xs">• {review.time}</span>
                            </div>
                            <Stars rating={review.rating} size={13} />
                            <p className="text-gray-600 text-sm mt-1.5">{review.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-6 px-5 py-2 border border-blue-200 text-primary text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                      Load More
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Curriculum' && (
                <div className="text-gray-500 text-sm py-8 text-center">Curriculum content coming soon.</div>
              )}
              {activeTab === 'Instructor' && (
                <div className="text-gray-500 text-sm py-8 text-center">Instructor details tab.</div>
              )}
              {activeTab === 'Review' && (
                <div className="text-gray-500 text-sm py-8 text-center">All reviews tab.</div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-0">
              <div className="sticky top-24">
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
                  {/* Price + urgency */}
                  <div className="p-5 pb-0">
                    <p className="text-3xl font-extrabold text-gray-900 mb-1">{course.price}</p>
                    <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium mb-4">
                      <AlertCircle size={13} />
                      {course.urgency}
                    </div>

                    {/* Course details */}
                    <div className="space-y-2.5 mb-5 text-sm border-t border-gray-100 pt-4">
                      {[
                        { icon: Clock, label: 'Course Duration', value: course.duration },
                        { icon: Monitor, label: 'Course Level', value: course.level },
                        { icon: Users, label: 'Students Enrolled', value: course.studentsEnrolled.toLocaleString() },
                        { icon: Globe, label: 'Language', value: course.language },
                        { icon: FileText, label: 'Subtitle Language', value: course.subtitleLanguage },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Icon size={14} />
                            <span>{label}</span>
                          </div>
                          <span className="font-medium text-gray-700 text-xs">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <Link
                      href={`/student/checkout?course=${course.id}`}
                      className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm text-center block hover:bg-primary-dark transition-all mb-2.5"
                    >
                      Add To Cart
                    </Link>
                    <Link
                      href={`/checkout?course=${course.id}`}
                      className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl text-sm text-center block hover:bg-blue-50 transition-all mb-2.5"
                    >
                      Buy Now
                    </Link>
                    <div className="flex gap-3 mb-3">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
                        <Heart size={14} /> Add To Wishlist
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
                        <FileText size={14} /> Course
                      </button>
                    </div>
                    <p className="text-center text-gray-400 text-xs mb-4">
                      Note: <span className="italic">all course have 30-days money-back guarantee</span>
                    </p>
                  </div>

                  {/* This course includes */}
                  <div className="px-5 py-4 border-t border-gray-100">
                    <p className="font-bold text-sm text-gray-900 mb-3">This course includes:</p>
                    <ul className="space-y-2">
                      {course.includes.map(item => (
                        <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle size={13} className="text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share */}
                  <div className="px-5 py-4 border-t border-gray-100">
                    <p className="font-bold text-sm text-gray-900 mb-3">Share this course:</p>
                    <div className="flex items-center gap-3">
                      <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
                        <Copy size={15} />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-blue-600">
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sky-500">
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
                        <Mail size={15} />
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-green-500">
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RELATED COURSES ── */}
          <div className="mt-16 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-gray-900">Related Courses</h2>
              <Link href="/courses" className="flex items-center gap-2 text-primary text-sm font-semibold border border-primary rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {course.relatedCourses.map(rc => (
                <Link key={rc.id} href={`/courses/${rc.id}`} className="group">
                  <div className="rounded-xl overflow-hidden bg-gray-100 h-36 mb-3">
                    <img src={rc.image} alt={rc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${rc.tagColor}`}>{rc.tag}</span>
                    <span className="text-primary font-extrabold text-sm">{rc.price}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-primary transition-colors">{rc.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{rc.rating}</span>
                    <span>{rc.students} students</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
