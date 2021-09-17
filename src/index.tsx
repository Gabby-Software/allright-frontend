import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import './config/validation.config'
import 'antd/dist/antd.css'
import { I18nProvider } from './modules/i18n/i18n.context'
import { ThemeProvider } from 'styled-components'
import theme from './assets/styles'
import { BrowserRouter } from 'react-router-dom'
import {
  AuthDataContext,
  AuthDataProvider
} from './modules/auth/auth-data.context'
import qa from './managers/qa.manager'
window.QA = qa

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthDataProvider>
            <App />
          </AuthDataProvider>
        </BrowserRouter>
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
