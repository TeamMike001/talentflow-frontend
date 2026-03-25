'use client';

import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';

import React from 'react';
import { Search } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'Wireframing & Prototyping in Figma',
    issuer: 'VRT Studios',
    date: 'March 2026',
    description:
      'Learnt how to structure layouts, apply UI grids, and build clickable Figma prototypes for early user feedback',
    logo:
      'https://cdn.brandfetch.io/framer.com/fallback/lettermark/v2?t=1710352525141',
    logoBg: 'bg-red-700',
  },
  {
    id: 2,
    title: 'Usability Testing: From Plan to Insights',
    issuer: 'SearchTech Inc.',
    date: 'February 2026',
    description:
      'Learnt how to design effective tests, recruit participants, run sessions, and analyze findings to uncover actionable UX insights.',
    logo: 'https://cdn.brandfetch.io/search.io/icon',
    logoBg: 'bg-indigo-600',
  },
  {
    id: 3,
    title: 'Usability Testing: From Plan to Insights',
    issuer: 'Drabent',
    date: 'February 2026',
    description:
      'Learnt to prioritize user needs, apply empathy in research, and shape problem-solving around real human behaviors.',
    logo: 'https://cdn.brandfetch.io/dribbble.com/icon',
    logoBg: 'bg-blue-500',
  },
];

export default function CertificationsPage() {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-56 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <StudentNavbar />

        {/* Page Content */}
        <div className="p-6 space-y-8">
          
          

          {/* Title */}
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Certifications
          </h2>

          {/* Cards */}
          <div className="space-y-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-5">
                  
                  <div
                    className={`w-14 h-14 ${cert.logoBg} rounded-2xl flex items-center justify-center overflow-hidden`}
                  >
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-8 h-8 object-contain brightness-0 invert"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {cert.title}
                    </h3>

                    <p className="text-sm font-semibold text-gray-800">
                      Issued by:{' '}
                      <span className="text-gray-600 font-medium">
                        {cert.issuer}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                      <span className="font-bold text-gray-900">
                        {cert.date}
                      </span>
                      <span className="mx-2">•</span>
                      {cert.description}
                    </p>

                    <button className="text-sm font-bold underline mt-4">
                      Download Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Button */}
          <div className="flex justify-center pt-4 pb-10">
            <button className="px-12 py-4 bg-[#2563EB] text-white text-sm font-bold rounded-2xl hover:bg-blue-700">
              Get More Certificates
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}