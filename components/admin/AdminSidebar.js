// src/components/admin/AdminSidebar.js
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Users, BookOpen, Calendar, LogOut, LayoutDashboard } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/events', label: 'Manage Events', icon: Calendar },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        <p className="text-xs text-gray-500 mt-1">Manage your platform</p>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}
        <div className="border-t my-4"></div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </div>
  );
}