import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';

describe('App Component', () => {
  let logOutMock;
  let wrapper;

  beforeEach(() => {
    logOutMock = jest.fn();
    wrapper = shallow(<App logOut={logOutMock} />);
  });

  test('calls logOut when Ctrl + H is pressed', () => {
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    if (event.ctrlKey && event.key === 'h') {
      document.dispatchEvent(event);
    }
    expect(logOutMock).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out" when Ctrl + H is pressed', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    if (event.ctrlKey && event.key === 'h') {
      document.dispatchEvent(event);
    }
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    window.alert.mockRestore();
  });
});
