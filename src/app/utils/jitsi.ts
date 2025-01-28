// Utility functions for Jitsi meeting links
export const generateJitsiMeetingId = () => {
  // Generate a unique, URL-safe meeting ID
  const randomStr = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now().toString(36);
  return `event-${randomStr}-${timestamp}`;
};

export const createJitsiMeetingLink = (eventId: string) => {
  const baseUrl = 'https://meet.jit.si';
  const meetingId = generateJitsiMeetingId();
  return `${baseUrl}/${meetingId}`;
};