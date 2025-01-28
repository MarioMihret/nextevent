import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search events..."
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 pr-4 py-2 w-64 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white"
      />
    </div>
  );
}

export default SearchBar;