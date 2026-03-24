'use client';

import { useState } from 'react';
import { Clock, Star, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    id: 1,
    image: '/images/Image.png',
    category: 'Design',
    title: 'Figma UI UX Design..',
    description: 'Use Figma to get a job in UI Design, User Interface, User Experience design.',
    rating: 4.3,
    reviews: 120,
    duration: '08 hr 12 mins',
    instructor: { name: 'Jane Cooper', avatar: '/images/Avatar.png', enrolled: 2001 },
    price: '$19.14',
  },
  {
    id: 2,
    image: 'images/Image(1).png',
    category: 'Design',
    title: 'Learn With Shoaib',
    description: 'Design Web Sites and Mobile Apps that Your Users Love and Return to Again.',
    rating: 3.9,
    reviews: 32,
    duration: '06 hr 3 mins',
    instructor: { name: 'Jenny Wilson', avatar: '/images/Avatar(1).png', enrolled: 2001 },
    price: '$10.99',
  },
  {
    id: 3,
    image: '/images/Image(2).png',
    category: 'Design',
    title: 'Building User Interface..',
    description: 'Learn how to apply User Experience (UX) principles to your website designs.',
    rating: 4.2,
    reviews: 200,
    duration: '01 hr 2 mins',
    instructor: { name: 'Esther Howard', avatar: '/images/Avatar(2).png', enrolled: 2001 },
    price: '$14.98',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=500&q=80',
    category: 'Development',
    title: 'React.js Masterclass',
    description: 'Build modern, performant applications with React. From basics to advanced patterns.',
    rating: 4.7,
    reviews: 340,
    duration: '10 hr 45 mins',
    instructor: { name: 'Robert Fox', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', enrolled: 3500 },
    price: '$24.99',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80',
    category: 'Data',
    title: 'Data Analysis with Python',
    description: 'Master data analysis using Python, Pandas, NumPy, and visualization tools.',
    rating: 4.5,
    reviews: 180,
    duration: '08 hr 30 mins',
    instructor: { name: 'Wade Warren', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', enrolled: 1800 },
    price: '$21.50',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&q=80',
    category: 'Development',
    title: 'Node.js & Express API',
    description: 'Build scalable backend services and REST APIs with Node.js and Express.',
    rating: 4.4,
    reviews: 95,
    duration: '07 hr 20 mins',
    instructor: { name: 'Arlene McCoy', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', enrolled: 950 },
    price: '$18.75',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function PopularCourses() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(courses.length / 3);
  const visible = courses.slice(page * 3, page * 3 + 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-primary font-semibold text-sm mb-1 text-[22px]">Explore Programs</p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">Our Most Popular Class</h2>
          <p className="text-gray-500 text-sm">
            Let&apos;s join our famous class, the knowledge provided will definitely be useful for you.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-50 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Duration badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-medium text-gray-700">
                  <Clock size={12} />
                  {course.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-primary text-xs font-semibold">{course.category}</span>
                <div className="flex items-start justify-between mt-1 mb-2">
                  <h3 className="font-bold text-gray-900 text-base leading-tight flex-1">
                    {course.title}
                  </h3>
                  <Link href={`/courses/${course.id}`} className="ml-2 text-gray-400 hover:text-primary flex-shrink-0">
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{course.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-bold text-gray-800">{course.rating}</span>
                  <StarRating rating={course.rating} />
                  <span className="text-gray-400 text-xs">({course.reviews})</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{course.instructor.name}</p>
                      <p className="text-xs text-gray-400">{course.instructor.enrolled.toLocaleString()} Enrolled</p>
                    </div>
                  </div>
                  <span className="text-primary font-extrabold text-lg">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
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

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/courses"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all text-sm"
          >
            Explore All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}