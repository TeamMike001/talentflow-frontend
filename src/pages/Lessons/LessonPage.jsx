import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import Card from "../../components/common/Card/Card";

function LessonPage() {
  return (
    <DashboardLayout
      title="Lesson / Content Page"
      description="Learning content area for video, text, downloadable files, and lesson navigation."
    >
      <div className="tf-grid">
        <Card title="Lesson Content">
          <p className="page-copy">Main learning material renders in this area.</p>
        </Card>
        <Card title="Lesson Navigation">
          <p className="page-copy">Previous, next, and mark-as-complete actions belong here.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default LessonPage;
