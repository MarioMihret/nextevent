export const addToCalendar = (event: {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
}) => {
  const { title, description, startTime, endTime, location } = event;
  
  // Generate Google Calendar link
  const googleUrl = new URL('https://calendar.google.com/calendar/render');
  googleUrl.searchParams.append('action', 'TEMPLATE');
  googleUrl.searchParams.append('text', title);
  googleUrl.searchParams.append('details', description);
  googleUrl.searchParams.append('dates', `${startTime}/${endTime}`);
  if (location) googleUrl.searchParams.append('location', location);

  // Open in new tab
  window.open(googleUrl.toString(), '_blank');
};

export const setEventReminder = (eventTime: string, minutesBefore: number) => {
  const reminderTime = new Date(eventTime).getTime() - (minutesBefore * 60 * 1000);
  
  // Request notification permission if needed
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  // Set timeout for reminder
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('Event Reminder', {
        body: `Your event starts in ${minutesBefore} minutes`,
        icon: '/favicon.ico'
      });
    }
  }, reminderTime - Date.now());
};