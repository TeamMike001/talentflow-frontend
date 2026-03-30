import DashboardSidebar from '../../../../components/layout/DashboardSidebar';

export default function InstructorDashboardPage() {
  return (
    <div className='tf-dashboard-layout'>
      <DashboardSidebar />
      <main className='tf-dashboard-layout__content'>
        <h1 className='page-title'>Instructor Dashboard</h1>
        <p className='page-copy'>
          Course management, learner oversight, and content publishing live
          here.
        </p>
      </main>
    </div>
  );
}
