import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import logo from "../../img/DHMS_logo.png";
import "./topbar.css";
import { useSidebar } from '../sidebar/SidebarContext';

// API calling functions with improved error handling for 403 errors
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    // Handle HTTP error status codes
    if (!response.ok) {
      // For 404 Not Found, use mock data
      if (response.status === 404) {
        console.warn(`Endpoint /api/${endpoint} not found, using mock data instead`);
        return getMockData(endpoint);
      }
      
      // For 401/403, throw authentication error
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized: Please log in again');
      }
      
      throw new Error(`HTTP error ${response.status}`);
    }

    // Parse the response data
    const data = await response.json();
    
    // Check for API-level error codes in the response body
    // Some APIs return 200 OK with error details in the body
    if (data.code === 403 || (data.status && data.status !== 200)) {
      console.error(`API error in ${endpoint}:`, data);
      
      // Handle forbidden/authentication errors
      if (data.code === 403) {
        throw new Error('Session expired: Please log in again');
      }
      
      throw new Error(data.message || `Failed to fetch ${endpoint}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    
    // Check if it's an authentication error
    if (error.message.includes('Unauthorized') || 
        error.message.includes('Session expired') ||
        error.message.includes('log in again')) {
      throw error; // Re-throw authentication errors to be handled by the caller
    }
    
    // For other errors, return mock data
    console.warn(`Falling back to mock data for ${endpoint}`);
    return getMockData(endpoint);
  }
};

// Helper function to get appropriate mock data based on endpoint
const getMockData = (endpoint) => {
  if (endpoint.includes('messages')) {
    return { status: 200, data: { messages: [] } };
  } else if (endpoint.includes('notifications')) {
    return { status: 200, data: { notifications: [] } };
  } else if (endpoint.includes('getprofiledata')) {
    return { 
      status: 200, 
      data: { 
        technicianName: localStorage.getItem('userEmail') || 'User',
        avatar: '../assets/baby.png'
      } 
    };
  } else if (endpoint.includes('searchdevice')) {
    return { status: 200, data: { results: [] } };
  }
  return { status: 200, data: {} };
};

// Helper function to check token validity
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token has expiry and if it's expired
    if (payload.exp) {
      return Date.now() >= payload.exp * 1000;
    }
    
    return false;
  } catch (e) {
    console.error('Error checking token expiration:', e);
    return true; // Assume expired if we can't parse the token
  }
};

export default function Topbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [input, setInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ 
    technicianName: '', 
    avatar: '../assets/baby.png' 
  });
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error"
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const fetchUserData = async () => {
    // Check token validity before making requests
    const token = localStorage.getItem('accessToken');
    if (!token || isTokenExpired(token)) {
      handleTokenExpired();
      return;
    }
    
    try {
        // Use Promise.allSettled to handle multiple requests
        const results = await Promise.allSettled([
            fetchData('messages'),
            fetchData('notifications'),
            fetchData('getprofiledata')
        ]);

        // Process results that succeeded
        const [messagesResult, notificationsResult, profileResult] = results;
        
        if (messagesResult.status === 'fulfilled') {
            setMessages(messagesResult.value?.data?.messages || []);
        }
        
        if (notificationsResult.status === 'fulfilled') {
            setNotifications(notificationsResult.value?.data?.notifications || []);
        }
        
        if (profileResult.status === 'fulfilled') {
            setUserProfile({
                technicianName: profileResult.value?.data?.technicianName || localStorage.getItem('userEmail') || 'User',
                avatar: profileResult.value?.data?.avatar || '../assets/baby.png'
            });
        }
        
        // Check for authentication failures
        const authFailure = results.find(
          r => r.status === 'rejected' && 
          (r.reason?.message?.includes('Unauthorized') || 
           r.reason?.message?.includes('Session expired') ||
           r.reason?.message?.includes('log in again'))
        );
        
        if (authFailure) {
          throw new Error(authFailure.reason.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        
        if (error.message?.includes('Unauthorized') || 
            error.message?.includes('Session expired') ||
            error.message?.includes('log in again')) {
          handleTokenExpired();
        } else {
          setSnackbar({
              open: true,
              message: error.message || 'Failed to fetch user data',
              severity: 'error'
          });
        }
    } finally {
        setLoading(false);
    }
  };
  
  const handleTokenExpired = () => {
    // Clear tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Show message
    setSnackbar({
      open: true,
      message: "Your session has expired. Please log in again.",
      severity: "warning"
    });
    
    // Redirect to login
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  useEffect(() => {
    // Check for token before fetching
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      handleTokenExpired();
      return;
    }

    fetchUserData();
    const refreshInterval = setInterval(fetchUserData, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // Kept the dependency array as it was with the eslint comment removed

  const handleSearch = async (value) => {
    setInput(value);
    if (!value.trim()) return;

    try {
      const response = await fetchData(`searchdevice?query=${encodeURIComponent(value)}`);
      // Handle search results as needed
      console.log(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Search failed',
        severity: 'error'
      });
    }
  };

  const handleLogout = async () => {
    try {
      // Try to call the logout API
      try {
        const response = await fetch('/api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        // Parse response if available
        if (response.ok) {
          const data = await response.json();
          if (data.code === 403) {
            console.warn("Session already expired during logout");
          } else if (data.status !== 200) {
            console.warn("Logout API returned non-success status:", data);
          }
        }
      } catch (error) {
        console.warn("Logout API call failed, continuing with local logout:", error);
      }

      // Always clear tokens regardless of API success
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      
      setSnackbar({
        open: true,
        message: "Logged out successfully",
        severity: "success"
      });

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Logout error:", error);
      
      // Still clear tokens and redirect
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      
      setSnackbar({
        open: true,
        message: "Logged out with some errors",
        severity: "warning"
      });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  // Click handlers for dropdowns
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    setIsMessagesOpen(false);
    setIsNotificationsOpen(false);
  };
  
  const toggleMessages = () => {
    setIsMessagesOpen(prev => !prev);
    setIsDropdownOpen(false);
    setIsNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    setIsDropdownOpen(false);
    setIsMessagesOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen || isMessagesOpen || isNotificationsOpen) {
        if (!event.target.closest('.topbarIconcontainer') && 
            !event.target.closest('.rightRight') && 
            !event.target.closest('.dropdown')) {
          setIsDropdownOpen(false);
          setIsMessagesOpen(false);
          setIsNotificationsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isMessagesOpen, isNotificationsOpen]);

  return (
    <div className="topbar">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="topbarwrapper">
        {isMobile && (
          <MenuIcon
            className="menuButton"
            onClick={toggleSidebar}
            style={{ 
              cursor: 'pointer',
              marginRight: '10px'
            }}
          />
        )}
        
        <div className="topLeft">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="search-bar-container">
          <div className="input-wrapper">
            <SearchIcon className="search-icon" />
            <input 
              type="text"
              placeholder="Search for students by ID or username."
              value={input}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search"
            />
          </div>
        </div>

        <div className="topRight">
          <div className="topbarIconcontainer" onClick={toggleMessages}>
            <MessageIcon />
            <span className="topIconBag">
              {loading ? "..." : messages.length}
            </span>
            {isMessagesOpen && (
              <div className="dropdown">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className="dropdownItem">{msg.text}</div>
                  ))
                ) : (
                  <div className="dropdownItem">No messages</div>
                )}
              </div>
            )}
          </div>

          <div className="topbarIconcontainer" onClick={toggleNotifications}>
            <NotificationsIcon />
            <span className="topIconBag">
              {loading ? "..." : notifications.length}
            </span>
            {isNotificationsOpen && (
              <div className="dropdown">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="dropdownItem">{notif.text}</div>
                  ))
                ) : (
                  <div className="dropdownItem">No notifications</div>
                )}
              </div>
            )}
          </div>

          <div className="rightRight" onClick={toggleDropdown}>
            <h3>{loading ? "..." : userProfile.technicianName}</h3>
            <img 
              src={userProfile.avatar} 
              alt="Profile" 
              className="topAvatar"
              onError={(e) => {
                e.target.src = '../assets/baby.png';
              }}
            />
            <ArrowDropDownIcon className="downArrow" />
            {isDropdownOpen && (
              <div className="dropdown">
                <div className="dropdownItem">Profile</div>
                <div className="dropdownItem">Settings</div>
                <div className="dropdownItem" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}