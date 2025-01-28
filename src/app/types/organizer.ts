import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().refine((date) => new Date(date) > new Date(), 'Event date must be in the future'),
  location: z.string().optional(),
  price: z.number().min(0, 'Price cannot be negative'),
  maxAttendees: z.number().min(1, 'Must allow at least 1 attendee'),
  eventType: z.enum(['virtual', 'physical']),
});

export type EventFormData = z.infer<typeof eventSchema>;

export interface EventStats {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  growth: number;
}

export interface EventAnalytics {
  attendees: number;
  ticketSales: number;
  revenue: number;
  averageDuration: string;
  trends: {
    month: string;
    value: number;
  }[];
}