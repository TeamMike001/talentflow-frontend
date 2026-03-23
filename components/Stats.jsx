export default function Stats() {
  const stats = [
    { value: '20+', label: 'Courses' },
  ];

  return (
    <section className="bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        
        <div className="flex justify-center items-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              
              {/* BIG NUMBER */}
              <p className="text-6xl lg:text-7xl font-extrabold mb-2">
                {stat.value}
              </p>

              {/* LABEL */}
              <p className="text-lg lg:text-xl font-medium opacity-90">
                {stat.label}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
