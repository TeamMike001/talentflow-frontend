import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteShell from "@/components/layout/SiteShell";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <SiteShell
        title="TalentFlow Learning Platform"
        description="Next.js App Router scaffold for a multi-role LMS frontend."
      >
        <div className="tf-grid">
          <Link className="tf-card" href="/login">Authentication</Link>
          <Link className="tf-card" href="/student/dashboard">Student Dashboard</Link>
          <Link className="tf-card" href="/instructor/dashboard">Instructor Dashboard</Link>
          <Link className="tf-card" href="/courses">Course Pages</Link>
          <Link className="tf-card" href="/admin">Admin Interface</Link>
        </div>
      </SiteShell>
    </>
  );
}
