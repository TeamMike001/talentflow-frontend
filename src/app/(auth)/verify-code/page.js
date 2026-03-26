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
    if (seconds <= 0) {
      setCanResend(true);
      return;
    }
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Verify Code
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          Enter the code sent to <span className="font-medium text-gray-700">{phone}</span>
        </p>

        {/* Input + Resend */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`px-5 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              canResend
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canResend ? 'Resend' : `${seconds}s`}
          </button>
        </div>

        {/* Info text */}
        <p className="text-gray-500 text-xs leading-relaxed mb-6">
          This code expires in 10 minutes. If you didn’t receive it, you can resend after the timer ends.
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm md:text-base hover:bg-blue-700 transition"
        >
          Continue
        </button>

      </div>
    </main>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <VerifyCodeContent />
    </Suspense>
  );
}