import uiReducer from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  LOGIN,
  LOGOUT
} from '../actions/uiActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: null,
});

describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const state = uiReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when an unrelated action is passed', () => {
    const state = uiReducer(undefined, { type: 'SELECT_COURSE' });
    expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.toJS().isNotificationDrawerVisible).toBe(true);
  });

  it('should set isUserLoggedIn to true and set user data when LOGIN action is passed', () => {
    const user = { email: 'test@example.com' };
    const state = uiReducer(undefined, { type: LOGIN, user });

    expect(state.toJS().isUserLoggedIn).toBe(true);
    expect(state.toJS().user).toEqual(user);
  });

  it('should set isUserLoggedIn to false and user to null when LOGOUT action is passed', () => {
    const loggedInState = initialState.set('isUserLoggedIn', true).set('user', { email: 'test@example.com' });
    const state = uiReducer(loggedInState, { type: LOGOUT });

    expect(state.toJS().isUserLoggedIn).toBe(false);
    expect(state.toJS().user).toBe(null);
  });
});
