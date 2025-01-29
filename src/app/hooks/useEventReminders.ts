import { useState } from 'react';
import { Event } from '../types/event';
import { ReminderConfig } from '../organizer/EventReminders/ReminderSettings';

export const useEventReminders = (event: Event) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveReminders = async (reminders: ReminderConfig[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, reminders }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save reminders');
      }

      // Return the response data
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save reminders');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveReminders,
    loading,
    error,
  };
};