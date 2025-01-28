import { useState } from 'react';
import { useEvents } from '../../app/hooks/useEvents';
import { Event } from '../../app/types/event';

export const useEventManagement = () => {
  const { events, createEvent, deleteEvent } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEdit = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleCreateEvent = (formData: FormData) => {
    try {
      const event = createEvent(formData);
      setShowForm(false);
      return event;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  };

  return {
    events,
    showForm,
    selectedEvent,
    setShowForm,
    handleEdit,
    handleDelete,
    handleCreateEvent
  };
};