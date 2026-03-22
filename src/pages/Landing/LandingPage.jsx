import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import PagePlaceholder from "../../components/common/PagePlaceholder";

function LandingPage() {
  return (
    <>
      <Navbar />
      <PagePlaceholder
        title="TalentFlow Learning Platform"
        description="Public landing page for the LMS. Developer 1 can replace these placeholders with the real marketing layout from design."
        sections={[
          { title: "Hero Section", copy: "Primary value proposition, headline, CTA, and visual." },
          { title: "Feature Highlights", copy: "Summarize learning features, flexibility, and collaboration." },
          { title: "CTA Footer", copy: "Drive users into Sign Up or Sign In flows." },
        ]}
      />
      <Footer />
    </>
  );
}

export default LandingPage;
