"use client"
import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Video, X } from 'lucide-react';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onClose, onSubmit }) => {
  const [isVirtual, setIsVirtual] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.set('eventType', isVirtual ? 'virtual' : 'physical');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Create New Event</h2>
        <button 
          type="button" 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 mb-2">Event Title</label>
          <input
            name="title"
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Date</label>
          <input
            name="date"
            type="datetime-local"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="block text-gray-300 mb-2">Event Type</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="eventType"
                value="physical"
                checked={!isVirtual}
                onChange={() => setIsVirtual(false)}
                className="text-purple-600"
              />
              Physical Event
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="eventType"
                value="virtual"
                checked={isVirtual}
                onChange={() => setIsVirtual(true)}
                className="text-purple-600"
              />
              Virtual Event
            </label>
          </div>
        </div>

        {!isVirtual && (
          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              name="location"
              type="text"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
              placeholder="Enter location"
              required={!isVirtual}
            />
          </div>
        )}

        <div>
          <label className="block text-gray-300 mb-2">Ticket Price</label>
          <input
            name="price"
            type="number"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Maximum Attendees</label>
          <input
            name="maxAttendees"
            type="number"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
            placeholder="Enter maximum attendees"
            min="1"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none h-32"
            placeholder="Enter event description"
            required
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-gray-700 rounded-lg text-white font-semibold hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;