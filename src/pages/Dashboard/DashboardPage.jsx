import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function DashboardPage() {
  return (
    <DashboardLayout
      title="Learner Dashboard"
      description="Summary page for active learning, assignments, and notifications."
    >
      <div className="tf-grid">
        <Card title="Continue Learning">
          <p className="page-copy">Show the learner's current course progress here.</p>
        </Card>
        <Card title="Upcoming Assignments">
          <p className="page-copy">List deadlines and urgent submissions.</p>
        </Card>
        <Card title="Recent Notifications">
          <p className="page-copy">Show latest platform updates and reminders.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
