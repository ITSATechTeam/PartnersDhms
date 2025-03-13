import React, { useEffect, useState } from 'react';
import './rightbar.css';
import SpeedIcon from '@mui/icons-material/Speed';

// Simplified token check - only verifies token exists
const isTokenExpiring = (token) => {
  return !token;
};

// Utility function to get stored tokens
const getStoredTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  };
};

function Rightbar() {
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(getStoredTokens());

  const radius = 80;
  const stroke = 11;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Simplified token refresh that continues regardless of outcome
  const refreshAccessToken = async () => {
    try {
      const response = await fetch('/api/refreshtoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: tokens.refreshToken
        }),
      });

      if (!response.ok) {
        return tokens.accessToken; // Just return existing token if refresh fails
      }

      const newTokens = await response.json();
      
      // Store new tokens but don't clear if there's an issue
      if (newTokens.access) {
        localStorage.setItem('accessToken', newTokens.access);
      }
      if (newTokens.refresh) {
        localStorage.setItem('refreshToken', newTokens.refresh);
      }

      setTokens({
        accessToken: newTokens.access || tokens.accessToken,
        refreshToken: newTokens.refresh || tokens.refreshToken
      });

      return newTokens.access || tokens.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return tokens.accessToken; // Return existing token on error
    }
  };

  // Simplified fetch that continues regardless of auth status
  const fetchDataWithAuth = async () => {
    try {
      let currentToken = tokens.accessToken;

      if (isTokenExpiring(currentToken)) {
        currentToken = await refreshAccessToken();
      }

      const response = await fetch('/api/getmaintenancetyperate', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // On 401, try once with refresh but don't redirect
        if (response.status === 401) {
          currentToken = await refreshAccessToken();
          const retryResponse = await fetch('/api/getmaintenancetyperate', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${currentToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (!retryResponse.ok) {
            return { completionPercentage: 0 }; // Return default data on error
          }
          return await retryResponse.json();
        }
        return { completionPercentage: 0 }; // Return default data on error
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return { completionPercentage: 0 }; // Return default data on error
    }
  };

  useEffect(() => {
    const fetchPercentageData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchDataWithAuth();
        setPercentage(data.completionPercentage || 0);
      } catch (error) {
        console.error('Error fetching completion percentage:', error);
        setError('Unable to load data');
        setPercentage(0); // Set default percentage on error
      } finally {
        setLoading(false);
      }
    };

    fetchPercentageData();
  }, []);

  if (loading) {
    return (
      <div className="progressBar">
        <span className="rightProgress">
          <h5 className="taskCompletion">Loading...</h5>
        </span>
      </div>
    );
  }

  // Even with error, show the progress bar with 0%
  return (
    <div className="progressBar">
      <span className="rightProgress">
        <h5 className="taskCompletion">
          {error ? 'Unable to load completion rate' : 'Task completion rate'}
        </h5>
        <h1 className="percent">{percentage}%</h1>
      </span>
      <div className="circular-progress-bar">
        <svg 
          height={radius * 2} 
          width={radius * 2} 
          className="progress-circle"
          aria-label={`Progress: ${percentage}%`}
          role="progressbar"
        >
          <circle
            stroke="lightgray"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
          <circle
            stroke="rgba(42, 102, 176, 1)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(270 ${radius} ${radius})`}
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