'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VerifyCodeContent() {
  const [code, setCode] = useState(['', '', '', '']);
  const [seconds, setSeconds] = useState(40);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'johndoe@gmail.com';

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (index, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[index] = val;
    setCode(next);
    // Auto-focus next
    if (val && index < 3) inputRefs[index + 1].current?.focus();
    // Auto-submit when complete
    if (next.every((d) => d !== '') && next.join('').length === 4) {
      setTimeout(() => router.push('/set-password'), 300);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setSeconds(40);
    setCanResend(false);
    setCode(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Enter verification code
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          The verification code has been sent to your email{' '}
          <span className="font-medium text-gray-700">{email}</span>
        </p>

        {/* 4 OTP Boxes */}
        <div className="flex justify-center gap-4 mb-8">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-20 h-20 text-center text-2xl font-bold border-2 border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all caret-transparent"
            />
          ))}
        </div>

        {/* Resend */}
        <p className="text-gray-500 text-sm">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-primary font-semibold hover:underline"
            >
              Resend code
            </button>
          ) : (
            <>Resend after <span className="font-medium text-gray-700">{seconds} seconds</span></>
          )}
        </p>
      </div>
    </main>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Loading…</p></div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}