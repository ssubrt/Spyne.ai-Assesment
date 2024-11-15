"use client"

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 flex-grow"
        placeholder="Search cars..."
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
