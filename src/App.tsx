import React, {Suspense} from 'react';
import './App.css';
import styled from "styled-components";
import {useSeo} from "./hooks/seo.hook";
import {Switch, Route} from 'react-router-dom';
import routes from "./config/routes.config";
import {AuthFormProvider} from "./modules/auth/auth.context";
import Skeleton from "./components/skeleton/skeleton.component";

const Styles = styled.div`
    font-family: 'Work Sans', sans-serif;
`;
function App() {
  useSeo();
  return (
      <Styles>
        <Switch>
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
      </Styles>
  );
}

export default App;
