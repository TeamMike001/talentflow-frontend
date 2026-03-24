'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function SetPasswordPage() {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => router.push('/signin'), 1200);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Set password
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Password requires a minimum of 8 characters and contains a cap letter, numbers
          and symbols
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={done}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-sm disabled:opacity-70"
          >
            {done ? 'Password updated! Redirecting…' : 'Continue'}
          </button>
        </form>
      </div>
    </main>
  );
}