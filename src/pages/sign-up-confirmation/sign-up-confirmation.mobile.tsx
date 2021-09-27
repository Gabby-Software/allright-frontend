import React, { useContext } from 'react'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import SignUpConfirmationForm from './sign-up-confirmation.form'
import { Link } from 'react-router-dom'
import { SwitchState } from '../styles'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Routes } from '../../enums/routes.enum'
import config from '../../config/branding.config'
import cookieManager from '../../managers/cookie.manager'
import { AuthDataContext } from '../../modules/auth/auth-data.context'

const SignUpConfirmationMobile = () => {
  const { t } = useTranslation()
  const { setData } = useContext(AuthDataContext)
  return (
    <IdentityMobileLayout
      title={t('auth:sign-up-title')}
      desc={t('auth:sign-up-subtitle', { name: config.name })}
    >
      <SignUpConfirmationForm />
      <SwitchState>
        <div>{t('auth:all-solved')}</div>
        <Link
          to={Routes.LOGIN}
          onClick={() => {
            cookieManager.removeAll()
            setData(null)
          }}
        >
          {t('auth:back-login')}
        </Link>
      </SwitchState>
    </IdentityMobileLayout>
  )
}
export default SignUpConfirmationMobile
