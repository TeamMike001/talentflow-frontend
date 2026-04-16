'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const InstructorIllustration = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="14" fill="#EFF6FF"/>
    <rect x="10" y="12" width="32" height="20" rx="3" fill="#2563EB" opacity="0.15"/>
    <rect x="10" y="12" width="32" height="20" rx="3" stroke="#2563EB" strokeWidth="1.5"/>
    <line x1="15" y1="19" x2="29" y2="19" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="15" y1="23" x2="25" y2="23" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <line x1="15" y1="27" x2="27" y2="27" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="33" y1="17" x2="37" y2="14" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="26" cy="42" r="4" fill="#2563EB" opacity="0.2"/>
    <circle cx="26" cy="38" r="3" fill="#2563EB"/>
    <path d="M19 48c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const StudentIllustration = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <rect width="52" height="52" rx="14" fill="#F0FDF4"/>
    <path d="M26 14L38 20L26 26L14 20L26 14Z" fill="#16A34A" opacity="0.8"/>
    <path d="M18 22V29C18 29 21 33 26 33C31 33 34 29 34 29V22" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="38" y1="20" x2="38" y2="27" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="38" cy="28" r="1.5" fill="#F59E0B"/>
    <rect x="16" y="36" width="12" height="9" rx="1.5" fill="#16A34A" opacity="0.2" stroke="#16A34A" strokeWidth="1.2"/>
    <line x1="22" y1="36" x2="22" y2="45" stroke="#16A34A" strokeWidth="1.2"/>
    <rect x="30" y="35" width="4" height="10" rx="1" transform="rotate(15 30 35)" fill="#F59E0B" opacity="0.8"/>
  </svg>
);

const roles = [
  { id: 'instructor', label: "I'm a Tutor", sublabel: 'Instructor', description: 'Create & manage courses', illustration: <InstructorIllustration />, accent: 'border-primary bg-blue-50', checkColor: 'bg-primary' },
  { id: 'student', label: "I'm a Student", sublabel: 'Learner', description: 'Access & learn courses', illustration: <StudentIllustration />, accent: 'border-green-500 bg-green-50', checkColor: 'bg-green-500' },
];

export default function SignInPage() {
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState('instructor');
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const selectedRole = roles.find(r => r.id === role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(form.email, form.password);

      localStorage.setItem('token', data.token);
      if (rememberMe) localStorage.setItem('rememberMe', 'true');
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

      const userRole = (data.user?.role || role).toLowerCase();
      const redirectPath = userRole === 'student' ? '/student/dashboard' : '/instructor/dashboard';

      router.push(redirectPath);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.googleLogin();   // This redirects directly to backend
  };

  const inputClass = 'w-full px-4 py-3 border border-blue-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white';

  return (
    <main className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-primary flex-col items-center justify-between py-16 px-12 text-white text-center">
        <div />
        <div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">Hey There!</h1>
          <p className="text-xl leading-relaxed text-white/90">Welcome Back.</p>
          <p className="text-xl leading-relaxed text-white/90">You are just one step away to your feed.</p>
        </div>
        <div className="text-center">
          <p className="text-white/80 text-base mb-4">Don&apos;t have an account?</p>
          <Link href="/signup" className="inline-block px-10 py-3 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all text-sm">
            Sign up
          </Link>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-7/12 flex items-center justify-center px-8 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="lg:hidden mb-8 text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
            </p>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Sign in</h1>
          <p className="text-gray-400 text-sm mb-6">Sign into your Dashboard</p>

          {/* Role Selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Who are you signing in as?</p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => {
                const isActive = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 text-center group ${
                      isActive ? r.accent + ' shadow-md scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isActive ? r.checkColor + ' opacity-100 scale-100' : 'bg-gray-200 opacity-0 scale-75'
                    }`}>
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </div>
                    <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
                      {r.illustration}
                    </div>
                    <div>
                      <p className={`font-extrabold text-sm transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {r.label}
                      </p>
                      <p className={`text-xs mt-0.5 font-medium transition-colors ${isActive ? (r.id === 'instructor' ? 'text-primary' : 'text-green-600') : 'text-gray-400'}`}>
                        {r.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</div>}

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputClass} pr-12`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-yellow-500 text-sm font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 text-white font-bold rounded-xl transition-all text-sm shadow-md hover:shadow-lg ${
                role === 'student' ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-blue-700'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : `Sign in as ${selectedRole?.sublabel}`}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm my-5">Or use social media to sign in</p>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-blue-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <GoogleIcon /> Sign in with Google
          </button>
        </div>
      </div>
    </main>
  );
}