// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { MoreVert } from '@mui/icons-material';
// import { userRows } from '../../dummyData';
// import './users.css';

// export default function Users() {
//   const columns = [
//     { field: 'id', headerName: 'Device Name', sortable: false, width: 115 },
//     {
//       field: 'student',
//       headerName: 'Student Name',
//       width: 168,
//       renderCell: (params) => {
//         return (
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <img
//               src={params.row.avatar}
//               alt='avatar'
//               style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
//             />
//             <span>{params.row.student}</span>
//           </div>
//         );
//       },
//     },
//     { field: 'school', headerName: 'School', type: 'String', sortable: false, width: 80 },
//     { field: 'device', headerName: 'Device', type: 'String', sortable: false, width: 150 },
//     { field: 'issue', headerName: 'Issue', description: 'This column has a value getter and is not sortable.', sortable: false, width: 130 },
//     {
//       field: 'priority',
//       headerName: 'Priority',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: true,
//       width: 90,
//       renderCell: (params) => {
//         let color;
//         switch (params.value) {
//           case 'High':
//             color = 'green';
//             break;
//           case 'Low':
//             color = 'orange';
//             break;
//           case 'Medium':
//             color = 'red';
//             break;
//           default:
//             color = 'gray';
//         }
//         return (
//           <span style={{ color, fontWeight: 'bold' }}>
//             {params.value}
//           </span>
//         );
//       }
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: true,
//       width: 65,
//       renderCell: (params) => {
//         return (
//           <MoreVert
//             style={{ cursor: 'pointer' }}
//           />
//         );
//       }
//     },
//   ];

//   return (
//     <div className='userList'>
//      <Paper 
//   sx={{ 
//     width: { xs: '122%', sm: '88%', md: '99.5%' }, // Responsive widths
    
    
//   }}
// >

//         <h4 className='pendingRequest'>Pending Requests</h4>
//         <DataGrid
//           rows={userRows}
//           columns={columns}
//           autoHeight  // Automatically adjusts height to show all rows
//           checkboxSelection
//           sx={{
//             border: 0,
//             '& .MuiDataGrid-main': {
//               overflow: 'hidden !important',
//             },
//             '& .MuiDataGrid-virtualScroller': {
//               overflow: 'hidden !important',
//             },
//           }}
//         />
//       </Paper>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MoreVert } from '@mui/icons-material';
import './users.css';

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

export default function Users() {
  const [userRows, setUserRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(getStoredTokens());

  const columns = [
    { field: 'id', headerName: 'Device Name', sortable: false, width: 115 },
    {
      field: 'student',
      headerName: 'Student Name',
      width: 168,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={params.row.avatar}
            alt="avatar"
            style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>{params.row.student}</span>
        </div>
      ),
    },
    { field: 'school', headerName: 'School', width: 80 },
    { field: 'device', headerName: 'Device', width: 150 },
    { field: 'issue', headerName: 'Issue', sortable: false, width: 130 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 90,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'High': color = 'green'; break;
          case 'Low': color = 'orange'; break;
          case 'Medium': color = 'red'; break;
          default: color = 'gray';
        }
        return <span style={{ color, fontWeight: 'bold' }}>{params.value}</span>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 65,
      renderCell: () => <MoreVert style={{ cursor: 'pointer' }} />
    },
  ];

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

      const response = await fetch('api/getlastfivemaintenacereqs', {
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
          const retryResponse = await fetch('/api/getlastfivemaintenacereqs', {
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
        const data = await fetchDataWithAuth();

        if (data && Array.isArray(data.requests)) {
          const formattedRows = data.requests.map((request, index) => ({
            id: request.deviceName || index,
            student: request.studentName,
            school: request.schoolName,
            device: request.deviceType,
            issue: request.issueDescription,
            priority: request.priority,
            avatar: request.studentAvatar || '/default-avatar.png',
          }));
          setUserRows(formattedRows);
        } else {
          console.error('Unexpected data format:', data);
          throw new Error('Invalid data format received from the API');
        }
      } catch (error) {
        console.error('Error fetching user requests:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="userList">
      <Paper sx={{ 
        width: '99.5%',
        boxShadow: 'none',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <h4 className="pendingRequest">Pending Requests</h4>
        <DataGrid
          rows={userRows}
          columns={columns}
          autoHeight
          checkboxSelection
          loading={loading}
          error={error}
          sx={{
            border: 0,
            '& .MuiDataGrid-main': {
              overflow: 'hidden !important',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden !important',
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
            },
          }}
        />
      </Paper>
    </div>
  );
}