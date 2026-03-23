import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="tf-navbar">
      <Link href="/">TalentFlow</Link>
      <nav className="tf-navbar__links">
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
        <Link href="/courses">Courses</Link>
      </nav>
    </header>
  );
}
