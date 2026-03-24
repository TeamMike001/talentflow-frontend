import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function CourseCatalogPage() {
  return (
    <DashboardLayout
      title="Course Catalog"
      description="This page should host search, filters, and reusable course cards."
    >
      <div className="tf-grid">
        <Card title="Search and Filters">
          <p className="page-copy">Use feature components for search bars and filter controls.</p>
        </Card>
        <Card title="Course Grid">
          <p className="page-copy">Render dynamic course cards from the API here.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default CourseCatalogPage;
