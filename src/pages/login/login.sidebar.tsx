import React from 'react'

import { Routes } from '../../enums/routes.enum'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'

const LoginSidebar = () => {
  const { t } = useTranslation()
  return (
    <>
      <IdentitySidebar.Title>{t('auth:sign-in-title')}</IdentitySidebar.Title>
      <IdentitySidebar.Subtitle>
        {t('auth:sign-in-subtitle')}
      </IdentitySidebar.Subtitle>
      <IdentitySidebar.Hr />
      <IdentitySidebar.Desc>{t('auth:dont-have-account')}</IdentitySidebar.Desc>
      <IdentitySidebar.Link to={Routes.REGISTER}>
        {t('auth:create-account')}
      </IdentitySidebar.Link>
    </>
  )
}
export default LoginSidebar
