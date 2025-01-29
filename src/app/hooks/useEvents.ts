import { useState } from 'react';
import { Event } from '../types/event';
import { createJitsiMeetingLink } from '../utils/jitsi';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const createEvent = (formData: Record<string, any>) => {
    const isVirtual = formData.eventType === 'virtual';
    const meetingLink = isVirtual ? createJitsiMeetingLink(Date.now().toString()) : undefined;

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: !isVirtual ? formData.location : undefined,
      meetingLink,
      attendees: 0,
      maxAttendees: parseInt(formData.maxAttendees, 10) || 0,
      price: parseFloat(formData.price) || 0,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
      organizerId: '1', // In production, this would come from auth
      isVirtual,
      status: 'upcoming'
    };

    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return {
    events,
    createEvent,
    deleteEvent
  };
};
