import React from 'react';
import './Notifications.css';

const NotificationItems = ({ type, html, value }) => {
  return (
    <li data-notification-type={type} dangerouslySetInnerHTML={html}>{value}</li>
  );
};

export default NotificationItems;
