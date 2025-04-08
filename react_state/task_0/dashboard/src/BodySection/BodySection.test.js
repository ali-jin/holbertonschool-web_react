import React from 'react'
import { shallow } from 'enzyme'
import { StyleSheetTestUtils } from 'aphrodite'
import BodySection from './BodySection'

describe('BodySection Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection()
  })

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
  })

  it('should render correctly with the given title and children', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    )

    expect(wrapper.find('h2').length).toBe(1)
    expect(wrapper.find('h2').text()).toBe('test title')

    expect(wrapper.find('p').length).toBe(1)
    expect(wrapper.find('p').text()).toBe('test children node')
  })

  it('should apply the correct style to the div', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    )

    expect(wrapper.find('div').prop('className')).toContain('bodySection');
  })

  it('matches the snapshot', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    )

    expect(wrapper).toMatchSnapshot()
  })
})