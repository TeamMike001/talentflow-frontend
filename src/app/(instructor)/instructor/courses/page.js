"use client";

import { useState } from 'react';
import Sidebar from '@/instructor_course_page/Sidebar';
import Head from '@/instructor_course_page/Head';
import HeroBanner from '@/instructor_course_page/HeroBanner';
import Stats from '@/instructor_course_page/Stats';
import Footer from '@/instructor_course_page/Footer';

export default function InstructorCourses() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return(
        <div className="flex min-h-screen bg-white">
            {isSidebarOpen && (
                <div 
                    className="max-lg:fixed max-lg:inset-0 max-lg:bg-black/40 max-lg:z-40 max-lg:transition-opacity" 
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className="z-50 max-lg:static">
                <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
            </aside>
    
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-10 px-8 py-4 max-sm:px-4">
                    <Head onToggleSidebar={toggleSidebar} />
                </header>
        
                <div className="px-8 pb-5 space-y-10 overflow-y-auto max-sm:p-0">
                    <HeroBanner />
                    <Stats />
                    <Footer />
                </div>
            </main>
        </div>
    )
}