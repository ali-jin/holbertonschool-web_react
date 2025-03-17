import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';


describe('<Login />', () => {
  it('renders an <Login /> component', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders two input components and two label compenents', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('label').length).toBe(2);
  });
});
