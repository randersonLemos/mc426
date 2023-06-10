import React from 'react'
import SendMessageForm from './sendMessageForm'

describe('<SendMessageForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SendMessageForm names={[]} recipients={[]} />)
  })
})