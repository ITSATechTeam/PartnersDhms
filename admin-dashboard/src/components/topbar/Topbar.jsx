import React, { useState, useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../img/logo.png";
import "./topbar.css";

// Token management utilities
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
      body: JSON.stringify({
        refresh: refreshToken
      })
    });

    if (!response.ok) throw new Error('Token refresh failed');

    const data = await response.json();
    setStoredToken(data.access);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    window.location.href = '/';
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

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (!token) return null;

    headers.Authorization = `Bearer ${token}`;
    response = await fetch(url, { ...options, headers });
  }

  return response;
};

export default function Topbar() {
  const [input, setInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'Jude Uche', avatar: '../assets/baby.png' });

  // Fetch messages and notifications with token
  const fetchUserData = async () => {
    try {
      const [messagesResponse, notificationsResponse, profileResponse] = await Promise.all([
        fetchWithToken('/api/messages'),
        fetchWithToken('/api/notifications'),
        fetchWithToken('/api/profile')
      ]);

      if (messagesResponse?.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      }

      if (notificationsResponse?.ok) {
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData);
      }

      if (profileResponse?.ok) {
        const profileData = await profileResponse.json();
        setUserProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    
    // Refresh data periodically
    const refreshInterval = setInterval(fetchUserData, 5 * 60 * 1000); // Every 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleSearch = async (value) => {
    setInput(value);
    try {
      const response = await fetchWithToken(`/api/search?query=${encodeURIComponent(value)}`);
      if (response?.ok) {
        const searchResults = await response.json();
        // Handle search results as needed
        console.log(searchResults);
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetchWithToken('/api/logout', { method: 'POST' });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Toggle dropdowns
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMessages = () => setIsMessagesOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  return (
    <div className='topbar'>
      <div className='topbarwrapper'>
        <div className='topLeft'>
          <img src={logo} alt='Logo' className='logo' />
        </div>

        <div className='search-bar-container'>
          <div className='input-wrapper'>
            <SearchIcon className='search-icon' />
            <input
              type='text'
              placeholder='Search for students by ID or username.'
              value={input}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className='topRight'>
          <div className='topbarIconcontainer' onClick={toggleMessages}>
            <MessageIcon />
            <span className='topIconBag'>{messages.length}</span>
            {isMessagesOpen && (
              <div className='dropdown'>
                {messages.map((msg) => (
                  <div key={msg.id} className='dropdownItem'>{msg.text}</div>
                ))}
              </div>
            )}
          </div>

          <div className='topbarIconcontainer' onClick={toggleNotifications}>
            <NotificationsIcon />
            <span className='topIconBag'>{notifications.length}</span>
            {isNotificationsOpen && (
              <div className='dropdown'>
                {notifications.map((notif) => (
                  <div key={notif.id} className='dropdownItem'>{notif.text}</div>
                ))}
              </div>
            )}
          </div>

          <div className='rightRight' onClick={toggleDropdown}>
            <h3>{userProfile.name}</h3>
            <img src={userProfile.avatar} alt='Profile' className='topAvatar' />
            <ArrowDropDownIcon className='downArrow' />
            {isDropdownOpen && (
              <div className='dropdown'>
                <div className='dropdownItem'>Profile</div>
                <div className='dropdownItem'>Settings</div>
                <div className='dropdownItem' onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}