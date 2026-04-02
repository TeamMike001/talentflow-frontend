import { Search, BellDot, ChevronDown, AlignJustify } from 'lucide-react';

export default function Head({ onToggleSidebar }) {
  return (
    <div>
      {/* Mobile view */}
      <div className="max-lg:flex items-center justify-between w-full border-b border-gray-300 pb-2 px-4 hidden">
        <img src="/images/logo(1).jpg"
          className="w-16 h-fit"
          alt="Logo" 
        />
        <div className="flex items-center gap-4">
          <img 
            src="/images/Avatar(2).png" 
            className="w-10 h-10 rounded-full" 
            alt="Avatar" 
          />
          <button onClick={onToggleSidebar} className="text-black cursor-pointer p-1">
            <AlignJustify size={24} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-lg:hidden">                
        {/* Left: Greeting */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            Welcome back, <span className="text-primary">Titus!</span> 👋
          </h2>
          <p className="text-[11px] text-black">Boost your tech skills now and stand out.</p>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl px-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2.5 text-black hover:text-primary transition">
            <BellDot size={22} />
          </button>
          
          <div className="flex items-center gap-3 pl-4">
            <img 
              src="/images/Avatar(2).png" 
              className="w-10 h-10 rounded-full" 
              alt="Avatar" 
            />
            <div>
              <p className="text-base font-bold text-gray-900">Titus Williams</p>
                <p className="flex text-xs text-gray-500 gap-2">UI/UX Designer <ChevronDown size={18} className="text-black" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}