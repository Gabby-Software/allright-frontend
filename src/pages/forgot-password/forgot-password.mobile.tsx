import React from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '../../enums/routes.enum'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { SwitchState } from '../styles'
import ForgotPasswordForm from './forgot-password.form'

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
        <Link className={'black__link'} to={Routes.LOGIN}>{t('auth:back-login')}</Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}

export default ForgotPasswordMobile
