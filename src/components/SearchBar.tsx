import React from "react";

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchQuery, handleSearchChange } : SearchBarProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search product name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm md:w-1/3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </>
  );
};

export default SearchBar;
