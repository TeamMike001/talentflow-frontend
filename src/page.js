import Navbar from '@/landing_page/Navbar';
import Hero from '@/landing_page/Hero';
import Stats from '@/landing_page/Stats';
import Features from '@/landing_page/Features';
import PopularCourses from '@/landing_page/PopularCourses';
import Tutors from '@/landing_page/Tutors';
import Testimonials from '@/landing_page/Testimonials';
import Blog from '@/landing_page/Blog';
import CTA from '@/landing_page/CTA';
import Footer from '@/landing_page/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <PopularCourses />
      <Tutors />
      <Testimonials />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}