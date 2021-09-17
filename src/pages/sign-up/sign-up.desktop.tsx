import React from 'react'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import SignUpSidebar from './sign-up.sidebar'
import SignUpForm from './sign-up.form'

const SignUpDesktop = () => {
  return (
    <IdentityLayout sidebar={SignUpSidebar}>
      <SignUpForm />
    </IdentityLayout>
  )
}

export default SignUpDesktop
