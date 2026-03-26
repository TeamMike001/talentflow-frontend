import Sidebar from '@/course_dashboard_page/Sidebar';
import Head from '@/course_dashboard_page/Head';
import HeroBanner from '@/course_dashboard_page/HeroBanner';
import CourseGrid from '@/course_dashboard_page/CourseGrid';
import ContinueLearning from '@/course_dashboard_page/ContinueLearning';

export default function CoursesDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-[#F8FAFC]/80 backdrop-blur-md px-8 py-4">
          <Head />
        </header>

        <div className="px-8 pb-12 space-y-10 overflow-y-auto">
          <HeroBanner c/>
          <CourseGrid />
          <ContinueLearning />
        </div>
      </main>
    </div>
  );
}