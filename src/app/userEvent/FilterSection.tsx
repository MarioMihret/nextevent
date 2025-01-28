import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

const FilterSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold">Date</span>
        </div>
        <input
          type="date"
          className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold">Location</span>
        </div>
        <select className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none">
          <option value="">All Locations</option>
          <option value="addis">Addis Ababa</option>
          <option value="hawassa">Hawassa</option>
          <option value="bahirdar">Bahir Dar</option>
        </select>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold">Category</span>
        </div>
        <select className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-white focus:border-purple-500 focus:outline-none">
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="business">Business</option>
          <option value="design">Design</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;