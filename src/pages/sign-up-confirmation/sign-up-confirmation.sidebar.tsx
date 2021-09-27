import React, { useContext } from 'react'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import config from '../../config/branding.config'
import { Routes } from '../../enums/routes.enum'
import cookieManager from '../../managers/cookie.manager'
import { AuthDataContext } from '../../modules/auth/auth-data.context'

const SignUpConfirmationSidebar = () => {
  const { t } = useTranslation()
  const { setData } = useContext(AuthDataContext)
  return (
    <>
      <IdentitySidebar.Title>{t('auth:sign-up-title')}</IdentitySidebar.Title>
      <IdentitySidebar.Subtitle>
        {t('auth:sign-up-subtitle', { name: config.name })}
      </IdentitySidebar.Subtitle>
      <IdentitySidebar.Hr />
      <IdentitySidebar.Desc>{t('auth:all-solved')}</IdentitySidebar.Desc>
      <IdentitySidebar.Link
        to={Routes.LOGIN}
        onClick={() => {
          cookieManager.removeAll()
          setData(null)
        }}
      >
        {t('auth:back-login')}
      </IdentitySidebar.Link>
    </>
  )
}

export default SignUpConfirmationSidebar
