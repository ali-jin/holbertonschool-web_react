import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'
import AppContext from '../App/AppContext';

jest.mock('../utils/utils', () => ({
  getFullYear: jest.fn(() => 2024),
  getFooterCopy: jest.fn(() => 'Holberton School')
}))

describe('Footer Component', () => {
  it('should render without crashing', () => {
    shallow(
      <AppContext.Provider value={{ user: { isLoggedIn: true } }}>
        <Footer isIndex={true} />
      </AppContext.Provider>
    )
  })

  it('should render the text "Copyright"', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: { isLoggedIn: true } }}>
        <Footer isIndex={true} />
      </AppContext.Provider>
    )
    expect(wrapper.find('footer').text()).toContain('Copyright')
  })

  it('should not render the "Contact us" link when the user is logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: { isLoggedIn: false } }}>
        <Footer isIndex={true} />
      </AppContext.Provider>
    );
    expect(wrapper.find('a[href="/contact"]').exists()).toBe(false);
  });

  it('should render the "Contact us" link when the user is logged in', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: { isLoggedIn: true } }}>
        <Footer isIndex={true} />
      </AppContext.Provider>
    );
    expect(wrapper.find('a[href="/contact"]').exists()).toBe(true);
  });
})
