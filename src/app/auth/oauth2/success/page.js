'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OAuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // Decode the token to get user info and role
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload.role?.toLowerCase();
        
        // Fetch complete user data
        fetch('http://localhost:8080/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          
          // Redirect based on role
          const redirectPath = userRole === 'student' 
            ? '/student/dashboard' 
            : '/instructor/dashboard';
          router.replace(redirectPath);
        })
        .catch(() => {
          // Fallback: redirect based on role from token
          const redirectPath = userRole === 'student' 
            ? '/student/dashboard' 
            : '/instructor/dashboard';
          router.replace(redirectPath);
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        router.replace('/signin');
      }
    } else {
      // No token, redirect to sign in
      router.replace('/signin');
    }
  }, [router, searchParams]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    }>
      <OAuthSuccessHandler />
    </Suspense>
  );
}