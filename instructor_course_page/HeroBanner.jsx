import { Star } from 'lucide-react';

export default function HeroBanner() {
  const stars = Array(5).fill(null);

  return (
    <div className="relative p-12 flex flex-col -mb-16 max-md:p-8 max-sm:p-4 max-sm:mb-0">
      <div className="text-gray-500 text-sm">
        Course / My Courses / Developement / Web Developement / <span className="text-black">2021 Complete Python Bootcamp From Zero to Hero in Python</span>
      </div>
      <section className="flex border border-gray-300 p-8 mt-8 gap-8 max-lg:p-4 max-lg:gap-4 max-md:items-center max-md:flex-col max-md:border-none max-sm:items-start max-sm:p-0">
        <img 
          src="/images/CourseThumbnail.png"
          alt="Thumnail"
          className= "w-[23rem] h-fit max-md:w-[30rem] max-sm:w[35rem]"
        />
        <div>
          <div className="flex text-xs text-gray-400 gap-4">
            <p>Uploaded: <span className="text-gray-600">Jan 21, 2025</span></p>
            <p>Last Updated: <span className="text-gray-600">Mar 11, 2026</span></p>
          </div>
          <h2 className="font-bold text-xl mt-4 max-sm:text-lg">2026 Complete Python Bootcamp From <br />Zero to Hero in Python</h2>
          <p className="mt-3 text-gray-500 text-base max-sm:text-sm">3 in 1 Course: Learn to design websites with Figma, <br />build with Webflow, and make a living <br />freelancing.</p>
          <div className="flex gap-12 mt-5 items-center pb-5 border-b border-b-gray-300 max-lg:gap-4 max-sm:flex-col max-sm:items-start">
            <div className="flex gap-2 items-center">
              <div className="flex">
                <img 
                  src="/images/Avatar(1).png"
                  alt="Avatar"
                  className="w-12 h-fit border-2 border-white rounded-full object-cover shadow-sm"
                />
                <img 
                  src="/images/Avatar.png"
                  alt="Avatar"
                  className="w-12 h-fit -ml-5 border-2 border-white rounded-full object-cover shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 text-xs max-lg:text-[9px] max-sm:text-sm">Created By:</p>
                <p className="text-black text-sm font-semibold max-lg:text-xs max-sm:text-base">Kevin Gilbert • Kristin Watson</p>
              </div>
            </div>
            <div className="flex gap-2 text-black text-base max-lg:text-sm max-sm:text-base">
              <div className="text-orange flex gap-0.5">
                {stars.map((_, i) => (
                  <Star key={i} fill="currentColor" size={20} className="max-lg:size-4 max-sm:size-6" />
                ))}
              </div>
              4.8 <span className="text-gray-600">(451 Rating)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}