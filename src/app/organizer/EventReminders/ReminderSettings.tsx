import React from 'react';
import { Bell } from 'lucide-react';
import { Event } from '../../../types/event';

interface ReminderSettingsProps {
  event: Event;
  onSetReminder: (minutes: number) => void;
}

const ReminderSettings: React.FC<ReminderSettingsProps> = ({ event, onSetReminder }) => {
  const reminderOptions = [
    { label: '10 minutes before', value: 10 },
    { label: '30 minutes before', value: 30 },
    { label: '1 hour before', value: 60 },
    { label: '1 day before', value: 1440 },
  ];

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-purple-400" />
        <span className="text-white font-semibold">Set Reminder</span>
      </div>
      
      <div className="space-y-2">
        {reminderOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onSetReminder(option.value)}
            className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReminderSettings;