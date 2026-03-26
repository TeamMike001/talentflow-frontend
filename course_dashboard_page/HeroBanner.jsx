import { MoveRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] h-96 p-12 text-white">
      <img 
        src="/images/don-kaveen-F0CTHqaZth0-unsplash-2.png" 
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 max-w-2xl">
        <span className="inline-block px-4 py-2 bg-primary backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-6">
          Learning Dashboard
        </span>
        <h1 className="text-5xl leading-[1.2] font-bold mb-4 tracking-tight">Welcome back, <br />Titus!</h1>
        <p className="text-lg opacity-90 leading-relaxed mb-4">
          You've completed 75% of your weekly goal. Your next lesson <br />"Advanced UI Composition" is waiting for you.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-lg font-medium flex items-center gap-2 transition-all hover:shadow-blue-500/30">
            Continue learning <MoveRight size={18} />
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-10 py-4.5 rounded-lg font-medium border border-white/20 transition-all">
            View Progress
          </button>
        </div>
      </div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    </section>
  );
}