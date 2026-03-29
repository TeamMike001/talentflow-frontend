import {Star, User2, ArrowRight, ArrowLeft} from 'lucide-react';

const pageNum =[
  {num: '01', active: false },
  {num: '02', active: true },
  {num: '03', active: false },
  {num: '04', active: false },
  {num: '05', active: false },
]

export default function CourseGrid() {
  const courses = Array(12).fill(null);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Master New Skills That Matter At Your Own Pace</h2>
          <p className="text-gray-500 text-sm">From foundational basics to advanced mastery—expert-led paths designed to turn your ambition into a career.</p>
        </div>
      </div>

      {/* Course Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
        {courses.map((_, i) => (
          <div key={i} className="group bg-white border border-gray-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-video bg-gray-100 overflow-hidden mb-5 w-full h-fit">
              <img src="/images/course-1.png" alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="py-1 px-8">
              <span className="px-3 py-2 bg-[#FFEEE8] text-xs font-semibold text-[#993D20] uppercase">Design</span>
              <h3 className="font-semibold text-black leading-relaxed mb-4 mt-4">Machine Learning A-Z™: Hands-On Python & R In Data Science</h3>              
            </div>
            <div className="flex justify-between border-t border-gray-400 py-2 px-8 items-center">
              <div className="flex text-orange gap-2 items-center">
                <Star size={24} fill="currentColor" /> <span className="text-gray-600 text-lg font-semibold">4.6</span>
              </div>
              <div className="flex text-primary gap-2 items-center">
                <User2 size={24} /> <span className="text-gray-600 text-lg font-semibold">181,811</span><span className="text-gray-400 text-lg font-medium">students</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page Number */}
      <div className="flex items-center justify-center mt-10 gap-10 text-primary">
        <div className="rounded-full bg-[#E1EFFE] p-3 hover:bg-primary hover:text-white cursor-pointer">
          <ArrowLeft size={20} />
        </div>
        <div className="flex gap-4 text-black">
          {pageNum.map((items) => (
            <div className={`font-semibold ${items.active ? 'bg-primary text-white' : ''} p-2 px-3 rounded-full cursor-pointer hover:text-primary hover:bg-[#E1EFFE]`}>{items.num}</div>
          ))}          
        </div>
        <div className="rounded-full bg-[#E1EFFE] p-3 hover:bg-primary hover:text-white cursor-pointer">
          <ArrowRight size={20} />
        </div>        
      </div>
    </section>
  );
}