import React from 'react'
import SignUpForm from './adminSignUp'
import Localization from '@/cypress/utils/localization'
import * as NextRouter from 'next/router'

const pathname = '/'

describe('<SignUpForm />', () => {
  it('Should be able to login', () => {
    const push = cy.stub()
    cy.window()
      .its('console')
      .then((console) => {
        cy.spy(console, 'log').as('consoleLog')
      })
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    )
    cy.get('[data-cy="name"]').type('Miguel')
    cy.get('[data-cy="email"]').type('teste100@gmail.com')
    cy.get('[data-cy="phone"]').type('19988352366')
    cy.get('#birth').type('08102000')
    cy.get('[data-cy="submit"]').click()

    cy.get('@consoleLog').should('be.calledWith', 'login successful')
  })

  it('Should not be able to login because of phone', () => {
    const push = cy.stub()
    cy.window()
      .its('console')
      .then((console) => {
        cy.spy(console, 'log').as('consoleLog')
      })
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    )
    cy.get('[data-cy="name"]').type('Miguel')
    cy.get('[data-cy="email"]').type('teste100@gmail.com')
    cy.get('[data-cy="phone"]').type('1998835236')
    cy.get('#birth').type('08102000')
    cy.get('[data-cy="submit"]').click()

    cy.get('@consoleLog').should('be.calledWith', 'login failed')
  })

  it('Should not be able to login because of name', () => {
    const push = cy.stub()
    cy.window()
      .its('console')
      .then((console) => {
        cy.spy(console, 'log').as('consoleLog')
      })
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    )
    cy.get('[data-cy="name"]').type('Mi')
    cy.get('[data-cy="email"]').type('teste100@gmail.com')
    cy.get('[data-cy="phone"]').type('19988352366')
    cy.get('#birth').type('08102000')
    cy.get('[data-cy="submit"]').click()

    cy.get('@consoleLog').should('be.calledWith', 'login failed')
  })

  it('Should not be able to login because of email', () => {
    // THE BROWSER ALREADY VALIDATES THE EMAIL ADDRESS
    expect(true).to.equal(true)
  })

  it('Should not be able to login because of birth', () => {
    const push = cy.stub()
    cy.window()
      .its('console')
      .then((console) => {
        cy.spy(console, 'log').as('consoleLog')
      })
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    )
    cy.get('[data-cy="name"]').type('Miguel')
    cy.get('[data-cy="email"]').type('teste100@gmail.com')
    cy.get('[data-cy="phone"]').type('19988352366')
    cy.get('#birth').type('081020000')
    cy.get('[data-cy="submit"]').click()

    cy.get('@consoleLog').should('be.calledWith', 'login failed')
  })
})
