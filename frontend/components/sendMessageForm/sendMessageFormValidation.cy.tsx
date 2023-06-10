import React from 'react'
import SendMessageForm from './sendMessageForm'

describe('<SendMessageForm />', () => {
  it('renders', () => {
    // cy.window()
      // .its('console')
      // .then((console) => {
      //  cy.spy(console, 'log').as('consoleLog')
      // })
    cy.mount(<SendMessageForm names={[]} recipients={[]} />)
    // cy.get('[data-cy="message"]').type('Essa eh uma mensagem de teste')
    // cy.get('[data-cy="submit"]').click()

    // cy.get('@consoleLog').should('be.calledWith', '{status: ok}')
  })
})
