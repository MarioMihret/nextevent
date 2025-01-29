import React, { useState } from 'react';
import { Bell, Plus, Trash2, Clock, Mail } from 'lucide-react';
import { Event } from '../../types/event';

interface ReminderSettingsProps {
  event: Event;
  onSaveReminders: (reminders: ReminderConfig[]) => void;
}

export interface ReminderConfig {
  id: string;
  type: 'email';
  timeBeforeEvent: number; // in minutes
  enabled: boolean;
}

const defaultReminderTimes = [
  { label: '24 hours before', value: 1440 },
  { label: '12 hours before', value: 720 },
  { label: '2 hours before', value: 120 },
  { label: '1 hour before', value: 60 },
  { label: '30 minutes before', value: 30 },
  { label: '15 minutes before', value: 15 },
];

const ReminderSettings: React.FC<ReminderSettingsProps> = ({ event, onSaveReminders }) => {
  const [reminders, setReminders] = useState<ReminderConfig[]>([
    { id: '1', type: 'email', timeBeforeEvent: 1440, enabled: true } // Default 24-hour reminder
  ]);
  const [customTime, setCustomTime] = useState<number>(60);
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);

  const addReminder = (timeBeforeEvent: number) => {
    const newReminder: ReminderConfig = {
      id: Date.now().toString(),
      type: 'email',
      timeBeforeEvent,
      enabled: true
    };
    
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    onSaveReminders(updatedReminders);
    setShowCustomTimeInput(false);
  };

  const removeReminder = (id: string) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    onSaveReminders(updatedReminders);
  };

  const toggleReminder = (id: string) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    );
    setReminders(updatedReminders);
    onSaveReminders(updatedReminders);
  };

  const formatTimeBeforeEvent = (minutes: number): string => {
    if (minutes >= 1440) {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} before`;
    }
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} before`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''} before`;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Event Reminders</h3>
        </div>
        <button
          onClick={() => setShowCustomTimeInput(!showCustomTimeInput)}
          className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          <Plus className="w-4 h-4" />
          Add Reminder
        </button>
      </div>

      {/* Custom Time Input */}
      {showCustomTimeInput && (
        <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
          <div className="flex-1">
            <label className="block mb-2 text-sm text-gray-300">
              Time before event (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={customTime}
              onChange={(e) => setCustomTime(Number(e.target.value))}
              className="w-full p-2 text-white bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={() => addReminder(customTime)}
            className="px-4 py-2 transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
          >
            Add
          </button>
        </div>
      )}

      {/* Preset Reminder Times */}
      <div className="grid grid-cols-2 gap-4">
        {defaultReminderTimes.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => addReminder(value)}
            className="flex items-center gap-2 p-3 text-left text-gray-300 transition-colors rounded-lg hover:bg-gray-700"
          >
            <Clock className="w-4 h-4 text-purple-400" />
            {label}
          </button>
        ))}
      </div>

      {/* Active Reminders */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400">Active Reminders</h4>
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-white">
                {formatTimeBeforeEvent(reminder.timeBeforeEvent)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminder.enabled}
                  onChange={() => toggleReminder(reminder.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
              <button
                onClick={() => removeReminder(reminder.id)}
                className="p-1 text-gray-400 transition-colors hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderSettings;