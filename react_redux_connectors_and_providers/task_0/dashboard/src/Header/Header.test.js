import React from 'react';
import { mount } from 'enzyme'; // Use 'mount' for full rendering
import Header from '../Header/Header';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext';

// Suppression of style injection for the tests
StyleSheetTestUtils.suppressStyleInjection();

describe('<Header />', () => {
  let user, logOutMock;

  beforeEach(() => {
    // Set up mock user and logout function
    user = {
      email: 'test@example.com',
      isLoggedIn: true,
    };
    logOutMock = jest.fn();
  });

  it('renders without crashing', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an <img> tag with correct src and alt attributes', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const img = wrapper.find('img');
    expect(img).toHaveLength(1);
    expect(img.prop('src')).toEqual(logo);
    expect(img.prop('alt')).toEqual('logo');
  });

  it('renders an <h1> tag with correct text', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const h1 = wrapper.find('h1');
    expect(h1).toHaveLength(1);
    expect(h1.text()).toEqual('School dashboard');
  });

  it('renders the logout section when user is logged in', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(1);
    expect(logoutSection.text()).toContain('Welcome test@example.com');
  });

  // New Test: Verify logoutSection is not created when user is not logged in
  it('does not render the logout section when user is not logged in', () => {
    const contextValue = { user: { isLoggedIn: false }, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(0); // logoutSection should not exist
  });

  // New Test: Verify logoutSection is created when user is logged in with an email
  it('renders the logout section when user is logged in and email is set', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(1); // logoutSection should exist
    expect(logoutSection.text()).toContain('Welcome test@example.com'); // Verify email
  });

  // New Test: Verify clicking the logout link calls the logOut function (spy)
  it('calls logOut function when logout link is clicked', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutLink = wrapper.find('a').at(0);
    expect(logoutLink.text()).toEqual('Logout'); // Verify it's the correct link

    // Simulate clicking the logout link
    logoutLink.simulate('click');

    // Verify that the logOut function (spy) was called
    expect(logOutMock).toHaveBeenCalled();
  });
});
