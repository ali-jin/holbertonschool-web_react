import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header/Header'
import logo from '../assets/holberton-logo.jpg'
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext';
StyleSheetTestUtils.suppressStyleInjection();

describe('<Header />', () => {
  let user, logOutMock;

  beforeEach(() => {
    user = {
      isLoggedIn: true,
      email: 'test@test.com'
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
    const img = wrapper.find('img')
    expect(img).toHaveLength(1)
    expect(img.prop('src')).toEqual(logo)
    expect(img.prop('alt')).toEqual('logo')
  })

  it('renders an <h1> tag with correct text', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const h1 = wrapper.find('h1')
    expect(h1).toHaveLength(1)
    expect(h1.text()).toEqual('School dashboard')
  })

  it('renders the logout section when user is logged in', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(1);
    expect(logoutSection.text()).toContain('Welcome test@test.com');
  });

  it('does not render the logout section when user is not logged in', () => {
    const contextValue = { user: { isLoggedIn: false }, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(0);
  });

  it('renders the logout section when user is logged in and email is set', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = wrapper.find('#logoutSection');
    expect(logoutSection).toHaveLength(1);
    expect(logoutSection.text()).toContain('Welcome test@test.com');
  });

  it('calls logOut function when logout link is clicked', () => {
    const contextValue = { user, logOut: logOutMock };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const logoutLink = wrapper.find('a').at(0);
    expect(logoutLink.text()).toEqual('Logout');

    logoutLink.simulate('click');

    expect(logOutMock).toHaveBeenCalled();
  });
})
