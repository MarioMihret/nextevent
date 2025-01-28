import React, { useState } from "react";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Video,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import PaymentOptions from "./Payment/PaymentOptions";

interface EventDetailsModalProps {
  event: {
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
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
}) => {
  const isVirtual = !!event.meetingLink;
  const [hasPaid, setHasPaid] = useState(false);

  const handlePaymentComplete = () => {
    setHasPaid(true);
  };

  const showJoinButton = isVirtual && (event.price === 0 || hasPaid);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              {isVirtual ? (
                <>
                  <Video className="w-5 h-5 text-purple-400" />
                  <span>Virtual Event</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>{event.location}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-5 h-5 text-purple-400" />
              <span>
                {event.attendees}/{event.maxAttendees} attending
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <span>${event.price.toFixed(2)}</span>
            </div>
          </div>

          {event.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About This Event</h3>
              <p className="text-gray-300">{event.description}</p>
            </div>
          )}

          {event.price > 0 && !hasPaid && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Options</h3>
              <PaymentOptions price={event.price} onPaymentComplete={handlePaymentComplete} />
            </div>
          )}

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold transition-colors">
              Register Now
            </button>
            {showJoinButton && (
              <a
                href={event.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors">
                <ExternalLink className="w-5 h-5" />
                Join Meeting
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal