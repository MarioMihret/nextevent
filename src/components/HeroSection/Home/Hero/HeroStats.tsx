"use client"
import React from 'react';
import { Calendar, Users, Sparkles } from 'lucide-react';

const stats = [
  { icon: Calendar, label: "Events Organized", value: "500+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Sparkles, label: "Years Experience", value: "15+" }
];

const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
      {stats.map(({ icon: Icon, label, value }, index) => (
        <div 
          key={label}
          className="p-6 transition-all duration-300 transform rounded-lg bg-white/10 backdrop-blur-md hover:scale-105"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <Icon className="w-8 h-8 mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-gray-300">{label}</div>
        </div>
      ))}
    </div>
  );
};
export default HeroStats;