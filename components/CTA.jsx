import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-primary py-12 mb-10">
      <div className="px-5 text-center">
        <h2 className="text-xl font-extrabold text-white mb-3 leading-tight">
          Everyone deserves the <br />chance to learn with <br />TalentFlow
        </h2>
        <p className="text-blue-100 text-sm mb-6 px-4">
          Join now to recieve personalised recommendations from the full TalentFlow catalog.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-xl text-sm"
        >
          Start Learning Now
        </Link>
      </div>
    </section>
  );
}