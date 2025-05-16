import React from 'react'
import { shallow } from 'enzyme'
import { StyleSheetTestUtils } from 'aphrodite'
import BodySection from './BodySection'

describe('BodySection Component', () => {
  beforeAll(() => {
    // Suppression de l'injection de style Aphrodite pour les tests
    StyleSheetTestUtils.suppressStyleInjection()
  })

  afterAll(() => {
    // Réactivation de l'injection de style après les tests
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
  })

  it('should render correctly with the given title and children', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    )

    // Check that there is one h2 element and it includes the text "test title"
    expect(wrapper.find('h2').length).toBe(1)
    expect(wrapper.find('h2').text()).toBe('test title')

    // Check that there is one p element and it includes the text "test children node"
    expect(wrapper.find('p').length).toBe(1)
    expect(wrapper.find('p').text()).toBe('test children node')
  })

  it('should apply the correct style to the div', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    )

    // Vérification que le style Aphrodite est appliqué
    expect(wrapper.find('div').prop('className')).toContain('bodySection');
  })

  it('matches the snapshot', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    )

    // Snapshot testing
    expect(wrapper).toMatchSnapshot()
  })
})
