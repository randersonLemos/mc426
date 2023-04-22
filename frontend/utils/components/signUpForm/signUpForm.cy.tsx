import React from 'react'
import SignUpForm from './signUpForm'
import Localization from '@/cypress/utils/localization'
import * as NextRouter from 'next/router'

const pathname = '/'

describe('<SignUpForm />', () => {
  it('renders', () => {
    const push = cy.stub()
    cy.stub(NextRouter, 'useRouter').returns({ pathname, push })
    // see: https://on.cypress.io/mounting-react

    // <MockRouter asPath="/">
    // </MockRouter>
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    )
  })
})
