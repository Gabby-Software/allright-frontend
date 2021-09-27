import React from 'react'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import SignUpForm from './sign-up.form'
import { SwitchState, Wrapper } from '../styles'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums/routes.enum'
import brand from '../../config/branding.config'

const SignUpMobile = () => {
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout
      title={t('auth:sign-up-title')}
      desc={t('auth:sign-up-subtitle', { name: brand.name })}
    >
      <SignUpForm />
      <SwitchState>
        {t('auth:have-account')}{' '}
        <Link to={Routes.LOGIN}>{t('auth:sign-in')}</Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}

export default SignUpMobile
