"use client";

import { useState } from 'react';
import Sidebar from '@/course_dashboard_page/Sidebar';
import Head from '@/course_dashboard_page/Head';
import Stats from '@/course_dashboard_page/Stats';
import Progress from '@/course_dashboard_page/Progress';
import Footer from '@/instructor_course_page/Footer';

export default function CoursesDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] max-sm:bg-white">
      <div className="flex">
        {isSidebarOpen && (
            <div 
                className="max-lg:fixed max-lg:inset-0 max-lg:bg-black/40 max-lg:z-40 max-lg:transition-opacity" 
                onClick={toggleSidebar}
            />
        )}

        {/* Sidebar */}
        <aside className="z-50">
          <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 backdrop-blur-md px-8 py-4 max-lg:px-0">
            <Head onToggleSidebar={toggleSidebar} />
          </header>

          <div className="px-8 pb-12 space-y-10 overflow-y-auto mt-4 max-md:px-4">
            <Stats />
            <Progress />
          </div>
          <div className="px-8 mt-20 mb-6">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}