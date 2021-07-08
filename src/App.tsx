import React, {Suspense, useEffect, useRef} from 'react';
import './App.css';
import styled from "styled-components";
import {useSeo} from "./hooks/seo.hook";
import {Switch, Route, Redirect} from 'react-router-dom';
import routes from "./config/routes.config";
import {AuthFormProvider} from "./modules/auth/auth.context";
import Skeleton from "./components/skeleton/skeleton.component";
import {Routes} from "./enums/routes.enum";
import Toast from "./components/toast/toast.component";
import {mainHost} from "./pipes/main-host";
import IframeManager from "./managers/iframe.manager";
import logger from "./managers/logger.manager";

const Styles = styled.div`
    font-family: 'Work Sans', sans-serif;
`;
function App() {
  useSeo();
  const iframe = useRef<HTMLIFrameElement>(null);
  const checkLogin = () => {
      const ifm = new IframeManager(iframe.current?.contentWindow as Window);
      logger.info('CHECK LOGIN', ifm, iframe.current?.contentWindow);
      ifm.send({action: IframeManager.messages.CHECK_LOGIN})
          .then(res => {
              logger.success('CHECK LOGIN SUCCESS', res);
              if(res) {
                  document.location.href = mainHost();
              }
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
