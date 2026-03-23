import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function AssignmentSubmissionPage() {
  return (
    <DashboardLayout
      title="Assignment Submission"
      description="Submission screen for instructions, upload, and status tracking."
    >
      <div className="tf-grid">
        <Card title="Assignment Instructions">
          <p className="page-copy">Display assignment details and grading notes.</p>
        </Card>
        <Card title="Submission Form">
          <p className="page-copy">File upload, text input, and submit button belong here.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default AssignmentSubmissionPage;
