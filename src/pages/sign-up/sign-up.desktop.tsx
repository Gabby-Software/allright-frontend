import React from 'react'

import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import SignUpForm from './sign-up.form'
import SignUpSidebar from './sign-up.sidebar'

const SignUpDesktop = () => {
  return (
    <IdentityLayout sidebar={SignUpSidebar}>
      <SignUpForm />
    </IdentityLayout>
  )
}

export default SignUpDesktop
