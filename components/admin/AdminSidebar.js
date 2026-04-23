'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Users, BookOpen, Calendar, LogOut, LayoutDashboard, X, ChevronLeft } from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const handleNavigation = (href) => {
    router.push(href);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/events', label: 'Manage Events', icon: Calendar },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              TalentFlow
            </h1>
            <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-6 bg-blue-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut size={20} className="text-red-400 group-hover:text-red-600" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  // Mobile sidebar (overlay)
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} 
          onClick={onClose} 
        />
        
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <SidebarContent />
        </div>
      </>
    );
  }

  // Desktop sidebar (collapsible)
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg z-30 transition-all duration-300 ease-out ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="relative h-full">
        {/* Collapse Toggle Button */}
        <button
          onClick={onClose}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-40"
        >
          <ChevronLeft size={14} className={`text-gray-500 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`h-full overflow-y-auto ${!isOpen ? 'px-2' : ''}`}>
          {/* Logo Section - Collapsed */}
          <div className={`p-4 border-b border-gray-100 ${!isOpen ? 'text-center' : ''}`}>
            {isOpen ? (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  TalentFlow
                </h1>
                <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
              </div>
            ) : (
              <div className="w-10 h-10 mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">TF</span>
              </div>
            )}
          </div>

          {/* Navigation - Collapsed */}
          <nav className={`flex-1 py-4 space-y-2 ${!isOpen ? 'px-2' : 'px-4'}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${!isOpen ? 'justify-center' : ''}`}
                  title={!isOpen ? item.label : ''}
                >
                  <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                  {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout Button - Collapsed */}
          <div className={`p-4 border-t border-gray-100 ${!isOpen ? 'px-2' : ''}`}>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 ${
                !isOpen ? 'justify-center' : ''
              }`}
              title={!isOpen ? 'Logout' : ''}
            >
              <LogOut size={20} className="text-red-400" />
              {isOpen && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}