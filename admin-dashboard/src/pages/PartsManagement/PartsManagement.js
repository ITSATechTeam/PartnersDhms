import React from "react";
import "./PartsManagement.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { MoreVert } from '@mui/icons-material';

// Replace maintenanceRows with partsRows data
const partsRows = [
  { 
    id: '8 Feb 2020', 
    Parts: 'Keyboard', 
    Quantity: '1', 
    'Unit Cost (N)': '12,000', 
    'Total (N)': '24,000', 
    status: 'Approved', 
    action: ':'
  },
  { 
    id: '22 Oct 2020', 
    Parts: 'Motherboard', 
    Quantity: '3', 
    'Unit Cost (N)': '80,000', 
    'Total (N)': '240,000', 
    status: 'pending', 
    action: ':'
  },
  { 
    id: '24 May 2020', 
    Parts: 'Battery', 
    Quantity: '6', 
    'Unit Cost (N)': '10,000', 
    'Total (N)': '24,000', 
    status: 'pending', 
    action: ':'
  },
  { 
    id: '9 Sept 2020', 
    Parts: 'Keyboard', 
    Quantity: '8', 
    'Unit Cost (N)': '12,000', 
    'Total (N)': '24,000', 
    status: 'Approved', 
    action: ':'
  },
  { 
    id: '9 Sept 2020', 
    Parts: 'Screen', 
    Quantity: '2', 
    'Unit Cost (N)': '160,000', 
    'Total (N)': '320,000', 
    status: 'Approved', 
    action: ':'
  },
  { 
    id: '8 Sept 2020', 
    Parts: 'Screen', 
    Quantity: '4', 
    'Unit Cost (N)': '30,000', 
    'Total (N)': '60,000', 
    status: 'pending', 
    action: ':'
  },
];

const Parts = () => {
  const columns = [
    { field: 'id', headerName: 'Date', sortable: false, width: 115 },
    { field: 'Parts', headerName: 'Part', width: 150 },
    { field: 'Quantity', headerName: 'Quantity', width: 100 },
    { field: 'Unit Cost (N)', headerName: 'Unit Cost (N)', width: 130 },
    { field: 'Total (N)', headerName: 'Total (N)', width: 130 },
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
        <h2>Parts Management</h2>
        <p>Manage and track parts used for repairs</p>
      </div>
      <div className='maintenance-request'>
        <FilterBar />
        <Paper sx={{ width: '100%', marginTop: 2, boxShadow: 'none' }}>
          <DataGrid
            rows={partsRows}
            columns={columns}
            autoHeight
            checkboxSelection
         
            hideFooter
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

export default Parts;
