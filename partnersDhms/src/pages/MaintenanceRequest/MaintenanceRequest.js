import React, { useEffect, useState } from "react";
import "./MaintenanceRequest.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MoreVert } from '@mui/icons-material';

// Token management
const getStoredToken = () => localStorage.getItem('accessToken');
const setStoredToken = (token) => localStorage.setItem('accessToken', token);
const getStoredRefreshToken = () => localStorage.getItem('refreshToken');

const refreshAccessToken = async () => {
  try {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch('/api/refreshtoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken })
    });

    if (!response.ok) throw new Error('Token refresh failed');

    const data = await response.json();
    setStoredToken(data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    localStorage.clear(); // Clear all auth data
    window.location.href = '/'; // Redirect to login page
    return null;
  }
};

const fetchWithToken = async (url, options = {}) => {
  let token = getStoredToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    console.warn(`Unauthorized request to ${url}, trying token refresh...`);
    
    token = await refreshAccessToken();
    if (!token) return null;

    headers.Authorization = `Bearer ${token}`;
    response = await fetch(url, { ...options, headers });
  }

  return response;
};

const MaintenanceRequest = () => {
  const [maintenanceRows, setMaintenanceRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllMaintenanceRequests = async () => {
    const endpoints = {
      pending: `/api/getpendingmaintenancereqs`,
      completed: `/api/getcompletedmaintenancereqs`,
      ongoing: `/api/getongoingmaintenancereqs`,
      declined: `/api/getdeclinedmaintenancereqs`
    };

    try {
      const responses = await Promise.all(
        Object.entries(endpoints).map(async ([status, endpoint]) => {
          const response = await fetchWithToken(endpoint);
          
          if (!response || !response.ok) {
            const errorData = await response?.json();
            throw new Error(`Failed to fetch ${status} maintenance requests: ${errorData?.detail || 'Unknown error'}`);
          }
          
          const data = await response.json();
          return { status, data: Array.isArray(data) ? data : [] };
        })
      );

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
    fetchAllMaintenanceRequests();
    
    const refreshInterval = setInterval(fetchAllMaintenanceRequests, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(refreshInterval);
  }, []);

  const columns = [
    { field: 'id', headerName: 'Date', width: 115 },
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
            onError={(e) => (e.target.src = '../assets/baby.png')}
          />
          <span>{params.row.student}</span>
        </div>
      ),
    },
    { field: 'school', headerName: 'School', width: 100 },
    { field: 'device', headerName: 'Device', width: 100 },
    { field: 'issue', headerName: 'Issue', width: 150 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'High':
            color = 'darkred';
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
        return <span style={{ color, fontWeight: 'bold' }}>{params.value}</span>;
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span className={`status-badge ${params.value?.toLowerCase() || 'unknown'}`}>
          {params.value || 'Unknown'}
        </span>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 65,
      renderCell: () => <MoreVert style={{ cursor: 'pointer' }} />
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-text">
        <h2>Maintenance Requests</h2>
        <p>Manage requests efficiently</p>
      </div>
      <div className='maintenance-request'>
        <FilterBar />
        <TabNavigation />
        <Paper sx={{ 
          width: '90%', 
          marginTop: 2, 
          boxShadow: 'none', 
          padding: { xs: 1, sm: 2, md: 3 },
          borderRadius: { xs: 1, sm: 2, md: 3 },
          backgroundColor: { xs: '#f9f9f9', sm: '#fff' },
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
              '& .MuiDataGrid-main': { overflow: 'hidden !important' },
              '& .MuiDataGrid-virtualScroller': { overflow: 'hidden !important' },
            }}
          />
        </Paper>
        <Pagination />
      </div>
    </div>
  );
};

export default MaintenanceRequest;
