import React from 'react';
import { Edit2, Trash2, BarChart2, Video, MapPin } from 'lucide-react';
import { Tooltip } from '../../Tooltip';
import { Event } from '../../types/event';

interface EventListItemProps {
  event: Event;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewAnalytics?: (id: string) => void;
}

const EventListItem: React.FC<EventListItemProps> = ({ 
  event, 
  onEdit, 
  onDelete, 
  onViewAnalytics 
}) => {
  const statusColors = {
    upcoming: 'bg-blue-500/20 text-blue-400',
    ongoing: 'bg-green-500/20 text-green-400',
    completed: 'bg-gray-500/20 text-gray-400'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-gray-300">
            <span>{new Date(event.date).toLocaleString()}</span>
            {event.isVirtual ? (
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Join Meeting
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            )}
            <span>{event.attendees}/{event.maxAttendees} attending</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[event.status]}`}>
            {event.status}
          </span>
          {onViewAnalytics && onEdit && onDelete && (
            <div className="flex items-center gap-2">
              <Tooltip content="View Analytics">
                <button 
                  onClick={() => onViewAnalytics(event.id)}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <BarChart2 className="w-5 h-5 text-purple-400" />
                </button>
              </Tooltip>
              <Tooltip content="Edit Event">
                <button 
                  onClick={() => onEdit(event.id)}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5 text-blue-400" />
                </button>
              </Tooltip>
              <Tooltip content="Delete Event">
                <button 
                  onClick={() => onDelete(event.id)}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListItem;