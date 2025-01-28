"use client"
import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Grid, List } from 'lucide-react';
import { Event } from '../../types/event';
import EventListItem from './EventListItem';
import EventGrid from './EventGrid';
import { motion, AnimatePresence } from 'framer-motion';

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
  showActions = true 
}) => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || event.status === filter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchTerm, filter]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-gray-800 p-4 rounded-lg">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors ${
                view === 'list' ? 'bg-gray-600 text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md transition-colors ${
                view === 'grid' ? 'bg-gray-600 text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
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
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first event'}
              </p>
            </div>
          ) : view === 'list' ? (
            <div className="space-y-4">
              {filteredEvents.map(event => (
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
                </motion.div>
              ))}
            </div>
          ) : (
            <EventGrid events={filteredEvents} showJoinButton={false} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EventList;