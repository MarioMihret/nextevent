import { NextResponse } from 'next/server';
import { Event } from '../../../types/event';
import { ReminderConfig } from '../../../app/organizer/EventReminders/ReminderSettings';

// In a real application, you would use a proper email service
const sendReminderEmail = async (event: Event, userEmail: string) => {
  console.log(`Sending reminder email to ${userEmail} for event: ${event.title}`);
  // Implement your email sending logic here using a service like SendGrid, AWS SES, etc.
};

export async function POST(request: Request) {
  try {
    const { event, reminders } = await request.json();

    // Validate request data
    if (!event || !reminders) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Schedule reminders for the event
    reminders.forEach((reminder: ReminderConfig) => {
      if (!reminder.enabled) return;

      const eventTime = new Date(event.date).getTime();
      const reminderTime = eventTime - (reminder.timeBeforeEvent * 60 * 1000);
      const now = Date.now();

      if (reminderTime > now) {
        // Schedule the reminder
        setTimeout(async () => {
          try {
            // In a real application, you would fetch the attendees' emails from your database
            const attendeeEmails = ['attendee@example.com']; // Example
            
            // Send reminder emails to all attendees
            for (const email of attendeeEmails) {
              await sendReminderEmail(event, email);
            }
          } catch (error) {
            console.error('Failed to send reminder:', error);
          }
        }, reminderTime - now);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing reminder request:', error);
    return NextResponse.json(
      { error: 'Failed to process reminder request' },
      { status: 500 }
    );
  }
}