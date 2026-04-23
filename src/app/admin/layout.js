// src/app/admin/layout.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Public routes that don't require authentication
  const publicRoutes = ['/admin/login', '/admin/register'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Allow access to public routes without auth
    if (publicRoutes.includes(pathname)) {
      setIsAuthorized(true);
      return;
    }

    // For dashboard and other admin routes, require auth and admin role
    if (!token || user.role !== 'ADMIN') {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized && !publicRoutes.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}