import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header/Header';


describe('<Header />', () => {
  it('renders an <Header /> component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders an <img> component', () => {
    const wrapper = shallow(<Header />);
    const img = wrapper.find('img');
    expect(img).toHaveLength(1);
    expect(img.prop('src')).toEqual(logo);
    expect(img.prop('alt')).toEqual('logo');
  });

  it('renders an <h1> component', () => {
    const wrapper = shallow(<Header />);
    const h1 = wrapper.find('h1');
    expect(h1).toHaveLength(1);
    expect(h1.text()).toEqual('School dashboard');
  });
});
