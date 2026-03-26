import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CourseGrid() {
  const courses = Array(8).fill(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Master New Skills That Matter At Your Own Pace</h2>
          <p className="text-gray-500 text-sm">From foundational basics to advanced mastery—expert-led paths designed to turn your ambition into a career.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm"><ChevronLeft size={20} /></button>
          <button className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {courses.map((_, i) => (
          <div key={i} className="group bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-video bg-gray-100 rounded-2xl mb-5 overflow-hidden">
              <img src="/images/course-1.png" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="font-bold text-black mb-2 leading-tight">Foundations of User Centered Design</h3>
            <p className="text-xs text-black line-clamp-3 mb-4">Learn how to put users first-research basics, personas, and journey mapping to build products people actually want.</p>
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-2 bg-gray-50 text-xs font-medium text-black border border-gray-100">Beginner</span>
              <span className="px-3 py-2 bg-gray-50 text-xs font-medium text-black border border-gray-100">Live Class</span>
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl transition">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}