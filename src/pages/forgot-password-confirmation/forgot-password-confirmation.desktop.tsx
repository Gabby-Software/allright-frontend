import React from 'react'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import ForgotPasswordConfirmationForm from './forgot-password-confirmation.form'
import ForgotPasswordConfirmationSidebar from './forgot-password-confirmation.sidebar'

const ForgotPasswordConfirmationDesktop = () => {
  return (
    <IdentityLayout sidebar={ForgotPasswordConfirmationSidebar}>
      <ForgotPasswordConfirmationForm />
    </IdentityLayout>
  )
}

export default ForgotPasswordConfirmationDesktop
