import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";

export default function LoginPage() {
  return (
    <SiteShell title="Login" description="Authentication entry point for learners, instructors, and admins.">
      <div className="tf-grid">
        <Link className="tf-card" href="/student/dashboard">Student login flow</Link>
        <Link className="tf-card" href="/instructor/dashboard">Instructor login flow</Link>
        <Link className="tf-card" href="/admin">Admin login flow</Link>
      </div>
    </SiteShell>
  );
}
