import React, { useRef } from "react";
import "./Bar.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const FilterBar = ({ searchText, setSearchText, filterStatus, setFilterStatus, onFilter }) => {
  const fileInputRef = useRef(null);
  const [showFilterOptions, setShowFilterOptions] = React.useState(false); // Toggle for filter options

  // Function to trigger the file input when the export button is clicked
  const handleExportClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected for export:", file.name);
      // Add logic to handle the export here
    }
  };

  // Toggle filter options display
  const toggleFilterOptions = () => {
    setShowFilterOptions((prev) => !prev);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-search"
        placeholder="Search for devices"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // Use the passed setter
      />
      <div className="filter-icon-container" onClick={toggleFilterOptions}>
        <FilterListIcon className="filter-icon" />
        <span className="filter-text">Filter</span>
      </div>

      {/* Filter options dropdown */}
      {showFilterOptions && (
        <div className="filter-options">
          <button onClick={() => setFilterStatus("All")}>All</button>
          <button onClick={() => setFilterStatus("Successful")}>Successful</button>
          <button onClick={() => setFilterStatus("Failed")}>Failed</button>
          <button onClick={() => setFilterStatus("Reversed")}>Reversed</button>
        </div>
      )}

      <button className="export-button" onClick={handleExportClick}>
        <SaveAltIcon className="export-icon" />
        <span className="export-text">Export</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FilterBar;
