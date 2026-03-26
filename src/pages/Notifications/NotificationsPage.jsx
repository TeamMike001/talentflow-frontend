import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function NotificationsPage() {
  return (
    <DashboardLayout
      title="Notifications"
      description="Central inbox for course updates, reminders, and learner alerts."
    >
      <div className="tf-grid">
        <Card title="Notification List">
          <p className="page-copy">Render read and unread notification items in this section.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default NotificationsPage;
