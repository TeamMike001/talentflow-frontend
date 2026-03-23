import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function LessonPage({ params }) {
  return (
    <div className="tf-dashboard-layout">
      <DashboardSidebar />
      <main className="tf-dashboard-layout__content">
        <h1 className="page-title">Learning Page</h1>
        <p className="page-copy">
          Video learning experience for course {params.courseId}, lesson {params.lessonId}.
        </p>
      </main>
    </div>
  );
}
