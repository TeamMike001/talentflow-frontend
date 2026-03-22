import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function ProgressTrackingPage() {
  return (
    <DashboardLayout
      title="Progress Tracking"
      description="Progress summaries, completed courses, and learner achievements."
    >
      <div className="tf-grid">
        <Card title="Summary">
          <p className="page-copy">Show completed lessons, active courses, and completion percentages.</p>
        </Card>
        <Card title="Achievements">
          <p className="page-copy">Badges and milestones can be added here later.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default ProgressTrackingPage;
