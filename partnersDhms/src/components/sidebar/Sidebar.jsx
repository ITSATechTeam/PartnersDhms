import './sidebar.css';
import QrCodeIcon from '@mui/icons-material/QrCode';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react'; // Added useState here
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSidebar } from './SidebarContext';

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const narrowSidebarRoutes = ['/MaintenanceRequest', '/anotherPage', '/otherPage'];
  const isNarrowSidebar = narrowSidebarRoutes.includes(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar on mobile after clicking a link
    }
  };

  return (
    <div className={`sidebar ${isNarrowSidebar ? 'sidebar-narrow' : ''} ${isSidebarOpen ? 'open' : ''}`}>
      {isMobile && isSidebarOpen && (
        <IconButton 
          className="closeSidebarButton"
          onClick={() => setIsSidebarOpen(false)}
          sx={{ 
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: 'white'
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      
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
    
  );
}

export default Sidebar;
