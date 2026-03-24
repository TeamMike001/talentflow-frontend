'use client';

import Link from 'next/link';

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-10">

      {/* Logo + Text — vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">

        {/* Very large logo */}
        <img
          src="/images/logo.png"
          alt="TalentFlow Logo"
          className="w-48 h-48 object-contain"
        />


        {/* Tagline */}
        <p className="text-gray-900 text-base font-bold">
          Learn smarter with TalentFlow
        </p>
      </div>

      {/* Get Started — pinned at very bottom, bright blue */}
      <div className="pb-8">
        <Link
          href="/home"
          className="block w-full py-4 bg-[#2563EB] text-white font-semibold rounded-2xl text-base text-center"
        >
          Get started
        </Link>
      </div>

    </main>
  );
}