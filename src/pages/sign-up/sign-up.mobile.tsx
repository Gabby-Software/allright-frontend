import React from 'react'
import { Link } from 'react-router-dom'

import brand from '../../config/branding.config'
import { Routes } from '../../enums/routes.enum'
import { isEatRight } from '../../utils/domains'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { SwitchState } from '../styles'
import SignUpForm from './sign-up.form'


const SignUpMobile = () => {
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout
      title={t('auth:sign-up-title')}
      desc={t(
        isEatRight()
          ? 'auth:sign-up-subtitle-eatright'
          : 'auth:sign-up-subtitle',
        { name: brand.name }
      )}
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
