import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils, css } from 'aphrodite';
import { StyleSheet } from 'aphrodite';

describe('<App />', () => {
  StyleSheetTestUtils.suppressStyleInjection();

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer).length).toBe(1);
  });

  it('should not display CourseList when isLoggedIn is false', () => {
    const wrapper = shallow(<App isLoggedIn={false} />);
    expect(wrapper.find(CourseList).length).toBe(0);
  });

  it('should display CourseList when isLoggedIn is true', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('test@test.com', 'password');
    wrapper.update();
    expect(wrapper.find(CourseList).length).toBe(1);
  });

  it('should not display the Login component when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(Login).length).toBe(0);
  });

  it('calls logOut function and displays alert when Ctrl+H is pressed', () => {
    const mockLogOut = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

    const wrapper = shallow(<App />);
    wrapper.instance().logOut = mockLogOut;
    wrapper.instance().componentDidMount();

    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(mockLogOut).toHaveBeenCalled();

    alertMock.mockRestore();
  });

  it('applies the correct footer styles', () => {
    const wrapper = shallow(<App />);
    const footer = wrapper.find('div').last();

    expect(footer.hasClass(css(StyleSheet.create({
      footer: {
        borderTop: '4px solid #cf4550',
        width: '100%',
        bottom: '0',
        left: '0',
        textAlign: 'center',
        fontSize: '20px',
        fontStyle: 'italic',
        fontFamily: 'Arial, sans-serif',
      }
    }).footer))).toBe(true);
  });

  it('applies the correct app styles', () => {
    const wrapper = shallow(<App />);
    const appDiv = wrapper.find('div').first();

    expect(appDiv.hasClass(css(StyleSheet.create({
      app: {}
    }).app))).toBe(true);
  });

  it('should have displayDrawer default to false', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    expect(instance.state.displayDrawer).toBe(false);
  });

  it('should set displayDrawer to true when handleDisplayDrawer is called', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.handleDisplayDrawer();
    expect(instance.state.displayDrawer).toBe(true);
  });

  it('should set displayDrawer to false when handleHideDrawer is called', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.handleDisplayDrawer();
    instance.handleHideDrawer();
    expect(instance.state.displayDrawer).toBe(false);
  });

  it('should remove a notification when markNotificationAsRead is called', () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'urgent', value: 'Notification 3' }
    ];

    const wrapper = shallow(<App />);
    wrapper.setState({ listNotifications: mockNotifications });
    const instance = wrapper.instance();

    instance.markNotificationAsRead(2);

    wrapper.update();
    const updatedNotifications = wrapper.state().listNotifications;

    expect(updatedNotifications).toEqual([
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 3, type: 'urgent', value: 'Notification 3' }
    ]);
  });
});
