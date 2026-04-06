'use client';

import { useState } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Download } from 'lucide-react';

const certifications = [
  {
    id: 1,
    logo: 'VRT',
    logoBg: 'bg-red-500',
    title: 'Wireframing & Prototyping in Figma',
    issuer: 'VRT Studios',
    date: 'March 2026',
    desc: 'Learnt how to structure layouts, apply UI grids, and build clickable Figma prototypes for early user feedback',
  },
  {
    id: 2,
    logo: 'Q',
    logoBg: 'bg-purple-500',
    title: 'Usability Testing: From Plan to Insights',
    issuer: 'SearchTech Inc.',
    date: 'February 2026',
    desc: 'Learnt how to design effective tests, recruit participants, run sessions, and analyze findings to uncover actionable UX insights.',
  },
  {
    id: 3,
    logo: 'D3',
    logoBg: 'bg-blue-500',
    title: 'Usability Testing: From Plan to Insights',
    issuer: 'Drabent',
    date: 'February 2026',
    desc: 'Learnt to prioritize user needs, apply empathy in research, and shape problem-solving around real human behaviors.',
  },
];

export default function StudentCertifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <h1 className="font-extrabold text-primary text-xl sm:text-2xl mb-6">Certifications</h1>

          {/* Certs list */}
          <div className="max-w-3xl space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex items-start gap-4 sm:gap-5 hover:border-primary/30 hover:shadow-md transition-all"
              >
                {/* Logo badge */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 ${cert.logoBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-extrabold text-xs sm:text-sm">{cert.logo}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-extrabold text-gray-900 text-sm sm:text-base mb-0.5 leading-snug">{cert.title}</h2>
                  <p className="text-gray-400 text-xs mb-2 sm:mb-3">Issued by: {cert.issuer}</p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    <span className="font-semibold">{cert.date}</span>
                    <span className="text-gray-300 mx-2">•</span>
                    {cert.desc}
                  </p>
                  <button className="mt-3 flex items-center gap-1.5 text-gray-700 text-xs font-semibold underline underline-offset-2 hover:text-primary transition-colors">
                    <Download size={13} />
                    Download Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8 sm:mt-10 max-w-3xl">
            <button className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark transition-all">
              Get More Certificates
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}