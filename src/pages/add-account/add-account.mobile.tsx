import React, { useContext } from 'react'

// import brand from '../../config/branding.config'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
// import { mainHost } from '../../pipes/main-host'
// import { SwitchState } from '../styles'
import AddAccountForm from './add-account.form'

const AddAccountMobile = () => {
  const { t } = useTranslation()
  const { data } = useContext(AuthDataContext)
  return (
    <IdentityMobileLayout
      title={`Hello ${data?.user?.first_name}`}
      desc={t('auth:add-account.desc')}
    >
      <AddAccountForm />
      {/* <SwitchState>
        <a href={mainHost()}>{t('back-home', { name: brand.name })}</a>
      </SwitchState> */}
    </IdentityMobileLayout>
  )
}

export default AddAccountMobile
