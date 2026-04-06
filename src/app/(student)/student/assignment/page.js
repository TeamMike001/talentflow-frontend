'use client';

import { useState, useRef } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function AssignmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dropRef = useRef();
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = () => {
    if (!file && !submitted) { alert('Please upload a file first.'); return; }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-56 flex flex-col min-w-0">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          {/* Title + Due */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Wireframe Task</h1>
            <p className="text-sm font-semibold flex-shrink-0">
              <span className="text-gray-500">Due: </span>
              <span className="text-[#F59E0B]">March 25</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
            {/* ── LEFT: Assignment + Submission ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Assignment Details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Assignment Details</h2>
                <div className="text-sm text-gray-700 space-y-2 mb-5">
                  <p className="font-semibold">• Create a wireframe for a dashboard page including:</p>
                  <ul className="pl-6 space-y-1 text-gray-600">
                    <li>• Header with navigation</li>
                    <li>• Sidebar with menu</li>
                    <li>• Main content with widgets (e.g charts, progress)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Attachments</h3>
                  <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                    <FileText size={15} className="text-gray-500" />
                    design-brief.pdf
                  </div>
                </div>
              </div>

              {/* Your Submission */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <h2 className="font-extrabold text-gray-900 text-base mb-4">Your submission</h2>

                {/* Drop zone */}
                <div
                  ref={dropRef}
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 sm:p-10 text-center cursor-pointer hover:border-primary hover:bg-blue-50/20 transition-all mb-5"
                >
                  <input ref={inputRef} type="file" accept=".pdf,.png,.zip" className="hidden" onChange={e => setFile(e.target.files[0])} />
                  {file ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText size={18} className="text-primary" />
                      <span className="text-sm font-medium text-primary">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={28} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Drag & drop your file here or click to upload</p>
                      <div className="mt-3">
                        <span className="inline-block border border-gray-200 text-gray-500 text-xs px-4 py-1.5 rounded-lg">PDF, PNG, ZIP</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button className="px-4 sm:px-6 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    Save Draft
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-5 sm:px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-all shadow-md"
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Status cards ── */}
            <div className="space-y-4">
              {/* Submitted badge */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 rounded-xl px-4 py-2.5 mb-4">
                  <CheckCircle size={16} />
                  <span className="font-bold text-sm">Submitted</span>
                </div>
                <div className="space-y-1 text-sm text-gray-500 mb-4">
                  <p>Submitted on: <span className="text-gray-800 font-medium">March 20</span></p>
                  <p>Grade: <span className="text-gray-800 font-medium">88/100</span></p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">Instructor Feedback:</p>
                  <p className="text-gray-500 text-sm leading-relaxed">Good work, improve spacing and alignment.</p>
                </div>
              </div>

              {/* Submission Status */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <h3 className="font-extrabold text-gray-900 text-base mb-4">Submission Status</h3>
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <CheckCircle size={16} />
                  <span className="font-semibold text-sm">Submitted on: March 20</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Grade: <span className="text-gray-800 font-medium">88/100</span></p>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">Instructor Feedback:</p>
                  <p className="text-gray-500 text-sm leading-relaxed">Good work, improve spacing and alignment.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Team Mike – UI/UX. All rights reserved.</span>
          <div className="flex gap-5">
            {['FAQs', 'Privacy Policy', 'Terms & Condition'].map(l => <button key={l} className="hover:text-primary">{l}</button>)}
          </div>
        </footer>
      </div>
    </div>
  );
}