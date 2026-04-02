'use client';

import Link from 'next/link';

export default function InstructorFooter() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 bg-white text-xs text-gray-400 mt-auto">
      <span className="text-center sm:text-left">
        © 2026 Team Mike – UI/UX. All rights reserved.
      </span>
      <div className="flex items-center gap-4 sm:gap-5">
        <Link href="/faqs"    className="hover:text-primary transition-colors">FAQs</Link>
        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        <Link href="/terms"   className="hover:text-primary transition-colors">Terms & Condition</Link>
      </div>
    </footer>
  );
}