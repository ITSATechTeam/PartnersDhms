import React, { useEffect, useState } from 'react';
import './rightbar.css';
import SpeedIcon from '@mui/icons-material/Speed';

function Rightbar() {
  const [percentage, setPercentage] = useState(0);
  const radius = 80; // Radius of the circle
  const stroke = 11; // Thickness of the circle
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Fetch data from the API
  useEffect(() => {
    const fetchPercentageData = async () => {
      try {
        const response = await fetch('https://dhms.itservicedeskafrica.com/api/getmaintenancetyperate', {
          method: 'GET',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMTE2MjQ3LCJpYXQiOjE3MzIxMTI2NDcsImp0aSI6IjE5MWZjN2ZmMzBjODRkZDI4YjI3N2FjMWYzNDQ4OGVhIiwidXNlcl9pZCI6NDA1LCJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.mC3YvJVkAtRGCmaoKlvOcz4WODTo6HuH27ril6tgi3Y`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch completion percentage: ${response.statusText}`);
        }

        const data = await response.json();
        // Assuming API response has a field called "completionPercentage"
        setPercentage(data.completionPercentage || 0);
      } catch (error) {
        console.error('Error fetching completion percentage:', error);
      }
    };

    fetchPercentageData(); // Fetch data when component mounts
  }, []);

  return (
    <div className="progressBar">
      <span className="rightProgress">
        <h5 className="taskCompletion">Task completion rate</h5>
        <h1 className="percent">{percentage}%</h1>
      </span>
      <div className="circular-progress-bar">
        <svg height={radius * 2} width={radius * 2} className="progress-circle">
          {/* Background circle for the uncompleted portion */}
          <circle
            stroke="lightgray"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <circle
            stroke="rgba(42, 102, 176, 1)" // Match color from the image
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(270 ${radius} ${radius})`} // Start from top
          />
        </svg>
        <div className="icon-container">
          <SpeedIcon className="speed-icon" />
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
