import { useState } from 'react';
import { Event } from '../types/event';
import { createJitsiMeetingLink } from '../utils/jitsi';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const createEvent = (formData: FormData) => {
    const isVirtual = formData.get('eventType') === 'virtual';
    const meetingLink = isVirtual ? createJitsiMeetingLink(Date.now().toString()) : undefined;

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      location: !isVirtual ? (formData.get('location') as string) : undefined,
      meetingLink,
      attendees: 0,
      maxAttendees: parseInt(formData.get('maxAttendees') as string),
      price: parseFloat(formData.get('price') as string),
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