import React from 'react';

const AnalyticsChart: React.FC = () => {
  // Mock data for the chart
  const data = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 85 },
    { month: 'Mar', value: 75 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 120 },
    { month: 'Jun', value: 110 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="h-64 flex items-end gap-4">
      {data.map(({ month, value }) => (
        <div key={month} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg"
            style={{ height: `${(value / maxValue) * 100}%` }}
          />
          <span className="text-gray-400 text-sm">{month}</span>
          <span className="text-white font-semibold">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsChart;