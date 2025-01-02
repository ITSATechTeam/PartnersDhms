import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MoreVert } from '@mui/icons-material';
import { userRows } from '../../dummyData';
import './users.css';

export default function Users() {
  const columns = [
    { field: 'id', headerName: 'Device Name', sortable: false, width: 115 },
    {
      field: 'student',
      headerName: 'Student Name',
      width: 168,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={params.row.avatar}
              alt='avatar'
              style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span>{params.row.student}</span>
          </div>
        );
      },
    },
    { field: 'school', headerName: 'School', type: 'String', sortable: false, width: 80 },
    { field: 'device', headerName: 'Device', type: 'String', sortable: false, width: 150 },
    { field: 'issue', headerName: 'Issue', description: 'This column has a value getter and is not sortable.', sortable: false, width: 130 },
    {
      field: 'priority',
      headerName: 'Priority',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 90,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'High':
            color = 'green';
            break;
          case 'Low':
            color = 'orange';
            break;
          case 'Medium':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return (
          <span style={{ color, fontWeight: 'bold' }}>
            {params.value}
          </span>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 65,
      renderCell: (params) => {
        return (
          <MoreVert
            style={{ cursor: 'pointer' }}
          />
        );
      }
    },
  ];

  return (
    <div className='userList'>
     <Paper 
  sx={{ 
    width: { xs: '122%', sm: '88%', md: '99.5%' }, // Responsive widths
    
    
  }}
>

        <h4 className='pendingRequest'>Pending Requests</h4>
        <DataGrid
          rows={userRows}
          columns={columns}
          autoHeight  // Automatically adjusts height to show all rows
          checkboxSelection
          sx={{
            border: 0,
            '& .MuiDataGrid-main': {
              overflow: 'hidden !important',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden !important',
            },
          }}
        />
      </Paper>
    </div>
  );
}




// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { MoreVert } from '@mui/icons-material';
// import './users.css';

// export default function Users() {
//   const [userRows, setUserRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Columns for the DataGrid
//   const columns = [
//     { field: 'id', headerName: 'Device Name', sortable: false, width: 115 },
//     {
//       field: 'student',
//       headerName: 'Student Name',
//       width: 168,
//       renderCell: (params) => (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img
//             src={params.row.avatar}
//             alt="avatar"
//             style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
//           />
//           <span>{params.row.student}</span>
//         </div>
//       ),
//     },
//     { field: 'school', headerName: 'School', width: 80 },
//     { field: 'device', headerName: 'Device', width: 150 },
//     { field: 'issue', headerName: 'Issue', sortable: false, width: 130 },
//     {
//       field: 'priority',
//       headerName: 'Priority',
//       width: 90,
//       renderCell: (params) => {
//         let color;
//         switch (params.value) {
//           case 'High': color = 'green'; break;
//           case 'Low': color = 'orange'; break;
//           case 'Medium': color = 'red'; break;
//           default: color = 'gray';
//         }
//         return <span style={{ color, fontWeight: 'bold' }}>{params.value}</span>;
//       }
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 65,
//       renderCell: () => <MoreVert style={{ cursor: 'pointer' }} />
//     },
//   ];

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://dhms.itservicedeskafrica.com/api/getlastfivemaintenacereqs', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMTIwNTQwLCJpYXQiOjE3MzIxMTY5NDAsImp0aSI6ImY3M2MzOGQyZjAwMTRlNWM4N2U1ZWE4YWRkNWFjNzNmIiwidXNlcl9pZCI6NDA1LCJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.7VnzYkItr4c576htE0AA1Kevr-huMMiEGMwwM4IoTOQ`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();

//       if (data && Array.isArray(data.requests)) {
//         const formattedRows = data.requests.map((request, index) => ({
//           id: request.deviceName || index,
//           student: request.studentName,
//           school: request.schoolName,
//           device: request.deviceType,
//           issue: request.issueDescription,
//           priority: request.priority,
//           avatar: request.studentAvatar || '/default-avatar.png',
//         }));
//         setUserRows(formattedRows);
//       } else {
//         console.error('Unexpected data format:', data);  // Log the unexpected format for debugging
//         throw new Error('Invalid data format received from the API');
//       }
//     } catch (error) {
//       console.error('Error fetching user requests:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="userList">
//       <Paper sx={{ width: '99.5%' }}>
//         <h4 className="pendingRequest">Pending Requests</h4>
//         <DataGrid
//           rows={userRows}
//           columns={columns}
//           autoHeight
//           checkboxSelection
//           loading={loading}
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
