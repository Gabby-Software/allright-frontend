import React from 'react'

import { Routes } from '../../enums/routes.enum'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { isEatRight } from '../../utils/domains'

const SignUpSidebar = () => {
  const { t } = useTranslation()
  return (
    <>
      <IdentitySidebar.Title>{t('auth:sign-up-title')}</IdentitySidebar.Title>
      <IdentitySidebar.Subtitle>
        {t(
          isEatRight()
          ? 'auth:sign-up-subtitle-eatright'
            : 'auth:sign-up-subtitle'
        )}
      </IdentitySidebar.Subtitle>
      <IdentitySidebar.Hr />
      <IdentitySidebar.Desc>{t('auth:have-account')}</IdentitySidebar.Desc>
      <IdentitySidebar.Link to={Routes.LOGIN}>
        {t('auth:sign-in')}
      </IdentitySidebar.Link>
    </>
  )
}

export default SignUpSidebar
