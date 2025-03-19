import React from "react";
import PropTypes from "prop-types";
import './Notifications.css';

function NotificationItem({ type, value, html }) {
  if (html && typeof html === 'object' && '__html' in html) {
    return <li data-notification-type={type} dangerouslySetInnerHTML={html} />;
  }

  return <li data-notification-type={type}>{value}</li>;
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string.isRequired
  })
}

NotificationItem.defaultProps = {
  type: 'default',
  value: '',
  html: null
}

export default NotificationItem
