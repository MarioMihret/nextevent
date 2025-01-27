"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import { Calendar, Users } from 'lucide-react';
import { Tooltip } from '@/app/Tooltip';

const CallToAction: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-delay">
      <Tooltip content="Create and manage your own events">
        <button
          onClick={() => router.push('/organizer')}
          className="flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:opacity-90 hover:scale-105"
        >
          <Calendar className="w-5 h-5" />
          Create Event
        </button>
      </Tooltip>

      <Tooltip content="Discover upcoming events">
        <button
          onClick={() => router.push('/events')}
          className="flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-200 transform bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 hover:scale-105"
        >
          <Users className="w-5 h-5" />
          Browse Events
        </button>
      </Tooltip>
    </div>
  );
};

export default CallToAction;