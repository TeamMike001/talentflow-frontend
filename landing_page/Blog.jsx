'use client';

import { useState } from 'react';

const blogs = [
  {
    id: 1,
    image: '/images/Image(Replace).png',
    tag: 'Design',
    tagColor: 'bg-blue-50 text-primary',
    title: 'Typography in web design: Enhancing UI/UX web apps',
    date: 'Jan 24, 2026',
  },
  {
    id: 2,
    image: 'images/Image(Replace)(1).png',
    tag: 'Web',
    tagColor: 'bg-blue-50 text-primary',
    title: 'Responsive design: Cross-device experience',
    date: 'Jan 22, 2026',
  },
  {
    id: 3,
    image: 'images/Image(Replace)(2).png',
    tag: 'Web',
    tagColor: 'bg-blue-50 text-primary',
    title: 'Web design best practices: Optimizing speed',
    date: 'Jan 20, 2026',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80',
    tag: 'Design',
    tagColor: 'bg-blue-50 text-primary',
    title: 'Design systems: Building consistent interfaces',
    date: 'Jan 18, 2026',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=500&q=80',
    tag: 'Dev',
    tagColor: 'bg-green-50 text-green-600',
    title: 'CSS Grid vs Flexbox: When to use which',
    date: 'Jan 16, 2026',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    tag: 'Web',
    tagColor: 'bg-blue-50 text-primary',
    title: 'Accessibility in modern web applications',
    date: 'Jan 14, 2026',
  },
];

export default function Blog() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(blogs.length / 3);
  const visible = blogs.slice(page * 3, page * 3 + 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm mb-1 text-[22px]">Our recent blogs</p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Tag badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${blog.tagColor}`}>
                    {blog.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-4 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${blog.tagColor}`}>
                    {blog.tag}
                  </span>
                  <span className="text-gray-400 text-xs">{blog.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? 'bg-primary w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}