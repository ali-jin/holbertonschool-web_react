import { MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';
import { bindActionCreators } from 'redux';
import { notificationsNormalizer } from '../schema/notifications';

// Action creator for marking a notification as read
export function markAsRead(index) {
  return {
    type: MARK_AS_READ,
    index,
  };
}

// Action creator for setting the notification filter
export function setNotificationFilter(filter) {
  return {
    type: SET_TYPE_FILTER,
    filter,
  };
}

// Action creator for setting the loading state
export function setLoadingState(isLoading) {
  return {
    type: SET_LOADING_STATE,
    isLoading,
  };
}

// Action creator for setting notifications
export function setNotifications(notifications) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

// Action creator for fetching notifications
export function fetchNotifications() {
  return (dispatch) => {
    dispatch(setLoadingState(true));

    fetch('/notifications.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("ma data brute:", data)
        const normalizedData = notificationsNormalizer(data);
        console.log("ma data normalisé", normalizedData)
        dispatch(setNotifications(normalizedData));
        dispatch(setLoadingState(false));
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        dispatch(setLoadingState(false));
      });
  };
}

export function boundNotificationActions(dispatch) {
  return bindActionCreators(
    {
      markAsRead,
      setNotificationFilter,
      setLoadingState,
      setNotifications,
      fetchNotifications,
    },
    dispatch
  );
}
