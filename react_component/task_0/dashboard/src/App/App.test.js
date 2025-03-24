import React from 'react'
import { shallow } from 'enzyme'
import App from './App.js'
import Notifications from '../Notifications/Notifications.js'
import Header from '../Header/Header.js'
import Login from '../Login/Login.js'
import Footer from '../Footer/Footer.js'
import CourseList from '../CourseList/CourseList.js'

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('contains the Notifications component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Notifications)).toHaveLength(1)
  })

  it('contains the Header component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Header)).toHaveLength(1)
  })

  it('contains the Login component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Login)).toHaveLength(1)
  })

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Footer)).toHaveLength(1)
  })

  it('should not display CourseList when isLoggedIn is false', () => {
    const wrapper = shallow(<App isLoggedIn={false} />)
    expect(wrapper.find(CourseList).length).toBe(0)
  })

  describe('when isLoggedIn is true', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<App isLoggedIn={true} />)
    })

    it('should not include the Login component', () => {
      expect(wrapper.find(Login).length).toBe(0)
    })

    it('should include the CourseList component', () => {
      expect(wrapper.find(CourseList).length).toBe(1)
    })
  })
});
