import React, { useContext } from 'react'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { mainHost } from '../../pipes/main-host'
import { ReactComponent as BackIcon } from '../../assets/media/icons/back-arrow.svg'
import brand from '../../config/branding.config'

const AddAccountSidebar = () => {
  const { t } = useTranslation()
  const { data } = useContext(AuthDataContext)
  return (
    <>
      <IdentitySidebar.Title>
        Hello {data?.user?.first_name}
      </IdentitySidebar.Title>
      <IdentitySidebar.Subtitle>
        {t('auth:add-account.desc')}
      </IdentitySidebar.Subtitle>
      <IdentitySidebar.Hr />
      <IdentitySidebar.ExtLink href={mainHost()}>
        <BackIcon />
        <span>{t('back-home', { name: brand.name })}</span>
      </IdentitySidebar.ExtLink>
    </>
  )
}

export default AddAccountSidebar
