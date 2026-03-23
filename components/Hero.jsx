import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white min-h-screen">
      <div className="px-5 pt-6 pb-10">

        {/* Image Card — white rounded container with overlapping photos */}
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 mx-auto overflow-visible mb-10" style={{ height: '360px' }}>

          {/* Large main image — fills most of the card, right-aligned */}
          <div
            className="absolute rounded-3xl overflow-hidden shadow-md"
            style={{ top: '30px', right: '10px', width: '78%', height: '300px' }}
          >
            <img
              src="/images/Rectangle14.png"
              alt="Students learning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Small overlapping image — top-left, floats over main image */}
          <div
            className="absolute rounded-2xl overflow-hidden shadow-lg border-4 border-white z-10"
            style={{ top: '10px', left: '10px', width: '44%', height: '140px' }}
          >
            <img
              src="/images/Rectangle13.png"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h1 className="text-[2rem] font-extrabold leading-tight tracking-tight">
            <span className="text-primary">Learn </span>
            <span className="text-[#F59E0B]">Smarter</span>
            <br />
            <span className="text-primary">with </span>
            <span className="text-[#F59E0B] font-black">TalentFlow</span>
          </h1>

          <p className="text-gray-500 text-base leading-relaxed">
            All your learning, assignments, and<br />
            progress in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-3">
            <Link
              href="/signup"
              className="flex-1 py-3.5 bg-primary text-white font-bold rounded-xl text-center text-sm"
            >
              Get Started
            </Link>
            <Link
              href="/courses"
              className="flex-1 py-3.5 border-2 border-primary text-primary font-semibold rounded-xl text-sm flex items-center justify-center gap-1.5"
            >
              Explore Courses
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}