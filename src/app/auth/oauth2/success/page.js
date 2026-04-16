'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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
        const userEmail = payload.email;
        
        // Store basic user info from token
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userRole', userRole);
        
        // Fetch complete user data from backend
        fetch(`${API_BASE_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          return res.json();
        })
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          
          // Redirect based on role
          const redirectPath = userRole === 'student' 
            ? '/student/dashboard' 
            : '/instructor/dashboard';
          router.replace(redirectPath);
        })
        .catch((error) => {
          console.error('Failed to fetch user data:', error);
          // Fallback: create basic user object from token
          const basicUser = {
            id: payload.userId,
            name: payload.name || 'User',
            email: userEmail,
            role: payload.role
          };
          localStorage.setItem('user', JSON.stringify(basicUser));
          
          // Redirect based on role from token
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Completing sign in...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait while we redirect you</p>
      </div>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    }>
      <OAuthSuccessHandler />
    </Suspense>
  );
}