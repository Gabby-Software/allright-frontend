import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import config from '../../config/branding.config'
import { Routes } from '../../enums/routes.enum'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import cookieManager from '../../managers/cookie.manager'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { SwitchState } from '../styles'
import SignUpConfirmationForm from './sign-up-confirmation.form'
import { isEatRight } from '../../utils/domains'

const SignUpConfirmationMobile = () => {
  const { t } = useTranslation()
  const { setData } = useContext(AuthDataContext)
  return (
    <IdentityMobileLayout
      title={t('auth:sign-up-title')}
      desc={t(
        isEatRight()
        ? 'auth:sign-up-subtitle-eatright'
          : 'auth:sign-up-subtitle', { name: config.name })}
    >
      <SignUpConfirmationForm />
      <SwitchState back>
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
