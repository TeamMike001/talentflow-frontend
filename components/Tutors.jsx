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
    <section className="py-10 bg-white">
      <div className="px-5">
        <div className="text-center mb-8">
          <p className="text-primary font-semibold text-sm mb-2">Tutors</p>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Meet the Heroes</h2>
          <p className="text-gray-500 text-xs px-2">
            On TalentFlow Instructors from all over the world instruct millions of students.
            We offer the knowledge and abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tutors.map((tutor) => (
            <div key={tutor.name} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-50 overflow-hidden bg-gray-100">
                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-primary text-xs mb-0.5">{tutor.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{tutor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}