// app/home/page.js - This will be the main landing page after clicking Get Started
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import PopularCourses from '@/components/PopularCourses';
import Tutors from '@/components/Tutors';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

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