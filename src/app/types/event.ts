export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  meetingLink?: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  image: string;
  organizerId: string;
  isVirtual: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  visibility: {
    isVisible: boolean;
    scheduledFor?: string; // ISO date string for scheduled visibility
  };
}