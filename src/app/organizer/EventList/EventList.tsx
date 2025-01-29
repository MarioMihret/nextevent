"use client";

import React, { useState, useMemo } from "react";
import { Search,  Calendar, Grid, List, Bell } from "lucide-react";
import { Event } from "../../types/event";
import EventListItem from "./EventListItem";
import EventGrid from "./EventGrid";
import { motion, AnimatePresence } from "framer-motion";
import  ReminderSettings  from "@/app/organizer/EventReminders/ReminderSettings";
import { useEventReminders } from "@/app/hooks/useEventReminders";

interface EventListProps {
  events: Event[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewAnalytics?: (id: string) => void;
  showActions?: boolean;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEdit,
  onDelete,
  onViewAnalytics,
  showActions = true,
}) => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "ongoing" | "completed">("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || event.status === filter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchTerm, filter]);

  // Reminder Hook
  const { saveReminders } = useEventReminders(selectedEvent ?? {} as Event);

  const handleSaveReminders = async (reminders: any) => {
    try {
      if (!selectedEvent) return;
      await saveReminders(reminders);
      alert("Reminders saved successfully!");
    } catch (err) {
      console.error("Failed to save reminders:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-1 bg-gray-700 rounded-lg">
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-colors ${
                view === "list" ? "bg-gray-600 text-purple-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-colors ${
                view === "grid" ? "bg-gray-600 text-purple-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>

          <select
            
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Events Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {filteredEvents.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-white">No events found</h3>
              <p className="text-gray-400">
                {searchTerm ? "Try adjusting your search terms" : "Start by creating your first event"}
              </p>
            </div>
          ) : view === "list" ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EventListItem
                    event={event}
                    onEdit={showActions ? onEdit : undefined}
                    onDelete={showActions ? onDelete : undefined}
                    onViewAnalytics={showActions ? onViewAnalytics : undefined}
                  />
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center mt-2 text-sm text-purple-400 hover:text-white"
                  >
                    <Bell className="w-4 h-4 mr-2" /> Set Reminders
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <EventGrid events={filteredEvents} showJoinButton={false} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Reminder Settings Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-white">Reminder Settings for {selectedEvent.title}</h2>
            <ReminderSettings event={selectedEvent} onSaveReminders={handleSaveReminders} />
            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full mt-4 text-center text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
