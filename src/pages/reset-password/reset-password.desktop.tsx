import React from 'react'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import ResetPasswordSidebar from './reset-password.sidebar'
import ResetPasswordForm from './reset-password.form'

const ResetPasswordDesktop = () => {
  return (
    <IdentityLayout sidebar={ResetPasswordSidebar}>
      <ResetPasswordForm />
    </IdentityLayout>
  )
}

export default ResetPasswordDesktop
