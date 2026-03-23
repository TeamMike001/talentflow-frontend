export default function Stats() {
  const stats = [
    { value: '50+', label: 'Expert Tutors' },
    { value: '20+', label: 'Courses' },
    { value: '500+', label: 'Over Students' },
  ];

  return (
    <section className="bg-primary py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 divide-x divide-blue-400">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white px-4">
              <p className="text-3xl lg:text-4xl font-extrabold mb-1">{stat.value}</p>
              <p className="text-sm lg:text-base font-medium opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}