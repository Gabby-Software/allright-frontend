import React from 'react'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { Routes } from '../../enums/routes.enum'
import LoginForm from './login.form'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import LoginSidebar from './login.sidebar'

const LoginDesktop = () => {
  const { t } = useTranslation()
  return (
    <IdentityLayout sidebar={LoginSidebar}>
      <LoginForm />
    </IdentityLayout>
  )
}

export default LoginDesktop
