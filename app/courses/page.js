'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const allCourses = [
  { id: 1, image: '/images/Image.png', category: 'Design', title: 'Figma UI UX Design Masterclass', description: 'Use Figma to get a job in UI Design, User Interface, User Experience design.', rating: 4.3, reviews: 120, duration: '08 hr 12 mins', instructor: 'Jane Cooper', avatar: '/images/Avatar.png', price: '$19.14' },
  { id: 2, image: 'images/Image(1).png', category: 'Design', title: 'Learn Web Design With Shoaib', description: 'Design Web Sites and Mobile Apps that Your Users Love and Return to Again.', rating: 3.9, reviews: 32, duration: '06 hr 3 mins', instructor: 'Jenny Wilson', avatar: '/images/Avatar(1).png', price: '$10.99' },
  { id: 3, image: '/images/Image(2).png', category: 'Design', title: 'Building User Interface Fundamentals', description: 'Learn how to apply User Experience (UX) principles to your website designs.', rating: 4.2, reviews: 200, duration: '01 hr 2 mins', instructor: 'Esther Howard', avatar: '/images/Avatar(2).png', price: '$14.98' },
  { id: 4, image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=500&q=80', category: 'Development', title: 'React.js Complete Masterclass', description: 'Build modern, performant applications with React from basics to advanced patterns.', rating: 4.7, reviews: 340, duration: '10 hr 45 mins', instructor: 'Robert Fox', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', price: '$24.99' },
  { id: 5, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80', category: 'Data', title: 'Data Analysis with Python', description: 'Master data analysis using Python, Pandas, NumPy, and visualization tools.', rating: 4.5, reviews: 180, duration: '08 hr 30 mins', instructor: 'Wade Warren', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', price: '$21.50' },
  { id: 6, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&q=80', category: 'Development', title: 'Node.js & Express API Development', description: 'Build scalable backend services and REST APIs with Node.js and Express.', rating: 4.4, reviews: 95, duration: '07 hr 20 mins', instructor: 'Arlene McCoy', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', price: '$18.75' },
];

const categories = ['All', 'Design', 'Development', 'Data'];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredCourses = selectedCategory === 'All' 
    ? allCourses 
    : allCourses.filter(course => course.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pb-16">
        <div className="px-5 py-5">
          <p className="text-primary font-semibold text-sm mb-1">Explore Programs</p>
          <h1 className="text-2xl font-extrabold text-gray-900">All Courses</h1>
          <p className="text-gray-500 text-xs mt-1">
            Browse from our wide selection of courses across all categories.
          </p>
        </div>

        <div className="px-5">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-40 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1 text-xs font-medium">
                    <Clock size={10} />{course.duration}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-primary text-xs font-semibold">{course.category}</span>
                  <div className="flex items-start justify-between mt-1 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm flex-1">{course.title}</h3>
                    <Link href={`/courses/${course.id}`} className="ml-2 text-gray-400">
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-2 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-gray-800">{course.rating}</span>
                    <StarRating rating={course.rating} />
                    <span className="text-gray-400 text-xs">({course.reviews})</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={course.avatar} className="w-7 h-7 rounded-full object-cover" />
                      <p className="text-xs font-semibold text-gray-800">{course.instructor}</p>
                    </div>
                    <span className="text-primary font-extrabold text-base">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}