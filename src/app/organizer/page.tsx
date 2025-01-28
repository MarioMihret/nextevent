"use client"
import React from "react";
import { PlusCircle } from "lucide-react";
import dynamic from 'next/dynamic';
import { EventErrorBoundary } from "@/components/ErrorBoundary";
import EventStats from "./EventStats";
import EventList from "./EventList/EventList";
import EventAnalytics from "./Analytics/EventAnalytics";
import { useEventManagement } from "../hooks/useEventManagement";

const EventForm = dynamic(() => import('./EventForm'), {
  loading: () => <div className="flex items-center justify-center p-8">Loading...</div>
});

const OrganizerDashboard = () => {
  const {
    events,
    showForm,
    setShowForm,
    handleEdit,
    handleDelete,
    handleCreateEvent
  } = useEventManagement();

  return (
    <div className="min-h-screen bg-gray-900 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Event Management
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:opacity-90 transition-opacity"
            aria-label="Create new event">
            <PlusCircle className="w-5 h-5" />
            <span className="font-semibold">Create New Event</span>
          </button>
        </div>

        <EventErrorBoundary>
          <EventStats />

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Events
            </h2>
            <EventList
              events={events}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewAnalytics={(id) => console.log("View analytics:", id)}
            />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Analytics Overview
            </h2>
            <EventAnalytics />
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-xl w-full max-w-3xl">
                <EventForm
                  onClose={() => setShowForm(false)}
                  onSubmit={handleCreateEvent}
                />
              </div>
            </div>
          )}
        </EventErrorBoundary>
      </div>
    </div>
  );
};

export default OrganizerDashboard;