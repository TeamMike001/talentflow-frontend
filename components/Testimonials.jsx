'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    text: 'Courses was fantastic! It is Master platform for those looking to start a new career, or need a refresher.',
    name: 'Jacob Jones',
    role: 'Student, TalentFlow',
    avatar: '/images/Image(4).png',
  },
  {
    id: 2,
    text: 'TalentFlow completely changed how I learn. The courses are well-structured and the tutors are absolutely incredible.',
    name: 'Sarah Williams',
    role: 'UI Designer, TalentFlow',
    avatar: '/images/Image(3).png',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 bg-gray-50">
      <div className="px-5">
        <div className="text-center mb-6">
          <p className="text-primary font-semibold text-sm">What Our Students Say</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex h-48">
          {/* Left - Full Height Square Image */}
          <div className="w-2/5 h-full flex-shrink-0">
            <img
              src={testimonials[active].avatar}
              alt={testimonials[active].name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right - Text Content */}
          <div className="flex-1 p-5 flex flex-col justify-center">
            <div className="text-2xl text-primary opacity-30 mb-1">"</div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3">
              {testimonials[active].text}
            </p>
            <div>
              <p className="font-bold text-gray-900 text-sm">{testimonials[active].name}</p>
              <p className="text-gray-400 text-xs">{testimonials[active].role}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? 'bg-primary w-6' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
