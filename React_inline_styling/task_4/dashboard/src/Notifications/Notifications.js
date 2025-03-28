import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends React.Component {
  static propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.arrayOf(NotificationItemShape)
  }

  static defaultProps = {
    displayDrawer: false,
    listNotifications: []
  }

  markAsRead = id => {
    console.log(`Notification ${id} has been marked as read`)
  }

  handleClose = () => {
    console.log('Close button has been clicked')
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    )
  }

  render() {
    const { displayDrawer, listNotifications } = this.props
    return (
      <>
        {!displayDrawer && (
          <div className={css(styles.menuItem)}>
            <p>Your notifications</p>
          </div>
        )}
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <button
              className={css(styles.closeBtn)}
              aria-label="Close"
              onClick={this.handleClose}
            >
              x
            </button>
            <p>Here is the list of notifications</p>
            {listNotifications.length === 0 ? (
              <NotificationItem
                type="default"
                value="No new notification for now"
              />
            ) : (
              <ul>
                {listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={this.markAsRead}
                    id={notification.id}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </>
    )
  }
}

const opacityFrames = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 }
}

const bounceFrames = {
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-5px)' },
  '100%': { transform: 'translateY(5px)' }
}

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    border: 'dashed #cf4550 2px',
    padding: '10px',
    width: '30%',
    right: '1rem',
    top: '4rem',
    '@media (max-width: 900px)': {
      inset: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      padding: 0,
      backgroundColor: 'white'
    }
  },
  ul: {
    '@media (max-width: 900px)': {
      display: 'flex',
      justifyContent: 'right',
      padding: 0,
      listStyle: 'none',
      fontSize: '20px'
    }
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'right',
    padding: '5px',
    marginRight: '10px',
    cursor: 'pointer',
    animationName: [bounceFrames, opacityFrames],
    animationDuration: '0.3s, 0.3s',
    animationIterationCount: '3, 3',
    animationTimingFunction: 'ease-in-out, ease-in-out',
    animationFillMode: 'forwards, forwards'
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      top: 0,
      right: '.5rem'
    }
  }
});

export default Notifications;
