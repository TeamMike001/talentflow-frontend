import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-primary">
              Learn{' '}
              <span className="text-[#F59E0B]">Smarter</span>{' '}
              with
              <br />
              <span className="text-[#F59E0B]">TalentFlow</span>
            </h1>
            <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-md">
              All your learning, assignments, and progress in one place.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup"
                className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-md hover:shadow-lg text-sm"
              >
                Get Started
              </Link>
              <Link
                href="/courses"
                className="px-7 py-3.5 border-2 border-primary text-primary font-semibold rounded-xl hover:border-primary hover:text-primary transition-all text-sm flex items-center gap-2"
              >
                Explore Courses
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Images — stacked collage like the Figma design */}
          <div className="relative h-[420px] lg:h-[480px]">
            {/* Background image — large card */}
            <div className="absolute right-0 bottom-0 w-[85%] h-[75%] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/Frame14.png"
                alt="Students learning together"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Foreground image — smaller card overlapping top-left */}
            <div className="absolute left-0 top-0 w-[55%] h-[52%] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/images/Frame14.png"
                alt="Teaching session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}