import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function StudentDashboardPage() {
  return (
    <div className="tf-dashboard-layout">
      <DashboardSidebar />
      <main className="tf-dashboard-layout__content">
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-copy">Courses in progress, lesson history, assignments, and progress tracking belong here.</p>
      </main>
    </div>
  );
}
