import React from 'react'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import SignUpConfirmationSidebar from './sign-up-confirmation.sidebar'
import SignUpConfirmationForm from './sign-up-confirmation.form'

const SignUpConfirmationDesktop = () => {
  return (
    <IdentityLayout sidebar={SignUpConfirmationSidebar}>
      <SignUpConfirmationForm />
    </IdentityLayout>
  )
}

export default SignUpConfirmationDesktop
