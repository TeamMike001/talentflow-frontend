import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const allCourses = [
  { id: 1, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80', category: 'Design', title: 'Figma UI UX Design Masterclass', description: 'Use Figma to get a job in UI Design, User Interface, User Experience design.', rating: 4.3, reviews: 120, duration: '08 hr 12 mins', instructor: 'Jane Cooper', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', price: '$19.14' },
  { id: 2, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80', category: 'Design', title: 'Learn Web Design With Shoaib', description: 'Design Web Sites and Mobile Apps that Your Users Love and Return to Again.', rating: 3.9, reviews: 32, duration: '06 hr 3 mins', instructor: 'Jenny Wilson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', price: '$10.99' },
  { id: 3, image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=500&q=80', category: 'Design', title: 'Building User Interface Fundamentals', description: 'Learn how to apply User Experience (UX) principles to your website designs.', rating: 4.2, reviews: 200, duration: '01 hr 2 mins', instructor: 'Esther Howard', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', price: '$14.98' },
  { id: 4, image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=500&q=80', category: 'Development', title: 'React.js Complete Masterclass', description: 'Build modern, performant applications with React from basics to advanced patterns.', rating: 4.7, reviews: 340, duration: '10 hr 45 mins', instructor: 'Robert Fox', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', price: '$24.99' },
  { id: 5, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80', category: 'Data', title: 'Data Analysis with Python', description: 'Master data analysis using Python, Pandas, NumPy, and visualization tools.', rating: 4.5, reviews: 180, duration: '08 hr 30 mins', instructor: 'Wade Warren', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', price: '$21.50' },
  { id: 6, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&q=80', category: 'Development', title: 'Node.js & Express API Development', description: 'Build scalable backend services and REST APIs with Node.js and Express.', rating: 4.4, reviews: 95, duration: '07 hr 20 mins', instructor: 'Arlene McCoy', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', price: '$18.75' },
  { id: 7, image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=500&q=80', category: 'Design', title: 'Advanced CSS & Animation', description: 'Master CSS Grid, Flexbox, custom properties, and stunning animations.', rating: 4.6, reviews: 210, duration: '05 hr 45 mins', instructor: 'Cameron Williamson', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', price: '$16.50' },
  { id: 8, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', category: 'Data', title: 'SQL for Data Analysis', description: 'Learn SQL from the ground up and use it to analyze and visualize data.', rating: 4.1, reviews: 145, duration: '06 hr 15 mins', instructor: 'Courtney Henry', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', price: '$13.99' },
  { id: 9, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80', category: 'Development', title: 'HTML & CSS Bootcamp', description: 'Start your web development journey with a complete beginner bootcamp.', rating: 4.8, reviews: 500, duration: '12 hr 0 mins', instructor: 'Kathryn Murphy', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', price: '$9.99' },
];

const categories = ['All', 'Design', 'Development', 'Data'];

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary font-semibold text-sm mb-2">Explore Programs</p>
            <h1 className="text-3xl font-extrabold text-gray-900">All Courses</h1>
            <p className="text-gray-500 text-sm mt-2">
              Browse from our wide selection of courses across all categories.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter tabs */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  cat === 'All'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-medium text-gray-700">
                    <Clock size={12} />{course.duration}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-primary text-xs font-semibold">{course.category}</span>
                  <div className="flex items-start justify-between mt-1 mb-2">
                    <h3 className="font-bold text-gray-900 text-base leading-tight flex-1">{course.title}</h3>
                    <Link href={`/courses/${course.id}`} className="ml-2 text-gray-400 hover:text-primary flex-shrink-0"><ArrowUpRight size={18} /></Link>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{course.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-bold text-gray-800">{course.rating}</span>
                    <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}</div>
                    <span className="text-gray-400 text-xs">({course.reviews})</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={course.avatar} alt={course.instructor} className="w-7 h-7 rounded-full object-cover" />
                      <p className="text-xs font-semibold text-gray-800">{course.instructor}</p>
                    </div>
                    <span className="text-primary font-extrabold text-lg">{course.price}</span>
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