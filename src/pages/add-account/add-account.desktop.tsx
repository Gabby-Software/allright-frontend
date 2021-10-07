import React from 'react'

import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import AddAccountForm from './add-account.form'
import AddAccountSidebar from './add-account-sidebar'

const AddAccountDesktop = () => {
  return (
    <IdentityLayout sidebar={AddAccountSidebar} w={'720px'}>
      <AddAccountForm />
    </IdentityLayout>
  )
}
export default AddAccountDesktop
