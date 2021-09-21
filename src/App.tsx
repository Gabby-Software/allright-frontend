import React, { Suspense, useContext, useEffect, useRef } from 'react'
import './App.css'
import styled from 'styled-components'
import { useSeo } from './hooks/seo.hook'
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory
} from 'react-router-dom'
import routes from './config/routes.config'
import { AuthFormProvider } from './modules/auth/auth.context'
import Skeleton from './components/skeleton/skeleton.component'
import { Routes } from './enums/routes.enum'
import Toast from './components/toast/toast.component'
import { mainHost } from './pipes/main-host'
import IframeManager from './managers/iframe.manager'
import logger from './managers/logger.manager'
import { auth } from './managers/auth.manager'
import { AuthResponseType, useAuthorization } from './hooks/authorization.hook'
import { AuthDataContext } from './modules/auth/auth-data.context'
import cookieManager from './managers/cookie.manager'
import PageNotFound from './pages/page-not-found/page-not-found.component'

const Styles = styled.div`
  font-family: 'Work Sans', sans-serif;
`
function App() {
  useSeo()
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
