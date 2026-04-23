'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://talentflow-backend-9hue.onrender.com';
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://talentflow-frontend-theta.vercel.app';

function OAuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    console.log('=== OAUTH DEBUG ===');
    console.log('Token received:', token ? 'Yes' : 'No');
    console.log('Current origin:', window.location.origin);
    console.log('FRONTEND_URL:', FRONTEND_URL);
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      console.log('Token stored in localStorage');
      
      // Decode the token to get user info and role
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token payload:', payload);
        
        const userRole = payload.role?.toLowerCase();
        const userEmail = payload.email;
        
        console.log('User role:', userRole);
        console.log('User email:', userEmail);
        
        // Store basic user info from token
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userRole', userRole);
        
        // Fetch complete user data from backend
        console.log('Fetching user data from:', `${API_BASE_URL}/api/users/me`);
        
        fetch(`${API_BASE_URL}/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log('Fetch user response status:', res.status);
          if (!res.ok) {
            throw new Error(`Failed to fetch user data: ${res.status}`);
          }
          return res.json();
        })
        .then(user => {
          console.log('User data fetched:', user);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Redirect based on role - use absolute URL
          const redirectPath = userRole === 'student' 
            ? '/student/dashboard' 
            : '/instructor/dashboard';
          
          const fullRedirectUrl = `${FRONTEND_URL}${redirectPath}`;
          console.log('Redirecting to:', fullRedirectUrl);
          
          // Use window.location for more reliable redirect
          window.location.href = fullRedirectUrl;
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
          console.log('Created basic user from token:', basicUser);
          
          // Redirect based on role from token
          const redirectPath = userRole === 'student' 
            ? '/student/dashboard' 
            : '/instructor/dashboard';
          
          const fullRedirectUrl = `${FRONTEND_URL}${redirectPath}`;
          console.log('Fallback redirect to:', fullRedirectUrl);
          window.location.href = fullRedirectUrl;
        });
      } catch (error) {
        console.error('Failed to decode token:', error);
        window.location.href = `${FRONTEND_URL}/signin?error=invalid_token`;
      }
    } else {
      console.log('No token found in URL');
      window.location.href = `${FRONTEND_URL}/signin?error=no_token`;
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