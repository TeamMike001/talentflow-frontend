const tutors = [
  {
    name: 'Bonnie Green',
    role: 'Application Support Analyst Lead',
    image: '/images/header.png',
  },
  {
    name: 'Thomas Lean',
    role: 'Career Educator',
    image: '/images/card-header.png',
  },
  {
    name: 'Jese Leos',
    role: 'Senior Product Designer Lead',
    image: '/images/card-header(1).png',
  },
  {
    name: 'Leslie Livingston',
    role: 'Senior Front-end Developer',
    image: '/images/card-header(2).png',
  },
];

export default function Tutors() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm mb-2 text-[22px]">Tutors</p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">Meet the Heroes</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            On TalentFlow Instructors from all over the world instruct millions of students.
            We offer the knowledge and abilities.
          </p>
        </div>

        {/* Tutor Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.name}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Photo */}
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-primary text-sm mb-1">{tutor.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{tutor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}