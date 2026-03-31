'use client';

import { useState } from 'react';
import Link from 'next/link';

const courses = [
  {
    id: 1,
    image: '/images/Group01.png',
    // label: 'Product Designing',
    // icon: (
    //   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    //     <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
    //     <path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
    //   </svg>
    // ),
  },
  {
    id: 2,
    image: '/images/Group02.png',
    // label: 'Front-End Development',
    // icon: (
    //   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    //     <circle cx="12" cy="12" r="10"/>
    //     <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    //   </svg>
    // ),
  },
  {
    id: 3,
    image: '/images/Group03.png',
    // label: 'Software Testing',
    // icon: (
    //   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    //     <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    //   </svg>
    // ),
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
    label: 'Data Science',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1587620962725-abab19836100?w=600&q=80',
    label: 'Backend Development',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
    label: 'Cloud Computing',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
  },
];

const PER_PAGE = 3;

export default function PopularCourses() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(courses.length / PER_PAGE);
  const visible = courses.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm mb-2">Explore Programs</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Current Course Offerings
          </h2>
          <p className="text-gray-500 text-sm">
            Let&apos;s join our famous class, the knowledge provided will definitely be useful for you.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="relative h-64 rounded-2xl overflow-hidden group block"
            >
              <img
                src={course.image}
                alt={course.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-100 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 flex flex-col">
                {/* Icon circle */}
                {/* <div className="w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center mb-3">
                  {course.icon}
                </div> */}
                <span className="text-white font-bold text-xs tracking-widest uppercase">
                  {course.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? 'bg-blue-600 w-7' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}