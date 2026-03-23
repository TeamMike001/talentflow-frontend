import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

function DashboardLayout({ title, description, children }) {
  return (
    <div className="tf-dashboard-layout">
      <Sidebar />
      <main className="tf-dashboard-layout__content">
        <Header title={title} description={description} />
        <div className="tf-dashboard-layout__body">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
