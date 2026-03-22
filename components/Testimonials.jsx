'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: 'Courses was fantastic! It is Master platform for those looking to start a new career, or need a refresher.',
    name: 'Jacob Jones',
    role: 'Student, TalentFlow',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    id: 2,
    text: 'TalentFlow completely changed how I learn. The courses are well-structured and the tutors are absolutely incredible.',
    name: 'Sarah Williams',
    role: 'UI Designer, TalentFlow',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    id: 3,
    text: 'Best investment I ever made. Within three months of completing the UX course I landed my dream job.',
    name: 'Marcus Johnson',
    role: 'UX Engineer, TalentFlow',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(1); // center is active

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm mb-2">What Our Students Say</p>
        </div>

        {/* Cards */}
        <div className="flex items-center gap-6 overflow-hidden">
          {testimonials.map((t, i) => {
            const isActive = i === active;
            return (
              <div
                key={t.id}
                onClick={() => setActive(i)}
                className={`transition-all duration-500 cursor-pointer rounded-2xl p-6 flex-1 ${
                  isActive
                    ? 'bg-white shadow-xl border border-gray-100 scale-100'
                    : 'bg-white/60 shadow-sm border border-gray-50 scale-95 opacity-70'
                }`}
              >
                {/* Quote mark */}
                {isActive && (
                  <div className="text-4xl text-primary font-serif leading-none mb-3 opacity-30">"</div>
                )}
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
