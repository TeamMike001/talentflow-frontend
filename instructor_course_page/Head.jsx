import { Search, BellDot, AlignJustify, } from 'lucide-react';

export default function Head({ onToggleSidebar }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: Greeting */}
      <div>
        <p className="text-[11px] text-gray-500 font-medium max-sm:text-[9px]">Good Morning</p>
        <h2 className="text-base font-bold text-gray-900 max-sm:text-sm">My Courses</h2>
      </div>

      {/* Right */}
      <div className="flex">
        {/* Search Bar */}
        <div className="flex px-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-gray-100 py-2.5 pl-12 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm max-sm:w-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 text-black bg-gray-100 hover:text-primary transition">
            <BellDot size={22} />
          </button>
          
          <div className="flex items-center gap-4">
            <img 
                src="/images/Avatar(2).png" 
                className="w-10 h-10 rounded-full cursor-pointer" 
                alt="Avatar" 
            />
            <button onClick={onToggleSidebar} className="hidden text-black cursor-pointer p-1 max-lg:block">
              <AlignJustify size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}