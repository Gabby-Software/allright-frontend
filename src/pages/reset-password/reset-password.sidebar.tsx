import React from 'react'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Routes } from '../../enums/routes.enum'

const ResetPasswordSidebar = () => {
  const { t } = useTranslation()
  return (
    <>
      <IdentitySidebar.Title>{t('auth:reset-password')}</IdentitySidebar.Title>
      <IdentitySidebar.Hr />
      <IdentitySidebar.Desc>{t('auth:all-solved')}</IdentitySidebar.Desc>
      <IdentitySidebar.Link to={Routes.LOGIN}>
        {t('auth:back-login')}
      </IdentitySidebar.Link>
    </>
  )
}

export default ResetPasswordSidebar
