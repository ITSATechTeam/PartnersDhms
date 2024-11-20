import React, { useState } from 'react';
import './TabNavigation.css';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-navigation">
      <div
        className={`tab-item ${activeTab === 'All' ? 'active' : ''}`}
        onClick={() => handleTabClick('All')}
      >
        All
      </div>
      <div
        className={`tab-item ${activeTab === 'Pending' ? 'active' : ''}`}
        onClick={() => handleTabClick('Pending')}
      >
        Pending
      </div>
      <div
        className={`tab-item ${activeTab === 'Approved' ? 'active' : ''}`}
        onClick={() => handleTabClick('Approved')}
      >
        Approved
      </div>
      <div className="underline" style={{ left: `${activeTab === 'All' ? 0 : activeTab === 'Pending' ? 100 : 200}px` }}></div>
    </div>
  );
};

export default TabNavigation;
