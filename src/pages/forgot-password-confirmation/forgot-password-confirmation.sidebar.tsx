import React from 'react'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Routes } from '../../enums/routes.enum'

const ForgotPasswordConfirmationSidebar = () => {
  const { t } = useTranslation()
  return (
    <>
      <IdentitySidebar.Title>{t('auth:fpc-title')}</IdentitySidebar.Title>
      <IdentitySidebar.Subtitle>
        {t('auth:fpc-subtitle')}
      </IdentitySidebar.Subtitle>
      <IdentitySidebar.Hr />
      <IdentitySidebar.Desc>{t('auth:all-solved')}</IdentitySidebar.Desc>
      <IdentitySidebar.Link to={Routes.LOGIN}>
        {t('auth:back-login')}
      </IdentitySidebar.Link>
    </>
  )
}

export default ForgotPasswordConfirmationSidebar
