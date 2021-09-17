import React from 'react'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import ForgotPasswordForm from './forgot-password.form'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums/routes.enum'
import { SwitchState } from '../styles'

const ForgotPasswordMobile = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout
      title={t('auth:recover-password')}
      desc={t('auth:recover-password-subtitle')}
    >
      <ForgotPasswordForm onSubmit={onSubmit} />
      <SwitchState>
        {t('auth:dont-have-account')}{' '}
        <Link to={Routes.REGISTER}>{t('auth:create-account')}</Link>
      </SwitchState>
      <SwitchState>
        {t('auth:remember-password')}{' '}
        <Link to={Routes.LOGIN}>{t('auth:back-login')}</Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}

export default ForgotPasswordMobile
