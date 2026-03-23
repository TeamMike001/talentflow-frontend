'use client';

import { useState } from 'react';
import { Monitor, LineChart, MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: MonitorSmartphone,
    title: 'Interaction Design',
    description: 'Lessons on design that cover the most recent developments.',
    iconBg: 'bg-blue-100',
    iconColor: 'text-primary',
  },
  {
    icon: Monitor,
    title: 'UX Design Course',
    description: 'Classes in development that cover the most recent advancements in web.',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    icon: LineChart,
    title: 'User Interface Design',
    description: 'User Interface Design courses that cover the most recent trends',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
];

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 bg-white">
      <div className="px-5">
        <div className="text-center mb-8">
          <p className="text-primary font-semibold text-sm mb-2">Features</p>
          <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
            Fostering a playful & engaging <br />learning environment
          </h2>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === active;
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`rounded-2xl p-5 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-primary'
                    : 'bg-white border border-gray-100 shadow-sm'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    isActive ? 'bg-white/20' : feature.iconBg
                  }`}
                >
                  <Icon size={22} className={isActive ? 'text-white' : feature.iconColor} />
                </div>
                <h3 className={`font-bold text-base mb-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-3 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                  {feature.description}
                </p>
                <Link
                  href="/courses"
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-primary'
                  }`}
                >
                  Learn More →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? 'bg-primary w-6' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}