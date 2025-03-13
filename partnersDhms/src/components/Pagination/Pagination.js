import React from 'react';
import './Pagination.css';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const Pagination = () => {
  return (
    <div className="pagination">
      <button className="page-button">
        <ArrowBack className="pagination-icon" />
        Previous
      </button>
      <div className="page-numbers">
        <span className="page-number">1</span>
        <span className="page-number">2</span>
        ...
        <span className="page-number">4</span>
      </div>
      <button className="page-button">
        Next
        <ArrowForward className="pagination-icon" />
      </button>
    </div>
  );
};

export default Pagination;

        