import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-between mb-4">
      <select name="category" onChange={handleFilterChange} className="border rounded p-2">
        <option value="">All Categories</option>
        <option value="web-development">Web Development</option>
        <option value="data-science">Data Science</option>
        <option value="design">Design</option>
      </select>
      <input
        type="text"
        name="search"
        placeholder="Search courses..."
        onChange={handleFilterChange}
        className="border rounded p-2"
      />
    </div>
  );
};

export default Filter;
