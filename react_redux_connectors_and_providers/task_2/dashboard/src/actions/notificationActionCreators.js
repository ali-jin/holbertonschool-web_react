import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';
import { bindActionCreators } from 'redux'

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

// Fonction qui lie les créateurs d'actions au dispatch
export function boundNotificationActions(dispatch) {
  return bindActionCreators(
    {
      markAsRead,
      setNotificationFilter
    },
    dispatch
  );
}
