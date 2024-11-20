import './sidebar.css';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu'; // Material UI icon for menu
import IconButton from '@mui/material/IconButton'; // Material UI button
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'; // Import useMediaQuery for responsive handling

function Sidebar() {
  const location = useLocation(); // Get the current location
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect if the screen size is mobile (768px and below)

  // Define routes that need a narrower sidebar width
  const narrowSidebarRoutes = ['/MaintenanceRequest', '/anotherPage', '/otherPage'];
  const isNarrowSidebar = narrowSidebarRoutes.includes(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Button to toggle sidebar on mobile */}
      {isMobile && (
      
      
          <MenuIcon     className="menuButton" 
          onClick={toggleSidebar} 
          style={{ display: isSidebarOpen ? 'none' : 'block' }} // Hide when sidebar is open
        ></MenuIcon>
      
      )}

      <div className={`sidebar ${isNarrowSidebar ? 'sidebar-narrow' : ''} ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <ul className="sidebarList">
              <li className={`sidebarListItem ${activeLink === '/dashboard' ? 'active' : ''}`}>
                <a href="/dashboard" className="sidebarLink" onClick={() => handleClick('/dashboard')}>
                  <QrCodeIcon className='sidebarIcon' /> Dashboard
                </a>
              </li>
              <li className={`sidebarListItem ${activeLink === '/MaintenanceRequest' ? 'active' : ''}`}>
                <a href="/MaintenanceRequest" className="sidebarLink" onClick={() => handleClick('/MaintenanceRequest')}>
                  <DynamicFeedIcon className='sidebarIcon' /> Maintenance Request
                </a>
              </li>
              <li className={`sidebarListItem ${activeLink === '/PartsManagement' ? 'active' : ''}`}>
                <a href="/PartsManagement" className="sidebarLink" onClick={() => handleClick('/PartsManagement')}>
                  <BuildIcon className='sidebarIcon' /> Parts Management
                </a>
              </li>
              <li className={`sidebarListItem ${activeLink === '/wallet' ? 'active' : ''}`}>
                <a href="/wallet" className="sidebarLink" onClick={() => handleClick('/wallet')}>
                  <AccountBalanceWalletIcon className='sidebarIcon' /> Wallet
                </a>
              </li>
              <li className={`sidebarListItem ${activeLink === '/analytics' ? 'active' : ''}`}>
                <a href="/analytics" className="sidebarLink" onClick={() => handleClick('/analytics')}>
                  <BarChartIcon className='sidebarIcon' /> Analytics
                </a>
              </li>
              <li className={`sidebarListItem ${activeLink === '/help' ? 'active' : ''}`}>
                <a href="/help" className="sidebarLink" onClick={() => handleClick('/help')}>
                  <HelpIcon className='sidebarIcon' /> Help and support
                </a>
              </li>
              <li className={`sidebarListItem ${activeLink === '/settings' ? 'active' : ''}`}>
                <a href="/settings" className="sidebarLink" onClick={() => handleClick('/settings')}>
                  <SettingsIcon className='sidebarIcon' /> Settings
                </a>
              </li>
              <li className={`sidebarListItem logOut ${activeLink === '/logout' ? 'active' : ''}`}>
                <a href="/logout" className="sidebarLink" onClick={() => handleClick('/logout')}>
                  <LogoutIcon className='sidebarIcon' /> Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
