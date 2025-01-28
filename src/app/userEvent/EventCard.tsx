"use client"
import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Video,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import EventDetailsModal from "./EventDetailsModal";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description?: string;
    date: string;
    location?: string;
    meetingLink?: string;
    attendees: number;
    maxAttendees: number;
    price: number;
    image: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isVirtual = !!event.meetingLink;

  return (
    <>
      <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>

          <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
            {isVirtual ? (
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <span>Virtual Event</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Users className="w-4 h-4 text-purple-400" />
              <span>
                {event.attendees}/{event.maxAttendees} attending
              </span>
            </div>
            <div className="flex items-center gap-1 text-purple-400 font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>{event.price.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold transition-colors">
            <ExternalLink className="w-4 h-4" />
            View More
          </button>
        </div>
      </div>

      {showDetails && (
        <EventDetailsModal
          event={event}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default EventCard;
