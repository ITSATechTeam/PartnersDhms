// import ArticleIcon from '@mui/icons-material/Article';
// import './featuredInfo.css';

// export default function FeaturedInfo() {
//   return (
//     <div className='top'>
//       <h1>Hello Jude Uche, Welcome!</h1>
//       <h2 className='overview'>Overview</h2>
//       <div className="featured">
//         <div className="featuredItem">
//           <div className="featuredContent">
//             <ArticleIcon className='icon first' />
//             <div className="info">
//               <span className="count">30</span>
//               <span className="label">Total Requests</span>
//             </div>
//           </div>
//         </div>
//         <div className="featuredItem">
//           <div className="featuredContent">
//             <ArticleIcon className='icon second' />
//             <div className="info">
//               <span className="count">05</span>
//               <span className="label">Pending Requests</span>
//             </div>
//           </div>
//         </div>
//         <div className="featuredItem">
//           <div className="featuredContent">
//             <ArticleIcon className='icon third' />
//             <div className="info">
//               <span className="count">10</span>
//               <span className="label">Declined Requests</span>
//             </div>
//           </div>
//         </div>
//         <div className="featuredItem">
//           <div className="featuredContent">
//             <ArticleIcon className='icon fourth' />
//             <div className="info">
//               <span className="count">15</span>
//               <span className="label">Completed Requests</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ArticleIcon from '@mui/icons-material/Article';
import './featuredInfo.css';

// Token management utilities
const getStoredToken = () => localStorage.getItem('accessToken');
const setStoredToken = (token) => localStorage.setItem('accessToken', token);
const getStoredRefreshToken = () => localStorage.getItem('refreshToken');

const refreshAccessToken = async () => {
  try {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch('/api/refreshtoken/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    });

    if (!response.ok) throw new Error('Token refresh failed');

    const data = await response.json();
    setStoredToken(data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/';
    return null;
  }
};

const fetchWithToken = async (url, options = {}) => {
  let token = getStoredToken();
  if (!token) {
    console.error('No access token available');
    window.location.href = '/';
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (!token) return null;

    headers.Authorization = `Bearer ${token}`;
    response = await fetch(url, { ...options, headers });
  }

  return response;
};

export default function FeaturedInfo() {
  const [counts, setCounts] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    declinedRequests: 0,
    completedRequests: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [TechnicianName, setTechnicianName] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetchWithToken('/api/getmaintenancerequestscount');
      
      if (!response || !response.ok) {
        throw new Error('Failed to fetch maintenance request counts');
      }

      const data = await response.json();
      setCounts({
        totalRequests: data.totalRequests || 0,
        pendingRequests: data.pendingRequests || 0,
        declinedRequests: data.declinedRequests || 0,
        completedRequests: data.completedRequests || 0,
      });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to fetch data');
    }
  };

  const getUsernameFromToken = () => {
    try {
      const token = getStoredToken();
      if (!token) throw new Error('No token available');

      const decodedToken = jwtDecode(token);
      setTechnicianName(decodedToken.username || 'User');
    } catch (error) {
      console.error('Error decoding token:', error);
      setTechnicianName('User');
    }
  };

  useEffect(() => {
    getUsernameFromToken();
    fetchData();

    // Set up periodic refresh of data
    const refreshInterval = setInterval(() => {
      fetchData();
      getUsernameFromToken(); // Optionally refresh username if token changes
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="top">
      <h1>Hello {TechnicianName}, Welcome!</h1>
      <h2 className="overview">Overview</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="featured">
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className="icon first" />
            <div className="info">
              <span className="count">{counts.totalRequests}</span>
              <span className="label">Total Requests</span>
            </div>
          </div>
        </div>
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className="icon second" />
            <div className="info">
              <span className="count">{counts.pendingRequests}</span>
              <span className="label">Pending Requests</span>
            </div>
          </div>
        </div>
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className="icon third" />
            <div className="info">
              <span className="count">{counts.declinedRequests}</span>
              <span className="label">Declined Requests</span>
            </div>
          </div>
        </div>
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className="icon fourth" />
            <div className="info">
              <span className="count">{counts.completedRequests}</span>
              <span className="label">Completed Requests</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}