'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

/* ── Dancing figures illustration matching the screenshot ── */
function DancingIllustration() {
  return (
    <svg width="380" height="260" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* ── Figure 1: Dark-skin curvy woman, pink top, blue pants, leg kick ── */}
      <g transform="translate(30, 30)">
        <ellipse cx="44" cy="20" rx="20" ry="24" fill="#1a0a00"/>
        <path d="M24 30 Q14 50 18 70" stroke="#1a0a00" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M64 28 Q76 48 68 68" stroke="#1a0a00" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <ellipse cx="44" cy="32" rx="16" ry="17" fill="#8B4513"/>
        <ellipse cx="39" cy="30" rx="2" ry="2.5" fill="#5C2A00"/>
        <ellipse cx="49" cy="30" rx="2" ry="2.5" fill="#5C2A00"/>
        <path d="M38 38 Q44 43 50 38" stroke="#5C2A00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <rect x="38" y="48" width="12" height="10" rx="4" fill="#8B4513"/>
        <ellipse cx="44" cy="80" rx="22" ry="28" fill="#F4845F"/>
        <rect x="22" y="58" width="44" height="35" rx="10" fill="#F4845F"/>
        <path d="M22 65 Q8 50 12 30" stroke="#F4845F" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <path d="M66 68 Q82 80 78 100" stroke="#F4845F" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <rect x="26" y="90" width="36" height="55" rx="8" fill="#2D3A8C"/>
        <path d="M30 140 Q15 155 10 175" stroke="#2D3A8C" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M54 140 Q60 160 58 185" stroke="#2D3A8C" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="8" cy="178" rx="12" ry="7" fill="#222"/>
        <ellipse cx="57" cy="188" rx="12" ry="7" fill="#222"/>
      </g>
      {/* ── Figure 2: Light-skin slim, pink top, raised arm ── */}
      <g transform="translate(118, 10)">
        <ellipse cx="38" cy="18" rx="18" ry="21" fill="#1C0A00"/>
        <path d="M20 26 Q10 45 14 68" stroke="#1C0A00" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <ellipse cx="38" cy="30" rx="15" ry="16" fill="#FFCCAA"/>
        <ellipse cx="33" cy="28" rx="2" ry="2.5" fill="#333"/>
        <ellipse cx="43" cy="28" rx="2" ry="2.5" fill="#333"/>
        <path d="M33 36 Q38 40 43 36" stroke="#CC7755" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <rect x="32" y="45" width="12" height="10" rx="4" fill="#FFCCAA"/>
        <rect x="20" y="55" width="36" height="38" rx="9" fill="#F48FB1"/>
        <path d="M56 60 Q72 40 68 15" stroke="#F48FB1" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <path d="M20 62 Q6 72 4 90" stroke="#F48FB1" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <circle cx="67" cy="12" r="8" fill="#FFCCAA"/>
        <rect x="22" y="90" width="32" height="55" rx="7" fill="#3949AB"/>
        <path d="M26 140 Q22 165 24 188" stroke="#3949AB" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <path d="M46 140 Q54 162 52 186" stroke="#3949AB" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="23" cy="191" rx="11" ry="6" fill="#1A1A2E"/>
        <ellipse cx="51" cy="189" rx="11" ry="6" fill="#1A1A2E"/>
      </g>
      {/* ── Figure 3: Dark skin, raised arm, coral top ── */}
      <g transform="translate(208, 20)">
        <ellipse cx="40" cy="20" rx="22" ry="20" fill="#111"/>
        <ellipse cx="40" cy="30" rx="16" ry="17" fill="#4A2000"/>
        <ellipse cx="35" cy="28" rx="2" ry="2.5" fill="#1A0A00"/>
        <ellipse cx="45" cy="28" rx="2" ry="2.5" fill="#1A0A00"/>
        <path d="M35 37 Q40 41 45 37" stroke="#7A3000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <rect x="34" y="46" width="12" height="10" rx="4" fill="#4A2000"/>
        <rect x="22" y="56" width="36" height="38" rx="9" fill="#E8856A"/>
        <path d="M22 60 Q6 38 10 12" stroke="#E8856A" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <circle cx="10" cy="9" r="8" fill="#4A2000"/>
        <path d="M58 65 Q72 70 76 88" stroke="#E8856A" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <rect x="24" y="91" width="32" height="54" rx="7" fill="#263238"/>
        <path d="M28 140 Q20 162 22 186" stroke="#263238" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <path d="M48 140 Q60 158 64 180" stroke="#263238" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="21" cy="189" rx="11" ry="6" fill="#111"/>
        <ellipse cx="64" cy="183" rx="11" ry="6" fill="#111"/>
      </g>
      {/* ── Figure 4: Light skin, orange top, pink pants ── */}
      <g transform="translate(296, 40)">
        <ellipse cx="38" cy="16" rx="17" ry="15" fill="#C8860A"/>
        <ellipse cx="38" cy="28" rx="15" ry="16" fill="#FFD5B0"/>
        <ellipse cx="33" cy="26" rx="2" ry="2.5" fill="#555"/>
        <ellipse cx="43" cy="26" rx="2" ry="2.5" fill="#555"/>
        <path d="M33 34 Q38 38 43 34" stroke="#AA6633" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <rect x="32" y="43" width="12" height="10" rx="4" fill="#FFD5B0"/>
        <rect x="20" y="52" width="36" height="38" rx="9" fill="#FF9800"/>
        <path d="M56 58 Q68 52 72 40" stroke="#FF9800" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <path d="M20 60 Q6 54 2 46" stroke="#FF9800" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <rect x="22" y="87" width="32" height="55" rx="7" fill="#F06292"/>
        <path d="M26 138 Q18 162 20 186" stroke="#F06292" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <path d="M46 138 Q56 155 64 162" stroke="#F06292" strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="19" cy="189" rx="11" ry="6" fill="#222"/>
        <ellipse cx="66" cy="165" rx="10" ry="6" fill="#222" transform="rotate(-20 66 165)"/>
      </g>
      {/* ground shadow */}
      <ellipse cx="195" cy="250" rx="155" ry="8" fill="#E0E0E0" opacity="0.6"/>
    </svg>
  );
}

export default function StudentBookmarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center text-center max-w-md">

            {/* Illustration */}
            <div className="mb-2 select-none">
              <DancingIllustration />
            </div>

            {/* Heading */}
            <h2 className="font-extrabold text-gray-900 text-2xl sm:text-3xl mb-3">
              No Saved Courses Yet
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 max-w-sm">
              Explore the catalog and bookmark favorites-they'll show up here for quick access whenever you're ready to learn.
            </p>

            {/* Hint line with bookmark icon inline */}
            <p className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-7 flex-wrap">
              To save courses click on this
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-gray-300 bg-white shadow-sm">
                <Bookmark size={14} className="text-gray-600" />
              </span>
              button.
            </p>

            {/* CTA */}
            {/* <Link
              href="/student/StudentCourses"
              className="px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
            >
              Browse Courses
            </Link> */}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map((l) => (
              <button key={l} className="hover:text-gray-600 transition-colors">{l}</button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}