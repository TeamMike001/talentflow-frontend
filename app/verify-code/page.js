'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyCodeContent() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(40);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '(+234) 1234567xxx';

  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleResend = () => {
    if (!canResend) return;
    setSeconds(40);
    setCanResend(false);
    setCode('');
  };

  const handleContinue = () => {
    if (code.trim()) {
      router.push('/set-password');
    }
  };

  return (
    <main className="min-h-screen bg-white px-5 py-10">
      <div className="w-full max-w-md">

        {/* Label */}
        <p className="text-gray-700 text-sm font-medium mb-3">
          Enter verification code
        </p>

        {/* Input + Resend button inline */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-blue-400 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={handleResend}
            className="px-5 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-xl whitespace-nowrap"
          >
            Resend
          </button>
        </div>

        {/* Description text */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          We texted you a code to verify your phone number {phone}<br />
          This code will expired 10 minutes after this message. If you don't get a message.
        </p>

        {/* Continue button — full width */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-[#2563EB] text-white font-semibold rounded-xl text-base"
        >
          Continue
        </button>

      </div>
    </main>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}