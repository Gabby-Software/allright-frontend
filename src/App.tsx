import React, {Suspense, useContext, useEffect, useRef} from 'react';
import './App.css';
import styled from "styled-components";
import {useSeo} from "./hooks/seo.hook";
import {Switch, Route, Redirect, useLocation, useHistory} from 'react-router-dom';
import routes from "./config/routes.config";
import {AuthFormProvider} from "./modules/auth/auth.context";
import Skeleton from "./components/skeleton/skeleton.component";
import {Routes} from "./enums/routes.enum";
import Toast from "./components/toast/toast.component";
import {mainHost} from "./pipes/main-host";
import IframeManager from "./managers/iframe.manager";
import logger from "./managers/logger.manager";
import {auth} from "./managers/auth.manager";
import {AuthResponseType} from "./hooks/authorization.hook";
import {AuthDataContext} from "./modules/auth/auth-data.context";

const Styles = styled.div`
    font-family: 'Work Sans', sans-serif;
`;
function App() {
  useSeo();
  const iframe = useRef<HTMLIFrameElement>(null);
  const {setData} = useContext(AuthDataContext);
  const location = useLocation();
  const history = useHistory();
  const checkLogin = () => {
      const ifm = new IframeManager(iframe.current?.contentWindow as Window);
      logger.info('CHECK LOGIN', ifm, iframe.current?.contentWindow);
      ifm.send<AuthResponseType | null>({action: IframeManager.messages.CHECK_LOGIN})
          .then(res => {
              logger.success('CHECK LOGIN SUCCESS', res);
              auth.current = res;
              if(!res) {
                  return document.location.href = mainHost();
              }
              setData(res);
          })
  };

  return (
      <Styles>
        <Switch>
          <Redirect exact from={Routes.HOME} to={Routes.LOGIN}/>
          <Route path={routes.map(r => r.url)}>
            <AuthFormProvider>
              <Suspense fallback={<Skeleton/>}>
                {
                  routes.map(R => (
                      <Route exact path={R.url} key={R.url} {...R.props}>
                        <R.Component/>
                      </Route>
                  ))
                }
              </Suspense>
            </AuthFormProvider>
          </Route>
        </Switch>
          <Toast/>
          <iframe style={{display:'none'}} onLoad={checkLogin} src={mainHost()+'/auth'} ref={iframe} id={'login-check'}/>
      </Styles>
  );
}

export default App;
