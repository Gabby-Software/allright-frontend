import React from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '../../enums/routes.enum'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { SwitchState } from '../styles'
import LoginForm from './login.form'

const LoginMobile = () => {
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout
      title={t('auth:sign-in-title')}
      desc={t('auth:sign-in-subtitle')}
    >
      <LoginForm />
      <SwitchState>
        {t('auth:dont-have-account')}{' '}
        <Link to={Routes.REGISTER}>{t('auth:create-account')}</Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}

export default LoginMobile
