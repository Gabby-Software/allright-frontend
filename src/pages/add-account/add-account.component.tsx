import React, { useContext } from 'react'

import { onlyActive } from '../../guards/active.guard'
import { useWindowSize } from '../../hooks/window-size.hook'
import AddAccountOnboard from '../add-account-onboard/add-account-onboard.component'
import AddAccountProvider, {
  AddAccountContext,
  AddAccountSteps
} from './add-account.context'
import AddAccountDesktop from './add-account.desktop'
import AddAccountMobile from './add-account.mobile'

const AddAccountContent = () => {
  const { width } = useWindowSize()
  const { step } = useContext(AddAccountContext)

  if (step === AddAccountSteps.SELECT_TYPE) {
    return width < 1200 ? <AddAccountMobile /> : <AddAccountDesktop />
  }

  return <AddAccountOnboard />
}

const AddAccount = () => (
  <AddAccountProvider>
    <AddAccountContent />
  </AddAccountProvider>
)

export default onlyActive(AddAccount)
