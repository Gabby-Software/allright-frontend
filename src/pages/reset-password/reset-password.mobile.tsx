import React from 'react'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import ResetPasswordForm from './reset-password.form'
import { SwitchState } from '../styles'
import { Routes } from '../../enums/routes.enum'
import { Link } from 'react-router-dom'

const ResetPasswordMobile = () => {
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout title={t('auth:reset-password')} desc={''}>
      <ResetPasswordForm />
      <SwitchState>
        <span>{t('auth:all-solved')}</span>
        <Link to={Routes.LOGIN}>{t('auth:back-login')}</Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}

export default ResetPasswordMobile
