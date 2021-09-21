import React from 'react'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import ForgotPasswordConfirmationForm from './forgot-password-confirmation.form'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums/routes.enum'
import { SwitchState } from '../styles'

const ForgotPasswordConfirmationMobile = () => {
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout
      title={t('auth:fpc-title')}
      desc={t('auth:fpc-subtitle')}
    >
      <ForgotPasswordConfirmationForm />
      <SwitchState>
        <div>{t('auth:all-solved')}</div>
        <Link to={Routes.LOGIN}>{t('auth:back-login')}</Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}

export default ForgotPasswordConfirmationMobile
