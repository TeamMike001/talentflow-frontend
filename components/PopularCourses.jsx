'use client';

import { useState } from 'react';
import { Clock, Star, ArrowUpRight } from 'lucide-react';
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
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 fill-gray-200'}
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
    <section className="py-10 bg-gray-50">
      <div className="px-5">
        <div className="mb-6">
          <p className="text-primary font-semibold text-sm mb-1">Explore Programs</p>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Our Most Popular Class</h2>
          <p className="text-gray-500 text-xs">
            Let's join our famous class, the knowledge provided will definitely be useful for you.
          </p>
        </div>

        <div className="space-y-4">
          {visible.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium">
                  <Clock size={10} />
                  {course.duration}
                </div>
              </div>
              <div className="p-4">
                <span className="text-primary text-xs font-semibold">{course.category}</span>
                <div className="flex items-start justify-between mt-1 mb-1">
                  <h3 className="font-bold text-gray-900 text-base flex-1">{course.title}</h3>
                  <ArrowUpRight size={16} className="text-gray-400 mt-0.5" />
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">{course.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-gray-800">{course.rating}</span>
                  <StarRating rating={course.rating} />
                  <span className="text-gray-400 text-xs">({course.reviews})</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={course.instructor.avatar} className="w-8 h-8 rounded-full object-cover" />
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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? 'bg-primary w-6' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href="/courses"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl text-sm"
          >
            Explore All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}