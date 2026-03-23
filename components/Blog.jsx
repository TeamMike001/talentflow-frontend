'use client';

import { useState } from 'react';

const blogs = [
  {
    id: 2,
    image: '/images/Image(Replace)(1).png',
    tag: 'Web',
    title: 'Responsive design: Cross-device experience',
    date: 'Jan 22, 2026',
  },
  {
    id: 3,
    image: '/images/Image(Replace)(2).png',
    tag: 'Web',
    title: 'Web design best practices: Optimizing speed',
    date: 'Jan 20, 2026',
  },
];

export default function Blog() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 bg-white">
      <div className="px-5">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-primary font-semibold text-sm">
            Our recent blogs
          </p>
        </div>

        {/* SINGLE ACTIVE BLOG CARD */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500">

          {/* Image */}
          <div className="relative h-60 overflow-hidden">
            <img
              src={blogs[active].image}
              alt={blogs[active].title}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-primary">
                {blogs[active].tag}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 text-sm mb-3">
              {blogs[active].title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-primary">
                {blogs[active].tag}
              </span>
              <span className="text-gray-400 text-xs">
                {blogs[active].date}
              </span>
            </div>
          </div>

        </div>

        {/* DOT SWITCHER (same style as your testimonial) */}
        <div className="flex justify-center gap-2 mt-4">
          {blogs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === active
                  ? 'bg-primary w-6'
                  : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}