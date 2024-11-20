import React, { useState, useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../img/logo.png";
import "./topbar.css";

export default function Topbar() {
  const [input, setInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Mock data fetching for messages and notifications
  useEffect(() => {
    // Replace these with real API calls as needed
    setMessages([{ id: 1, text: "New message from Alice" }, { id: 2, text: "Meeting reminder" }]);
    setNotifications([{ id: 1, text: "Assignment due" }, { id: 2, text: "New grade posted" }]);
  }, []);

  const fetchData = (value) => {
    fetch("...") // Add actual API URL here
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
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
              onChange={(e) => handleChange(e.target.value)}
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
            <h3>Jude Uche</h3>
            <img src='../assets/baby.png' alt='Profile' className='topAvatar' />
            <ArrowDropDownIcon className='downArrow' />
            {isDropdownOpen && (
              <div className='dropdown'>
                <div className='dropdownItem'>Profile</div>
                <div className='dropdownItem'>Settings</div>
                <div className='dropdownItem'>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

