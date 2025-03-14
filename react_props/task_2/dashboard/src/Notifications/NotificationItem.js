import React from "react";

function NotificationItem({ type, value, html }) {
  return (
    <li data-notification-type={type}>
      {/* Only set dangerouslySetInnerHTML if 'html' is provided */}
      {html ? (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        value
      )}
    </li>
  );
}

export default NotificationItem
