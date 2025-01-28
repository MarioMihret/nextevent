import React from 'react';
import { Users, Ticket, DollarSign, Clock } from 'lucide-react';
import AnalyticsChart from './AnalyticsChart';

interface AnalyticsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white/5 rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-400">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold text-white mb-2">{value}</div>
    <div className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
      {trend > 0 ? '+' : ''}{trend}% from last month
    </div>
  </div>
);

const EventAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Attendees"
          value="1,234"
          icon={<Users className="w-6 h-6 text-purple-400" />}
          trend={12}
        />
        <AnalyticsCard
          title="Ticket Sales"
          value="856"
          icon={<Ticket className="w-6 h-6 text-blue-400" />}
          trend={8}
        />
        <AnalyticsCard
          title="Revenue"
          value="$45,678"
          icon={<DollarSign className="w-6 h-6 text-green-400" />}
          trend={15}
        />
        <AnalyticsCard
          title="Avg. Duration"
          value="2.5 hrs"
          icon={<Clock className="w-6 h-6 text-orange-400" />}
          trend={-5}
        />
      </div>

      <div className="bg-white/5 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Attendance Trends</h3>
        <AnalyticsChart />
      </div>
    </div>
  );
};

export default EventAnalytics;