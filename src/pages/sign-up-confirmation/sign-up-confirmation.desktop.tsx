import React from 'react'

import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import SignUpConfirmationForm from './sign-up-confirmation.form'
import SignUpConfirmationSidebar from './sign-up-confirmation.sidebar'

const SignUpConfirmationDesktop = () => {
  return (
    <IdentityLayout sidebar={SignUpConfirmationSidebar}>
      <SignUpConfirmationForm />
    </IdentityLayout>
  )
}

export default SignUpConfirmationDesktop
