import './chart.css';
import DateInput from '../DateInput';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';

function Chart() {
  const data = [
    { name: 'JAN', value: 10 },
    { name: 'FEB', value: 12 },
    { name: 'MAR', value: 8 },
    { name: 'APR', value: 15 },
    { name: 'MAY', value: 20 },
    { name: 'JUN', value: 14 },
    { name: 'JUL', value: 18 },
    { name: 'AUG', value: 10 },
    { name: 'SEPT', value: 12 },
    { name: 'OCT', value: 9 },
    { name: 'NOV', value: 14 },
    { name: 'DEC', value: 17 },
  ];

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





// import React, { useEffect, useState } from 'react';
// import './chart.css';
// import DateInput from '../DateInput';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';

// function Chart() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('https://dhms.itservicedeskafrica.com/api/fetchmaintenancepermonth', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMTIwNTQwLCJpYXQiOjE3MzIxMTY5NDAsImp0aSI6ImY3M2MzOGQyZjAwMTRlNWM4N2U1ZWE4YWRkNWFjNzNmIiwidXNlcl9pZCI6NDA1LCJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.7VnzYkItr4c576htE0AA1Kevr-huMMiEGMwwM4IoTOQ`, 
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const result = await response.json();

//         // Map maintenanceCountPerMonth object to chart data format
//         if (result && result.maintenanceCountPerMonth) {
//           const formattedData = Object.entries(result.maintenanceCountPerMonth).map(([month, count]) => ({
//             name: month,
//             value: count,
//           }));
//           setData(formattedData);
//         } else {
//           throw new Error('Unexpected response structure');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

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
//           {/* Area to fill under the line */}
//           <Area 
//             type="monotone" 
//             dataKey="value" 
//             stroke="none" 
//             fill="url(#gradientColor)" 
//             fillOpacity={1} 
//           />
//           {/* Line on top of the area */}
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
