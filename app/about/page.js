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
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left */}
              <div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-primary mb-4 leading-tight">
                  About TalentFlow
                </h1>
                <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-6 leading-snug">
                  <span className="text-[#F59E0B]">TalentFlow</span> Is A Modern Learning
                  Platform Designed To Empower Students.
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  We provide a structured and engaging environment where users can access courses,
                  complete assignments, track progress, and collaborate seamlessly — all in one place.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  Our mission is to simplify the learning experience by bringing everything together
                  into a single, intuitive platform that supports real growth and practical development.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  At TalentFlow, we are committed to helping learners stay consistent, build valuable
                  skills, and achieve their goals with confidence.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-sm shadow-md"
                >
                  Join Us <ArrowRight size={16} />
                </Link>
              </div>
              {/* Right image collage */}
              <div className="flex flex-col gap-4">
                <div className="w-full h-52 rounded-2xl overflow-hidden shadow-sm">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80" alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="w-4/5 h-44 rounded-2xl overflow-hidden shadow-sm self-end bg-blue-50">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" alt="Students" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EMPOWERING YOUR LEARNING JOURNEY ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left image */}
              <div className="h-72 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80" alt="Learning" className="w-full h-full object-cover" />
              </div>
              {/* Right */}
              <div>
                <p className="text-[#F59E0B] font-semibold text-sm mb-2">Features</p>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5 leading-tight">
                  Empowering Your Learning Journey
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  At TalentFlow, we are committed to providing a seamless and effective learning
                  experience across every stage of your journey.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  Our goal is to help learners stay focused, build clarity around their goals, and
                  grow with confidence through structured learning and consistent practice.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  While information is easily accessible online, true growth comes from guided
                  learning and real application — and that&apos;s what TalentFlow is built to deliver.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Learn smarter. Grow faster.</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-sm shadow-md"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE TALENTFLOW ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm mb-2">Our Benefits</p>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">
                Why Choose TalentFlow
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                By joining TalentFlow, you gain access to a powerful learning environment
                designed to help you succeed.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div key={b.number} className="bg-blue-50/70 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <p className="text-primary font-extrabold text-2xl mb-4 opacity-60">{b.number}</p>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
