import { Map, fromJS } from 'immutable';

import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
  NotificationTypeFilters
} from '../actions/notificationActionTypes';


const initialState = Map({
  filter: NotificationTypeFilters.DEFAULT,
  notifications: fromJS({}),
  loading: false,
});

export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      console.log("avant fromJS", action.notifications)
      const normalizedData = fromJS(action.notifications);
      console.log("messages normalizedData", normalizedData.toJS());

      const notifications = normalizedData.get('entities').get('messages');
      console.log("mes notifications", notifications.toJS());

      return state.mergeDeep({
        notifications: notifications,
        loading: false,
      });
    }

    case MARK_AS_READ:
      return state.setIn(['notifications', String(action.index), 'isRead'], true);

    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);

    case SET_LOADING_STATE:
      return state.set('loading', action.isLoading);

    default:
      return state;
  }
}

export default notificationReducer;
