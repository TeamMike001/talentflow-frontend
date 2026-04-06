'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import Link from 'next/link';

export default function StudentBookmarks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <StudentSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-56 flex flex-col">
        
        {/* Navbar */}
        <StudentNavbar onMenuClick={() => setIsOpen(true)} />

                <main className="flex-1 flex items-center justify-center p-6">
          <div className="flex flex-col items-center text-center max-w-xs">

            {/* Illustration — dancing figures matching the screenshot */}
            <div className="mb-6 select-none" aria-hidden>
              <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Figure 1 — leftmost, dark skin */}
                <g transform="translate(10,20)">
                  <circle cx="22" cy="22" r="12" fill="#5C4033"/>
                  <rect x="10" y="34" width="24" height="30" rx="6" fill="#FF7043"/>
                  <rect x="8" y="64" width="10" height="28" rx="5" fill="#FF7043"/>
                  <rect x="22" y="64" width="10" height="28" rx="5" fill="#FF7043"/>
                  <rect x="2" y="38" width="10" height="22" rx="5" fill="#FF7043"/>
                  <rect x="32" y="34" width="10" height="22" rx="5" fill="#FF7043" transform="rotate(30 32 34)"/>
                </g>
                {/* Figure 2 — peach/light */}
                <g transform="translate(58,10)">
                  <circle cx="22" cy="22" r="12" fill="#FFCCBC"/>
                  <rect x="10" y="34" width="24" height="30" rx="6" fill="#FFA726"/>
                  <rect x="8" y="64" width="10" height="28" rx="5" fill="#FFA726"/>
                  <rect x="22" y="64" width="10" height="28" rx="5" fill="#FFA726"/>
                  <rect x="32" y="36" width="10" height="22" rx="5" fill="#FFA726" transform="rotate(-20 32 36)"/>
                  <rect x="-2" y="36" width="10" height="22" rx="5" fill="#FFA726" transform="rotate(20 -2 36)"/>
                </g>
                {/* Figure 3 — dark, center raised arm */}
                <g transform="translate(112,0)">
                  <circle cx="22" cy="22" r="12" fill="#3E2723"/>
                  <rect x="10" y="34" width="24" height="30" rx="6" fill="#5C6BC0"/>
                  <rect x="8" y="64" width="10" height="28" rx="5" fill="#5C6BC0"/>
                  <rect x="22" y="64" width="10" height="28" rx="5" fill="#5C6BC0"/>
                  {/* Raised arm */}
                  <rect x="32" y="20" width="10" height="28" rx="5" fill="#5C6BC0" transform="rotate(-60 32 20)"/>
                  <rect x="-2" y="38" width="10" height="22" rx="5" fill="#5C6BC0"/>
                </g>
                {/* Figure 4 — light skin, rightmost */}
                <g transform="translate(168,18)">
                  <circle cx="22" cy="22" r="12" fill="#FFCCBC"/>
                  <rect x="10" y="34" width="24" height="30" rx="6" fill="#FF8A65"/>
                  <rect x="8" y="64" width="10" height="28" rx="5" fill="#FF8A65"/>
                  <rect x="22" y="64" width="10" height="28" rx="5" fill="#FF8A65"/>
                  <rect x="32" y="36" width="10" height="22" rx="5" fill="#FF8A65" transform="rotate(-15 32 36)"/>
                  <rect x="-2" y="36" width="10" height="22" rx="5" fill="#FF8A65" transform="rotate(15 -2 36)"/>
                </g>
              </svg>
            </div>

            <h2 className="font-extrabold text-gray-900 text-xl mb-2">Save your Favorite Courses</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Browse courses and click the bookmark icon to save them here for later.
            </p>
            <Link
              href="/student/courses"
              className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all"
            >
              Browse Courses
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}