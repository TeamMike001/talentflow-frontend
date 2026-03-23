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

      <main className="min-h-screen bg-[#f8fafc]">

        {/* ── HERO ── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                  About TalentFlow
                </h1>

                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug mb-6">
                  <span className="text-[#F59E0B]">TalentFlow</span> Is A Modern<br />
                  Learning Platform Designed <br />To Empower Students.
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
                  At TalentFlow, we are committed to helping learners stay consistent,
                  build valuable skills, and achieve their goals with confidence.
                </p>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-primary-dark transition"
                >
                  Join Us <ArrowRight size={16} />
                </Link>
              </div>

              {/* RIGHT (OVERLAPPING IMAGES) */}
              <div className="relative w-full h-[320px] ">

                {/* background shape */}
                <div className="absolute right-0 top-6 w-[85%] h-[270px] bg-blue-100 rounded-2xl"></div>

                {/* top image */}
                <div className="absolute right-6 top-0 w-[60%] h-[200px] rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/Rectangle14.png" className="w-full h-full object-cover" />
              </div>

              {/* bottom image */}
              <div className="absolute left-0 bottom-[-90px] w-[70%] h-[200px] rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/Rectangle13.png" className="w-full h-full object-cover" />
              </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT IMAGE */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/Section.png" className="w-full h-[320px] object-cover" />
              </div>

              {/* RIGHT TEXT */}
              <div>
                <p className="text-primary font-semibold text-sm mb-2 text-[22px]">Features</p>

                <h2 className="text-3xl font-extrabold text-gray-900 mb-5 leading-tight text-[40px]">
                  Empowering Your <br />Learning Journey
                </h2>

                <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                  At TalentFlow, we are committed to providing a seamless and effective learning experience across every stage of your journey.
                </p>

                <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                  Our goal is to help learners stay focused, build clarity around their goals, and grow with confidence through structured learning and consistent practice.
                </p>

                <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                  While information is easily accessible online, true growth comes from guided learning and real application — and that&apos;s what TalentFlow is built to deliver.
                </p>

                <p className="text-gray-500 text-sm mb-6">Learn smarter. Grow faster.</p>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg shadow-md hover:bg-primary-dark transition"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-20 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-14">
              <p className="text-primary font-semibold text-sm mb-4 text-[22px]">Our Benefits</p>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                Why Choose TalentFlow
              </h2>

              <p className="text-gray-500 text-sm max-w-md mx-auto">
                By joining TalentFlow, you gain access to a powerful learning environment designed to help you succeed.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {benefits.map((b, i) => (
                <div
                  key={b.number}
                  className={`rounded-2xl p-7 transition ${
                    i % 2 === 0
                      ? 'bg-blue-100'
                      : 'bg-white shadow-sm'
                  }`}
                >
                  <p className="text-primary font-extrabold text-2xl mb-4 opacity-60">
                    {b.number}
                  </p>

                  <h3 className="font-bold text-gray-900 mb-2">
                    {b.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed">
                    {b.desc}
                  </p>
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