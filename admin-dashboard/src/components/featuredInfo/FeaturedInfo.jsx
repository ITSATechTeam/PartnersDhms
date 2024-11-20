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

  const fetchData = async () => {
    try {
      const response = await fetch('/api/getmaintenancerequestscount', {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMTIwNTQwLCJpYXQiOjE3MzIxMTY5NDAsImp0aSI6ImY3M2MzOGQyZjAwMTRlNWM4N2U1ZWE4YWRkNWFjNzNmIiwidXNlcl9pZCI6NDA1LCJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.7VnzYkItr4c576htE0AA1Kevr-huMMiEGMwwM4IoTOQ`,
          'Content-Type': 'application/json',
        },
      });

      // Check if response is ok, else throw error with response message
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unexpected error occurred.');
      }

      const data = await response.json();

      // Set data if the response is successful
      setCounts({
        totalRequests: data.totalRequests || 0,
        pendingRequests: data.pendingRequests || 0,
        declinedRequests: data.declinedRequests || 0,
        completedRequests: data.completedRequests || 0,
      });
      setErrorMessage(null); // Reset error message on success

    } catch (error) {
      // Set error message to display in UI
      setErrorMessage(error.message || 'Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='top'>
      <h1>Hello Jude Uche, Welcome!</h1>
      <h2 className='overview'>Overview</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if exists */}
      <div className="featured">
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className='icon first' />
            <div className="info">
              <span className="count">{counts.totalRequests}</span>
              <span className="label">Total Requests</span>
            </div>
          </div>
        </div>
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className='icon second' />
            <div className="info">
              <span className="count">{counts.pendingRequests}</span>
              <span className="label">Pending Requests</span>
            </div>
          </div>
        </div>
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className='icon third' />
            <div className="info">
              <span className="count">{counts.declinedRequests}</span>
              <span className="label">Declined Requests</span>
            </div>
          </div>
        </div>
        <div className="featuredItem">
          <div className="featuredContent">
            <ArticleIcon className='icon fourth' />
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
