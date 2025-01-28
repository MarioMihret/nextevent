import React from 'react';
import { Calendar } from 'lucide-react';
import { Event } from '../../types/event';

interface EventCalendarViewProps {
  events: Event[];
  onDateSelect: (date: Date) => void;
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({ events, onDateSelect }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = new Date(event.date).toDateString();
    acc[date] = [...(acc[date] || []), event];
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Event Calendar</h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-gray-400 text-sm py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar grid would be populated here */}
        {/* This is a simplified version - you'd want to use a proper calendar library in production */}
      </div>

      <div className="mt-4">
        <h4 className="text-white font-semibold mb-2">Upcoming Events</h4>
        {Object.entries(eventsByDate).map(([date, dateEvents]) => (
          <div key={date} className="mb-4">
            <div className="text-purple-400 text-sm mb-2">{date}</div>
            {dateEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white/10 rounded-lg p-3 mb-2 cursor-pointer hover:bg-white/20"
                onClick={() => onDateSelect(new Date(event.date))}
              >
                <div className="text-white font-semibold">{event.title}</div>
                <div className="text-gray-400 text-sm">
                  {new Date(event.date).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendarView;