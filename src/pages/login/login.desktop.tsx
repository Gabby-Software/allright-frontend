import React from 'react'

import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import LoginForm from './login.form'
import LoginSidebar from './login.sidebar'

const LoginDesktop = () => {
  return (
    <IdentityLayout sidebar={LoginSidebar}>
      <LoginForm />
    </IdentityLayout>
  )
}

export default LoginDesktop
