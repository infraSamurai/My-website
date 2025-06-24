"use client";
const facilities = [
  { name: 'Smart Classrooms', icon: '🖥️', color: 'from-brand-primary to-blue-500', description: 'Interactive digital learning spaces' },
  { name: 'Science Labs', icon: '🔬', color: 'from-brand-secondary to-purple-500', description: 'Hands-on experiments and discoveries' },
  { name: 'Sports Arena', icon: '⚽', color: 'from-green-400 to-green-600', description: 'Multiple sports facilities' },
  { name: 'Art Studio', icon: '🎨', color: 'from-pink-400 to-brand-secondary', description: 'Creative expression space' },
  { name: 'Music Room', icon: '🎵', color: 'from-yellow-400 to-brand-accent', description: 'Learn various instruments' },
  { name: 'Library', icon: '📚', color: 'from-indigo-400 to-brand-primary', description: 'Thousands of books to explore' },
];

export default function FacilitiesSection() {
  return (
    <section className="py-20 relative bg-brand-neutral-900 z-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-neutral-50">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Amazing Facilities
            </span>
          </h2>
          <p className="text-xl text-brand-neutral-300 max-w-2xl mx-auto">
            Explore our wonderful spaces designed for learning, playing, and growing!
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 ${facility.color} rounded-3xl blur-xl transition-opacity duration-500`}></div>
              <div className="relative bg-brand-neutral-800/50 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-brand-neutral-700">
                <div className="text-6xl mb-4">{facility.icon}</div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${facility.color} bg-clip-text text-transparent mb-3`}>
                  {facility.name}
                </h3>
                <p className="text-brand-neutral-400">{facility.description}</p>
                <button className="mt-6 text-brand-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 