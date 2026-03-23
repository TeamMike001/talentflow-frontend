'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      router.push('/verify-code?phone=' + encodeURIComponent(phoneNumber));
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md">
        <Link href="/signin" className="inline-flex items-center gap-1 text-gray-500 text-sm mb-6">
          <ChevronLeft size={16} />
          Back
        </Link>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Forgot password?
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Enter the email or number associated with your account, and we will email
          you a verification code to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email/Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={sent}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg text-sm disabled:opacity-70"
          >
            {sent ? 'Sending…' : 'Continue'}
          </button>
        </form>
      </div>
    </main>
  );
}