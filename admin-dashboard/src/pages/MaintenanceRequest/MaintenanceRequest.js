// import React from "react";
// import "./MaintenanceRequest.css";
// import FilterBar from "../../components/FilterBar/FilterBar";
// import Pagination from "../../components/Pagination/Pagination";
// import TabNavigation from "../../components/TabNavigation/TabNavigation";
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { MoreVert } from '@mui/icons-material';
// import { maintenanceRows } from '../../dummyData';

// const MaintenanceRequest = () => {
//   const columns = [
    
//     { field: 'id', headerName: 'Date', sortable: false, width: 115 },
//     {
//       field: 'student',
//       headerName: 'Student Name',
//       width: 168,
//       renderCell: (params) => (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img
//             src={params.row.avatar}
//             alt='avatar'
//             style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', marginRight: 10 }}
//           />
//           <span>{params.row.student}</span>
//         </div>
//       ),
//     },
//     { field: 'school', headerName: 'School', width: 60 },
//     { field: 'device', headerName: 'Device', width: 100 },
//     { field: 'issue', headerName: 'Issue', width: 130 },
//     {
//       field: 'priority',
//       headerName: 'Priority',
//       width: 100,
//       renderCell: (params) => {
//         let color;
//         switch (params.value) {
//           case 'High':
//             color = 'dark red';
//             break;
//           case 'Low':
//             color = 'green';
//             break;
//           case 'Medium':
//             color = 'Orange';
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
//       field: 'status',
//       headerName: 'Status',
//       width: 120,
//       renderCell: (params) => {
//         const statusValue = params.value || 'Unknown';
//         return (
//           <span className={`status-badge ${statusValue.toLowerCase()}`}>
//             {statusValue}
//           </span>
//         );
//       }
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 65,
//       renderCell: () => (
//         <MoreVert style={{ cursor: 'pointer' }} />
//       )
//     },
//   ];

//   return (
//     <div className="maintenance-wrapper">
//       <div className="maintenance-text">
//         <h2>Maintenance Request</h2>
//         <p>Manage requests efficiently</p>
//       </div>
//       <div className='maintenance-request'>
//         <FilterBar />
//         <TabNavigation />
//         <Paper sx={{ width: '100%', marginTop: 2, boxShadow: 'none' }}>
//           <DataGrid
//             rows={maintenanceRows}
//             columns={columns}
//             autoHeight
//             checkboxSelection
           
//             hideFooter
//             sx={{
//               border: 0,
//               '& .MuiDataGrid-main': {
//                 overflow: 'hidden !important',
//               },
//               '& .MuiDataGrid-virtualScroller': {
//                 overflow: 'hidden !important',
//               },
//             }}
//           />
//         </Paper>
//         <Pagination />
//       </div>
//     </div>
//   );
// };

// export default MaintenanceRequest;






// import React, { useEffect, useState } from "react";
// import "./MaintenanceRequest.css";
// import FilterBar from "../../components/FilterBar/FilterBar";
// import Pagination from "../../components/Pagination/Pagination";
// import TabNavigation from "../../components/TabNavigation/TabNavigation";
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { MoreVert } from '@mui/icons-material';

// const MaintenanceRequest = () => {
//   const [maintenanceRows, setMaintenanceRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch pending maintenance requests
//   useEffect(() => {
//     const fetchMaintenanceRequests = async () => {
//       try {
//         const response = await fetch('/getpendingmaintenancereqs');
//         if (!response.ok) {
//           throw new Error('Failed to fetch maintenance requests');
//         }
//         const data = await response.json();
//         setMaintenanceRows(data); // Assuming the API response is in the correct format
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching maintenance requests:', error);
//         setLoading(false);
//       }
//     };

//     fetchMaintenanceRequests();
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'Date', sortable: false, width: 115 },
//     {
//       field: 'student',
//       headerName: 'Student Name',
//       width: 168,
//       renderCell: (params) => (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img
//             src={params.row.avatar}
//             alt='avatar'
//             style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', marginRight: 10 }}
//           />
//           <span>{params.row.student}</span>
//         </div>
//       ),
//     },
//     { field: 'school', headerName: 'School', width: 60 },
//     { field: 'device', headerName: 'Device', width: 100 },
//     { field: 'issue', headerName: 'Issue', width: 130 },
//     {
//       field: 'priority',
//       headerName: 'Priority',
//       width: 100,
//       renderCell: (params) => {
//         let color;
//         switch (params.value) {
//           case 'High':
//             color = 'dark red';
//             break;
//           case 'Low':
//             color = 'green';
//             break;
//           case 'Medium':
//             color = 'Orange';
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
//       field: 'status',
//       headerName: 'Status',
//       width: 120,
//       renderCell: (params) => {
//         const statusValue = params.value || 'Unknown';
//         return (
//           <span className={`status-badge ${statusValue.toLowerCase()}`}>
//             {statusValue}
//           </span>
//         );
//       }
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 65,
//       renderCell: () => (
//         <MoreVert style={{ cursor: 'pointer' }} />
//       )
//     },
//   ];

//   return (
//     <div className="maintenance-wrapper">
//       <div className="maintenance-text">
//         <h2>Maintenance Request</h2>
//         <p>Manage requests efficiently</p>
//       </div>
//       <div className='maintenance-request'>
//         <FilterBar />
//         <TabNavigation />
//         <Paper sx={{ width: '100%', marginTop: 2, boxShadow: 'none' }}>
//           <DataGrid
//             rows={maintenanceRows}
//             columns={columns}
//             autoHeight
//             checkboxSelection
//             hideFooter
//             loading={loading}
//             sx={{
//               border: 0,
//               '& .MuiDataGrid-main': {
//                 overflow: 'hidden !important',
//               },
//               '& .MuiDataGrid-virtualScroller': {
//                 overflow: 'hidden !important',
//               },
//             }}
//           />
//         </Paper>
//         <Pagination />
//       </div>
//     </div>
//   );
// };

// export default MaintenanceRequest;












import React, { useEffect, useState } from "react";
import "./MaintenanceRequest.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MoreVert } from '@mui/icons-material';

const API_BASE = "https://dhms.itservicedeskafrica.com";
const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMTE2MjQ3LCJpYXQiOjE3MzIxMTI2NDcsImp0aSI6IjE5MWZjN2ZmMzBjODRkZDI4YjI3N2FjMWYzNDQ4OGVhIiwidXNlcl9pZCI6NDA1LCJ1c2VybmFtZSI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.mC3YvJVkAtRGCmaoKlvOcz4WODTo6HuH27ril6tgi3Y";

const MaintenanceRequest = () => {
  const [maintenanceRows, setMaintenanceRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMaintenanceRequests = async () => {
    const endpoints = {
      pending: `https://dhms.itservicedeskafrica.com/api/getpendingmaintenancereqs`,
      completed: `https://dhms.itservicedeskafrica.com/api/getcompletedmaintenancereqs`,
      ongoing: `https://dhms.itservicedeskafrica.com/api/getongoingmaintenancereqs`,
      declined: `https://dhms.itservicedeskafrica.com/api/getdeclineddmaintenancereqs`
    };

    try {
      const responses = await Promise.all(
        Object.entries(endpoints).map(async ([status, endpoint]) => {
          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`
            }
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch ${status} maintenance requests`);
          }
          const data = await response.json();
          return { status, data: Array.isArray(data) ? data : [] }; // Ensure data is an array
        })
      );

      // Flatten the data from all responses and label each row with its status
      const allRequests = responses.flatMap(({ status, data }) =>
        data.map((row) => ({ ...row, status }))
      );

      setMaintenanceRows(allRequests);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMaintenanceRequests(); // Fetch all statuses initially
  }, []);

  if (loading) return <div>Loading...</div>;

  const columns = [
    { field: 'id', headerName: 'Date', sortable: false, width: 115 },
    {
      field: 'student',
      headerName: 'Student Name',
      width: 168,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.avatar}
            alt='avatar'
            style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', marginRight: 10 }}
          />
          <span>{params.row.student}</span>
        </div>
      ),
    },
    { field: 'school', headerName: 'School', width: 60 },
    { field: 'device', headerName: 'Device', width: 100 },
    { field: 'issue', headerName: 'Issue', width: 130 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'High':
            color = 'dark red';
            break;
          case 'Low':
            color = 'green';
            break;
          case 'Medium':
            color = 'orange';
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
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const statusValue = params.value || 'Unknown';
        return (
          <span className={`status-badge ${statusValue.toLowerCase()}`}>
            {statusValue}
          </span>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 65,
      renderCell: () => (
        <MoreVert style={{ cursor: 'pointer' }} />
      )
    },
  ];

  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-text">
        <h2>Maintenance Request</h2>
        <p>Manage requests efficiently</p>
      </div>
      <div className='maintenance-request'>
        <FilterBar />
        <TabNavigation />
        <Paper sx={{ 
    width: '90%', 
    marginTop: 2, 
    boxShadow: 'none', 
    padding: { xs: 1, sm: 2, md: 3 }, // Adjust padding for screen sizes
    borderRadius: { xs: 1, sm: 2, md: 3 }, // Adjust border-radius for smaller screens
    backgroundColor: { xs: '#f9f9f9', sm: '#fff' }, // Optional: Different background for mobile
  }}>
          <DataGrid
            rows={maintenanceRows}
            columns={columns}
            autoHeight
            checkboxSelection
            hideFooter
            loading={loading}
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
        <Pagination />
      </div>
    </div>
  );
};

export default MaintenanceRequest;

