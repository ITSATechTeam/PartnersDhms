
import React from 'react';
import './FilterBar.css';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-search"
        placeholder="Search for devices"
      />
      <div className="filter-icon-container">
        <FilterListIcon className="filter-icon" />
        <span className="filter-text">Filter</span>
      </div>
    </div>
  );
};

export default FilterBar;


        