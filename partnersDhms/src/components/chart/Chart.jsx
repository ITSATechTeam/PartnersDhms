// import './chart.css';
// import DateInput from '../DateInput';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';

// function Chart() {
//   const data = [
//     { name: 'JAN', value: 10 },
//     { name: 'FEB', value: 12 },
//     { name: 'MAR', value: 8 },
//     { name: 'APR', value: 15 },
//     { name: 'MAY', value: 20 },
//     { name: 'JUN', value: 14 },
//     { name: 'JUL', value: 18 },
//     { name: 'AUG', value: 10 },
//     { name: 'SEPT', value: 12 },
//     { name: 'OCT', value: 9 },
//     { name: 'NOV', value: 14 },
//     { name: 'DEC', value: 17 },
//   ];

//   return (
//     <div className='chart'>
//       <div className="date">
//         <h2 className="chartTitle">Completed tasks</h2>
//         <DateInput />
//       </div>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
//           <defs>
//             <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#6e46ff" stopOpacity={1} />
//               <stop offset="100%" stopColor="#d2c3fa" stopOpacity={0.3} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" stroke='#5550bd' />
//           <YAxis />
//           <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e3e3e3' }} />
//           <Area 
//             type="monotone" 
//             dataKey="value" 
//             stroke="none" 
//             fill="url(#gradientColor)" 
//             fillOpacity={1} 
//           />
//           <Line 
//             type="monotone" 
//             dataKey="value" 
//             stroke="#6e46ff" 
//             strokeWidth={2} 
//             dot={{ r: 5 }} 
//             activeDot={{ r: 6 }} 
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default Chart;



import React, { useEffect, useState } from 'react';
import './chart.css';
import DateInput from '../DateInput';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';

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

function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(getStoredTokens());

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
      // Handle refresh failure - might need to redirect to login
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

      const response = await fetch('/api/fetchmaintenancepermonth', {
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
          const retryResponse = await fetch('/api/fetchmaintenancepermonth', {
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
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchDataWithAuth();

        if (result && result.maintenanceCountPerMonth) {
          const formattedData = Object.entries(result.maintenanceCountPerMonth).map(([month, count]) => ({
            name: month,
            value: count,
          }));
          setData(formattedData);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='chart'>
      <div className="date">
        <h2 className="chartTitle">Completed tasks</h2>
        <DateInput />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6e46ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#d2c3fa" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke='#5550bd' />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e3e3e3' }} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="none" 
            fill="url(#gradientColor)" 
            fillOpacity={1} 
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#6e46ff" 
            strokeWidth={2} 
            dot={{ r: 5 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;