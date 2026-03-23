'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/verify-code?phone=' + encodeURIComponent(phoneNumber));
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md">
        <Link href="/signin" className="inline-flex items-center gap-1 text-gray-500 text-sm mb-8">
          <ChevronLeft size={16} />
          Back
        </Link>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          Type your phone number
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">(+123)</span>
            <input
              type="tel"
              placeholder=""
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 pl-16 border border-blue-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary"
            />
          </div>
          
          <p className="text-gray-500 text-xs text-center">
            We texted you a code to verify your phone number
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg text-sm disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </main>
  );
}
