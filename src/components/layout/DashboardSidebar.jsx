import Link from "next/link";

const items = [
  ["Student Dashboard", "/student/dashboard"],
  ["Instructor Dashboard", "/instructor/dashboard"],
  ["Courses", "/courses"],
  ["Admin", "/admin"],
];

export default function DashboardSidebar() {
  return (
    <aside className="tf-sidebar">
      <h2 className="tf-sidebar__title">TalentFlow</h2>
      <nav className="tf-sidebar__links">
        {items.map(([label, href]) => (
          <Link key={href} className="tf-sidebar__link" href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
