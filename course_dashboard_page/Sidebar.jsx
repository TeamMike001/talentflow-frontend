import Link from 'next/link';
import { 
  Home, UserIcon, BookOpen, Bookmark, 
  Award, FileText, Calendar, UsersIcon, 
  Headset, Settings, LogOut, ChevronDown
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', active: false, menuLink: '/home' },
  { icon: UserIcon, label: 'Profile', active: false, menuLink: '#' },
  { icon: BookOpen, label: 'Courses', active: true, menuLink: '#' },
  { icon: Bookmark, label: 'Bookmarks', active: false, menuLink: '#' },
  { icon: Award, label: 'Certifications', active: false, menuLink: '#' },
  { icon: FileText, label: 'Assignment', active: false, menuLink: '#' },
  { icon: Calendar, label: 'Events', active: false, menuLink: '#' },
  { icon: UsersIcon, label: 'Community', active: false, menuLink: '#' },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl mt-6">
      {/* Logo */}
      <div className="flex items-center justify-center px-2 mb-10">
        <img src="/images/logo.png" className="w-28 h-28"/>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 space-y-1">
        <p className="px-4 text-sm font-medium text-gray-400 tracking-widest mb-4">Main Page</p>
        {menuItems.map((item) => (
          <Link href={item.menuLink}>
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-primary text-white' 
                  : 'text-black hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          </Link>
        ))}

        {/* Tasks Section */}
        <div className="pt-8 opacity-100">
          <p className="px-4 text-sm font-medium text-gray-400 tracking-widest mb-1 mt-6">Tools</p>
          <Link href="#">
            <button className="w-full flex items-center gap-3 p-4 rounded-xl text-sm font-medium text-black hover:bg-gray-50 hover:text-primary">
              <Headset size={18} /> Support
            </button>
          </Link>
          <Link href="#">
            <button className="w-full flex items-center gap-3 p-4 rounded-xl text-sm font-medium text-black hover:bg-gray-50 hover:text-primary">
              <Settings size={18} /> Settings
            </button>
          </Link>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="mt-6 pt-6">
        <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer gap-5">
          <div className="flex items-center gap-3">
            <img 
              src="/images/Avatar(2).png" 
              className="w-10 h-10 rounded-full" 
              alt="Avatar" 
            />
            <div className="text-left">
              <p className="text-base font-bold text-gray-900">Titus Williams</p>
              <p className="flex text-xs text-gray-500 gap-2">UI/UX Designer <ChevronDown size={18} className="text-black" /></p>
            </div>
          </div>
          <div className="text-red-600 transition-colors">
            <Link href="#">
              <LogOut size={16} />
            </Link>
          </div>          
        </div>
      </div>
    </div>
  );
}