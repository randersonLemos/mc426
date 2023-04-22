import { AppRouterContext } from 'next/dist/shared/lib/app-router-context'
import { NextRouter } from 'next/router'

const createRouter = (params: Partial<NextRouter>) => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  back: cy.spy().as('back'),
  beforePopState: cy.spy().as('beforePopState'),
  forward: cy.spy().as('forward'),
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('push'),
  reload: cy.spy().as('reload'),
  refresh: cy.spy().as('refresh'),
  replace: cy.spy().as('replace'),
  events: {
    emit: cy.spy().as('emit'),
    off: cy.spy().as('off'),
    on: cy.spy().as('on'),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...params,
})

interface MockRouterProps extends Partial<NextRouter> {
  children: React.ReactNode
}

const MockRouter = ({ children, ...props }: MockRouterProps) => {
  const router: any = createRouter(props)
  
  return <AppRouterContext.Provider value={router}>{children}</AppRouterContext.Provider>
}

export default MockRouter
