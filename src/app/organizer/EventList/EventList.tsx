import React from 'react';
import { Event } from '../../types/event';
import EventListItem from './EventListItem';

interface EventListProps {
  events: Event[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewAnalytics?: (id: string) => void;
  showActions?: boolean;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  onEdit, 
  onDelete, 
  onViewAnalytics,
  showActions = true 
}) => {
  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventListItem
          key={event.id}
          event={event}
          onEdit={showActions ? onEdit : undefined}
          onDelete={showActions ? onDelete : undefined}
          onViewAnalytics={showActions ? onViewAnalytics : undefined}
        />
      ))}
    </div>
  );
};

export default EventList;