import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const benefits = [
  { number: '01', title: 'Structured Learning', desc: 'We provide a clear and organized learning path so you always know what to learn next.' },
  { number: '02', title: 'Cost Effective', desc: 'Access high-quality learning resources without unnecessary costs or barriers.' },
  { number: '03', title: 'Personalized Experience', desc: 'Learning is not one-size-fits-all. Tailor your journey based on your goals and pace.' },
  { number: '04', title: 'Affordable Pricing', desc: 'Flexible pricing plans designed to suit students and professionals.' },
  { number: '05', title: 'High Learner Satisfaction', desc: 'We focus on engagement and usability to ensure a smooth and rewarding experience.' },
  { number: '06', title: 'Rich Multimedia Materials', desc: 'Learn through videos, documents, and interactive materials for better understanding.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="px-5 pt-8 pb-10">

          <h1 className="text-3xl font-extrabold text-primary mb-6">
            About TalentFlow
          </h1>

          {/* Images */}
          <div className="relative w-full mb-8" style={{ height: '280px' }}>

            {/* Background shape */}
            <div
              className="absolute rounded-2xl bg-blue-100 z-0"
              style={{ top: '20px', right: '0px', width: '85%', height: '230px' }}
            />

            {/* Large image */}
            <div
              className="absolute rounded-2xl overflow-hidden shadow-md z-10"
              style={{ top: '0px', right: '8px', width: '72%', height: '190px' }}
            >
              <img
                src="/images/Rectangle14.png"
                alt="Learning environment"
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Small image */}
            <div
              className="absolute rounded-2xl overflow-hidden shadow-lg border-4 border-white z-20"
              style={{ bottom: '0px', left: '0px', width: '48%', height: '150px' }}
            >
              <img
                src="/images/Rectangle13.png"
                alt="Students working"
                className="w-full h-full object-cover block"
              />
            </div>

          </div>

          {/* Text */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-gray-900 leading-snug">
              <span className="text-[#F59E0B]">TalentFlow</span> Is A Modern <br />
              Learning Platform <br />Designed To Empower <br />Students.
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed">
              We provide a structured and engaging environment where users can access courses,
              complete assignments, track progress, and collaborate seamlessly — all in one place.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our mission is to simplify the learning experience by bringing everything together
              into a single, intuitive platform that supports real growth and practical development.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              At TalentFlow, we are committed to helping learners stay consistent,
              build valuable skills, and achieve their goals with confidence.
            </p>

            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white text-sm font-semibold rounded-lg"
              >
                Join Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="px-5 pb-10 bg-white">

          <div className="w-full rounded-2xl overflow-hidden shadow-md mb-6">
            <img
              src="/images/Section.png"
              alt="Features"
              className="w-full h-[220px] object-cover block"
            />
          </div>

          <div className="space-y-4">
            <p className="text-primary font-bold text-lg">Features</p>

            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
              Empowering Your Learning Journey
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed">
              At TalentFlow, we are committed to providing a seamless and effective learning experience across every stage of your journey.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our goal is to help learners stay focused, build clarity around their goals, and grow with confidence through structured learning and consistent practice.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              While information is easily accessible online, true growth comes from guided learning and real application — and that&apos;s what TalentFlow is built to deliver.
            </p>
            <p className="text-gray-500 text-sm">Learn smarter. Grow faster.</p>

            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="px-5 py-10 bg-[#f8fafc]">

          <div className="text-center mb-10">
            <p className="text-primary font-bold text-lg mb-2">Our Benefits</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
              Why Choose TalentFlow
            </h2>
            <p className="text-gray-500 text-sm">
              By joining TalentFlow, you gain access to a powerful learning environment designed to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {benefits.map((b, i) => (
              <div
                key={b.number}
                className={`rounded-2xl p-6 ${i % 2 === 0 ? 'bg-blue-100' : 'bg-white shadow-sm'}`}
              >
                <p className="text-[#1E3A8A] font-extrabold text-2xl mb-3 opacity-60">
                  {b.number}
                </p>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}