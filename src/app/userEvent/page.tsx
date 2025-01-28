"use client";
import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import FilterSection from "./FilterSection";

const UserDashboard = () => {
  // State to track whether we're on the client or not
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set `isClient` to true after the component mounts
  useEffect(() => {
    setIsClient(true); // Set to true only in the client-side
  }, []);

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Tech Conference 2024",
      description:
        "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
      date: "Mar 15, 2024",
      location: "Addis Ababa, Ethiopia",
      attendees: 150,
      maxAttendees: 200,
      price: 299,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      title: "Virtual Design Workshop",
      description:
        "Learn the latest design trends and tools in this interactive virtual workshop.",
      date: "Mar 20, 2024",
      meetingLink: "https://meet.jit.si/event-abc123",
      attendees: 45,
      maxAttendees: 100,
      price: 99,
      image:
        "https://images.unsplash.com/photo-1511795409834-432e51f83099?auto=format&fit=crop&q=80",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = events.filter(event => {
      const searchLower = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.location?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = events;

    if (filters.date) {
      filtered = filtered.filter(event => new Date(event.date) >= new Date(filters.date));
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter(event => event.location?.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredEvents(filtered);
  };

  // Conditional rendering based on client-side mounting
  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Discover Events</h1>
          <div className="flex items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Filter className="w-4 h-4 text-purple-400" />
              <span className="text-white">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && <FilterSection onFilterChange={handleFilterChange} />}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No events found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Export as default
export default UserDashboard;
