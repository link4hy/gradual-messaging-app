import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  channels?: string[];
  users?: string[];
}

const channelImages = [
  '/img/1.png',
  '/img/2.png',
  '/img/3.png',
];

// Array of image URLs for users
const userImages = [
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
];

const Sidebar: React.FC<SidebarProps> = ({ channels, users }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar sidebar-left" >
        <ul className="sidebar-list">
          <li className="sidebar-item">Engage</li>
        </ul>
        <ul className="sidebar-list">
          {channels && channels.length > 0 ? (
            channels.map((channel, index) => (
              <li key={index} className="sidebar-item" >
                <div>
                  <img
                    src={channelImages[index % channelImages.length]}
                    alt={`Channel ${index + 1}`}
                    className="sidebar-item-image"
                  />
                  <span className="sidebar-item-text">{channel}</span>
                </div>
              </li>
            ))
          ) : (
            <li className="sidebar-item">No channels available</li>
          )}
        </ul>
      </div>
      <div className="sidebar sidebar-right" >
        <ul className="sidebar-list">
          <li className="sidebar-item-search">

            <div className="input-container">

              <div className="wrapper">
                <input type="text" placeholder='           Search' />

                <div className="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul className="sidebar-list">
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <li key={index} className="sidebar-item">
                <div>
                  <img
                    src={userImages[index % userImages.length]}
                    alt={`User ${index + 1}`}
                    className="sidebar-item-image"
                  />
                  <div className="user-info">
                    <div>
                      <span className="sidebar-item-text">{user}</span>
                      <span className='time'>18:00</span>
                    </div>
                    <div className="message-latest">Hello!!</div>
                  </div>

                </div>

              </li>
            ))
          ) : (
            <li className="sidebar-item">No users online</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
