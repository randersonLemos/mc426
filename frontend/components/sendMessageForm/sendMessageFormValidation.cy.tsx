import React from 'react'
import SendMessageForm from './sendMessageForm'

describe('<SendMessageForm />', () => {
  it('renders', () => {
    cy.mount(<SendMessageForm names={[]} recipients={[]} />)
  })
})
