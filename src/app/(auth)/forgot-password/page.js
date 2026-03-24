'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // Navigate to verify code page after short delay
    setTimeout(() => {
      router.push('/verify-code?email=' + encodeURIComponent(value));
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Forgot password?
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Enter the email or number associated with your account, and we will email
          you a verification code to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email/Number"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-left"
          />
          <button
            type="submit"
            disabled={sent}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-sm disabled:opacity-70"
          >
            {sent ? 'Sending…' : 'Continue'}
          </button>
        </form>

        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-gray-500 text-sm mt-6 hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Sign in
        </Link>
      </div>
    </main>
  );
}