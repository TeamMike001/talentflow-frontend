'use client';

import { useState } from 'react';
import { Monitor, LineChart, ChevronRight, MonitorSmartphone, } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: MonitorSmartphone,
    title: 'Interaction Design',
    description: 'Lessons on design that cover the most recent developments.',
    iconBg: 'bg-blue-100',
    iconColor: 'text-primary',
    active: true,
  },
  {
    icon: Monitor,
    title: 'UX Design Course',
    description: 'Classes in development that cover the most recent advancements in web.',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange',
    active: false,
  },
  {
    icon: LineChart,
    title: 'User Interface Design',
    description: 'User Interface Design courses that cover the most recent trends',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    active: false,
  },
];

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm mb-4 text-[22px]">Features</p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
            Fostering a playful & engaging learning <br />environment
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === active;
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-xl'
                    : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isActive ? 'bg-white/20' : feature.iconBg
                  }`}
                >
                  <Icon
                    size={24}
                    className={isActive ? 'text-white' : feature.iconColor}
                  />
                </div>
                {/* Title */}
                <h3 className={`font-bold text-lg mb-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                  {feature.description}
                </p>
                {/* Learn More */}
                <Link
                  href="/courses"
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${
                    isActive ? 'text-white' : 'text-primary'
                  }`}
                >
                  Learn More <ChevronRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active ? 'bg-primary w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}