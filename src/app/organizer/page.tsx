"use client"
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import EventForm from "./EventForm";
import EventStats from "./EventStats";
import EventList from "./EventList/EventList";
import EventAnalytics from "./Analytics/EventAnalytics";
import { useEvents } from "../hooks/useEvents";

const OrganizerDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { events, createEvent, deleteEvent } = useEvents();

  const handleEdit = (id: string) => {
    console.log("Edit event:", id);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
  };

  const handleViewAnalytics = (id: string) => {
    console.log("View analytics:", id);
  };

  const handleCreateEvent = (formData: FormData) => {
    createEvent(formData);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Event Management
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:opacity-90">
            <PlusCircle className="w-5 h-5" />
            <span className="font-semibold">Create New Event</span>
          </button>
        </div>

        <EventStats />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Events
          </h2>
          <EventList
            events={events}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewAnalytics={handleViewAnalytics}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Analytics Overview
          </h2>
          <EventAnalytics />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl">
              <EventForm
                onClose={() => setShowForm(false)}
                onSubmit={handleCreateEvent}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrganizerDashboard;
