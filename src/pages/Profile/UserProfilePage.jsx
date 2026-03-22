import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function UserProfilePage() {
  return (
    <DashboardLayout
      title="User Profile"
      description="Profile details, account settings, and learner preferences live here."
    >
      <div className="tf-grid">
        <Card title="Profile Details">
          <p className="page-copy">Name, email, avatar, and personal information.</p>
        </Card>
        <Card title="Account Settings">
          <p className="page-copy">Password updates and future account controls.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default UserProfilePage;
