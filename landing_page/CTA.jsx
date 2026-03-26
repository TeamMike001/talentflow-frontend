import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-primary py-20 mb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight">
          Everyone deserves the chance to learn with TalentFlow
        </h2>
        <p className="text-blue-100 text-sm lg:text-base mb-8 max-w-2xl mx-auto">
          Join now to recieve personalised recommendtions from the full TalentFlow catalog.
        </p>
        <Link
          href="/signup"
          className="inline-block px-10 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm"
        >
          Start Learning Now
        </Link>
      </div>
    </section>
  );
}