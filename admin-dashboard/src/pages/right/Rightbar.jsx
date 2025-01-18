import React, { useEffect, useState } from 'react';
import './rightbar.css';
import SpeedIcon from '@mui/icons-material/Speed';

// Utility function to check if token is expired or about to expire
const isTokenExpiring = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if token will expire in the next 5 minutes
    return payload.exp * 1000 < Date.now() + 5 * 60 * 1000;
  } catch {
    return true;
  }
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

  // Token refresh function
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

      if (!response.ok) throw new Error('Failed to refresh token');

      const newTokens = await response.json();
      
      // Store new tokens
      localStorage.setItem('accessToken', newTokens.access);
      if (newTokens.refresh) {
        localStorage.setItem('refreshToken', newTokens.refresh);
      }

      setTokens({
        accessToken: newTokens.access,
        refreshToken: newTokens.refresh || tokens.refreshToken
      });

      return newTokens.access;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Authentication expired');
    }
  };

  // Fetch data with token refresh handling
  const fetchDataWithAuth = async () => {
    try {
      let currentToken = tokens.accessToken;

      // Check if token needs refresh
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
        if (response.status === 401) {
          // Token might have just expired, try refreshing once
          currentToken = await refreshAccessToken();
          // Retry the request with new token
          const retryResponse = await fetch('/api/getmaintenancetyperate', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${currentToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (!retryResponse.ok) {
            throw new Error(`Error: ${retryResponse.status}`);
          }
          return await retryResponse.json();
        }
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
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
        setError(error.message);
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

  if (error) {
    return (
      <div className="progressBar">
        <span className="rightProgress">
          <h5 className="taskCompletion">Error: {error}</h5>
        </span>
      </div>
    );
  }

  return (
    <div className="progressBar">
      <span className="rightProgress">
        <h5 className="taskCompletion">Task completion rate</h5>
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
