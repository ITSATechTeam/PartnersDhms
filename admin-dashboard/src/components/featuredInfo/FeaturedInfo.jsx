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

export default function FeaturedInfo() {
  const [counts, setCounts] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    declinedRequests: 0,
    completedRequests: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState(''); // State for the logged-in user's name

  // Fetch counts data from API
  const fetchData = async () => {
    try {
      const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyODk0MTUwLCJpYXQiOjE3MzI4OTA1NTAsImp0aSI6IjA2YzhjMjk3NzI0YzQ0ODA5ZDQwZDMzNjY5ZmM4ZmRmIiwidXNlcl9pZCI6MjIwfQ.S9PRwveEOHdgt1_Tlc2nGqWQxxOYL_WGWqrl8zVLS4U`; // Replace with your actual JWT token
      const response = await fetch('/api/getmaintenancerequestscount', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unexpected error occurred.');
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

  // Decode JWT to get the logged-in user's name
  useEffect(() => {
    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyODk0MTUwLCJpYXQiOjE3MzI4OTA1NTAsImp0aSI6IjA2YzhjMjk3NzI0YzQ0ODA5ZDQwZDMzNjY5ZmM4ZmRmIiwidXNlcl9pZCI6MjIwfQ.S9PRwveEOHdgt1_Tlc2nGqWQxxOYL_WGWqrl8zVLS4U`; // Replace with your actual JWT token
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        setUsername(decodedToken.username || 'User');
      } catch (error) {
        console.error('Invalid token:', error);
        setUsername('User');
      }
    }
    fetchData();
  }, []);

  return (
    <div className="top">
      <h1>Hello {username}, Welcome!</h1> {/* Dynamic username */}
      <h2 className="overview">Overview</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if exists */}
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
