import React from 'react'

import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import ForgotPasswordForm from './forgot-password.form'
import ForgotPasswordSidebar from './forgot-password.sidebar'

const ForgotPasswordDesktop = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <IdentityLayout sidebar={ForgotPasswordSidebar}>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </IdentityLayout>
  )
}

export default ForgotPasswordDesktop
