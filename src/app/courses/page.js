import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";

const sampleCourses = [
  { id: "react-fundamentals", title: "React Fundamentals" },
  { id: "nextjs-lms-architecture", title: "Next.js LMS Architecture" },
];

export default function CoursesPage() {
  return (
    <SiteShell title="Courses" description="Public or authenticated course discovery page.">
      <div className="tf-grid">
        {sampleCourses.map((course) => (
          <Link key={course.id} className="tf-card" href={`/courses/${course.id}`}>
            {course.title}
          </Link>
        ))}
      </div>
    </SiteShell>
  );
}
