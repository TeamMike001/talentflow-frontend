import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function CourseDetailsPage() {
  return (
    <DashboardLayout
      title="Course Details"
      description="Detailed view for one course, including overview, curriculum, and CTA."
    >
      <div className="tf-grid">
        <Card title="Overview">
          <p className="page-copy">Description, instructor, level, and duration.</p>
        </Card>
        <Card title="Curriculum">
          <p className="page-copy">Modules and lesson outline go here.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default CourseDetailsPage;
