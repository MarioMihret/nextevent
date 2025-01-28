import React from "react";
import { Event } from "../../types/event";
import EventCard from "../../userEvent/EventCard";

interface EventGridProps {
  events: Event[];
  showJoinButton?: boolean;
}

const EventGrid = React.memo<EventGridProps>(({
  events,
  showJoinButton = true,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          showJoinButton={showJoinButton}
        />
      ))}
    </div>
  );
});

EventGrid.displayName = 'EventGrid';

export default EventGrid;