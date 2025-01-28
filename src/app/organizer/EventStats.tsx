import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

const EventStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-purple-400" />
          <span className="text-white font-semibold">Total Events</span>
        </div>
        <p className="text-3xl font-bold text-white">24</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <span className="text-white font-semibold">Total Attendees</span>
        </div>
        <p className="text-3xl font-bold text-white">1,234</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-purple-400" />
          <span className="text-white font-semibold">Revenue</span>
        </div>
        <p className="text-3xl font-bold text-white">$45,678</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <span className="text-white font-semibold">Growth</span>
        </div>
        <p className="text-3xl font-bold text-white">+24%</p>
      </div>
    </div>
  );
}

export default EventStats;