// app/home/page.js - This will be the main landing page after clicking Get Started
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

export default function HomePage() {
  return (
    <main className="pb-0">
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