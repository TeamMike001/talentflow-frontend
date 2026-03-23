import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function DiscussionPage() {
  return (
    <DashboardLayout
      title="Collaboration / Discussion"
      description="Feature area for learner discussions, comments, and thread participation."
    >
      <div className="tf-grid">
        <Card title="Thread List">
          <p className="page-copy">List active topics, classes, or lesson discussions.</p>
        </Card>
        <Card title="Comment Area">
          <p className="page-copy">Thread details and comment form go here.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default DiscussionPage;
