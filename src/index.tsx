import './index.css'
import './config/validation.config'
import 'antd/dist/antd.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import qa from './managers/qa.manager'
import { AuthDataProvider } from './modules/auth/auth-data.context'
import { I18nProvider } from './modules/i18n/i18n.context'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import ThemeProvider from './components/theme-provider/theme-provider.component'

window.QA = qa

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <AuthDataProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthDataProvider>
      </BrowserRouter>
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
