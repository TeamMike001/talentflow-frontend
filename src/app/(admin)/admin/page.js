import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function AdminPage() {
  return (
    <div className="tf-dashboard-layout">
      <DashboardSidebar />
      <main className="tf-dashboard-layout__content">
        <h1 className="page-title">Admin Interface</h1>
        <p className="page-copy">Platform settings, user management, reporting, and role administration belong here.</p>
      </main>
    </div>
  );
}
