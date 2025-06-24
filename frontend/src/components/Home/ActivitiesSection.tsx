"use client";
const activities = [
  { name: 'Annual Day', icon: '🎭', month: 'December' },
  { name: 'Sports Day', icon: '🏃', month: 'January' },
  { name: 'Science Fair', icon: '🧪', month: 'February' },
  { name: 'Art Exhibition', icon: '🖼️', month: 'March' },
  { name: 'Cultural Fest', icon: '🎪', month: 'November' },
  { name: 'Environment Day', icon: '🌱', month: 'June' },
];

export default function ActivitiesSection() {
  return (
    <section className="py-20 relative z-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-neutral-50">
            <span className="bg-gradient-to-r from-brand-accent to-orange-500 bg-clip-text text-transparent">
              Fun Activities All Year Round
            </span>
          </h2>
          <p className="text-xl text-brand-neutral-300">Exciting events that make school life memorable!</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {activities.map((activity, idx) => (
            <div key={idx} className="bg-brand-neutral-800/50 backdrop-blur-md rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-lg hover:shadow-xl border border-brand-neutral-700">
              <div className="text-5xl mb-3">{activity.icon}</div>
              <h3 className="font-bold text-brand-neutral-100 mb-1">{activity.name}</h3>
              <p className="text-brand-secondary font-medium">{activity.month}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 