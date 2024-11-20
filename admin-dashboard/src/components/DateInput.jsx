import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './dateInput.css'; // Optional: Add custom styles if needed

function DateInput() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Function to generate years from the start year down to a past year
  const generateYears = (startYear, range) => {
    const years = [];
    for (let i = 0; i < range; i++) {
      years.push(startYear - i);
    }
    return years;
  };

  // Generate years from the current year back 50 years
  const years = generateYears(new Date().getFullYear(), 50);

  return (
    <div className="date-input-container">
      <CalendarMonthIcon className="calendar-icon" /> {/* Calendar icon beside the dropdown */}
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateInput;
