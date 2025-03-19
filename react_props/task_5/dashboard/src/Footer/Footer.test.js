import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';


describe('<Footer />', () => {
  it('renders an <Footer /> component', () => {
    const wrapper = shallow(<Footer isIndex={true}/>);
    expect(wrapper).toHaveLength(1);
  });

  it('renders ', () => {
    const wrapper = shallow(<Footer isIndex={true}/>);
    const p = wrapper.find('p');
    expect(p).toHaveLength(1);
    expect(p.text()).toContain('Copyright');
  });
});
