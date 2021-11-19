import './App.css'

import React, { Suspense, useContext, useEffect, useRef } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom'
import styled from 'styled-components'

import Skeleton from './components/skeleton/skeleton.component'
import Toast from './components/toast/toast.component'
import routes from './config/routes.config'
import { Routes } from './enums/routes.enum'
import { AuthResponseType, useAuthorization } from './hooks/authorization.hook'
import { useSeo } from './hooks/seo.hook'
import { auth } from './managers/auth.manager'
import cookieManager from './managers/cookie.manager'
import IframeManager from './managers/iframe.manager'
import logger from './managers/logger.manager'
import { AuthFormProvider } from './modules/auth/auth.context'
import { AuthDataContext } from './modules/auth/auth-data.context'
import PageNotFound from './pages/page-not-found/page-not-found.component'
import { mainHost } from './pipes/main-host'
import useReferral from './hooks/ui/useReferral'

const Styles = styled.div`
  font-family: 'Work Sans', sans-serif;
`
function App() {
  useSeo()
  useReferral()
  useAuthorization()
  return (
    <Styles>
      <Switch>
        <Redirect exact from={Routes.HOME} to={Routes.LOGIN} />
        <Route path={routes.map((r) => r.url)}>
          <AuthFormProvider>
            <Suspense fallback={<Skeleton />}>
              {routes.map((R) => (
                <Route exact path={R.url} key={R.url} {...R.props}>
                  <R.Component />
                </Route>
              ))}
            </Suspense>
          </AuthFormProvider>
        </Route>
        <Route path={'/'}>
          <PageNotFound />
        </Route>
      </Switch>
      <Toast />
      {/*<iframe style={{display:'none'}} onLoad={checkLogin} src={mainHost()+'/auth'} ref={iframe} id={'login-check'}/>*/}
    </Styles>
  )
}

export default App
