import Link from 'next/link';
import { 
  BarChart, PlusCircle, BookOpen, MessageCircleMore, 
  Headset, Settings, LogOut, X,
} from 'lucide-react';

const menuItems = [
  { icon: BarChart, label: 'Dashboard', active: false, menuLink: '#' },
  { icon: PlusCircle, label: 'Create New Course', active: false, menuLink: '#' },
  { icon: BookOpen, label: 'My Courses', active: true, menuLink: '#' },
  { icon: MessageCircleMore, label: 'Message', active: false, menuLink: '#', badge: 3 },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <div className={`
      flex flex-col bg-white w-full h-full transition-transform duration-300 ease-in-out
      max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:mt-0 max-lg:z-50 max-lg:w-64
      ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}>
      {/* Logo */}
      <div className="flex items-center justify-center px-2 max-lg:justify-between">
        <img src="/images/logo(1).jpg" className="w-36 h-auto object-contain max-lg:w-20"/>
        <button onClick={closeSidebar} className="hidden p-1 max-lg:block">
          <X size={24} />
        </button>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link href={item.menuLink}>
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 py-3 px-7 mb-4 rounded-lg text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-primary text-white' 
                  : 'text-black hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <item.icon size={18} />
              {item.label}

              {/* Message Badge Notification */}
              {item.badge && (
                <span className={`flex items-center justify-center ml-20 w-5 h-5 text-[10px] rounded-full ${
                  item.active ? 'bg-white text-primary' : 'bg-primary text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          </Link>
        ))}

        {/* Tools Section */}
        <div className="pt-8 opacity-100">
          <p className="pl-7 text-sm font-medium text-gray-400 tracking-widest mb-1 mt-1">Tools</p>
          <Link href="#">
            <button className="w-full flex items-center gap-3 py-3 px-7 mb-4 rounded-xl text-sm font-medium text-black hover:bg-gray-50 hover:text-primary">
              <Headset size={18} /> Support
            </button>
          </Link>
          <Link href="#">
            <button className="w-full flex items-center gap-3 py-3 px-7 mb-4 rounded-xl text-sm font-medium text-black hover:bg-gray-50 hover:text-primary">
              <Settings size={18} /> Settings
            </button>
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="mt-auto pl-7">
        <Link href="#">
        <button className="w-full flex items-center gap-3 p-3.5 text-sm font-semibold text-black hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut size={20} />
          Sign-out
          </button>
        </Link>
      </div>
    </div>
  );
}