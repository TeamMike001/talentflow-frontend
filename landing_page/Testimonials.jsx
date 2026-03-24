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
    avatar: '/images/Image(4).png',
  },
  {
    id: 3,
    text: 'Best investment I ever made. Within three months of completing the UX course I landed my dream job.',
    name: 'Marcus Johnson',
    role: 'UX Engineer, TalentFlow',
    avatar: '/images/Image(3).png',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(1);

  const prev = () =>
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  const next = () =>
    setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm mb-2 text-[22px]">
            What Our Students Say
          </p>
        </div>

        {/* Slider */}
        <div className="relative flex justify-center items-center">

          <div className="flex gap-6 transition-all duration-500">

            {testimonials.map((t, i) => {
              const isActive = i === active;

              return (
                <div
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={`rounded-2xl cursor-pointer transition-all duration-500 flex-shrink-0 ${
                    isActive
                      ? 'w-[700px] bg-white shadow-xl scale-100 opacity-100'
                      : 'w-[500px] bg-white/60 scale-90 opacity-60'
                  } p-6 flex gap-6 items-center`}
                >

                  {/* IMAGE */}
                  <div className="w-[45%]">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-[220px] object-cover rounded-xl"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="w-[55%]">
                    {isActive && (
                      <div className="text-4xl text-primary opacity-30 mb-2">"</div>
                    )}

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {t.text}
                    </p>

                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-gray-400 text-sm">{t.role}</p>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}