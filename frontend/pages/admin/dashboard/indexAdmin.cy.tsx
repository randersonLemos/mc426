import React from 'react'
import Admin from './index'
import * as NextRouter from 'next/router'

const pathname = "/admin/dashboard"

describe('<Admin />', () => {
  it('renders', () => {
    const push = cy.stub()
    // see: https://on.cypress.io/mounting-react
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    cy.mount(
      <Admin setActiveTheme={(value) => value} />
    )
  })
})