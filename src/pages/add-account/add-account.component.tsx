import React, { useContext } from 'react'
import { onlyActive } from '../../guards/active.guard'
import { useWindowSize } from '../../hooks/window-size.hook'
import AddAccountProvider, {
  AddAccountContext,
  AddAccountSteps
} from './add-account.context'
import AddAccountMobile from './add-account.mobile'
import AddAccountDesktop from './add-account.desktop'
import AddAccountOnboard from '../add-account-onboard/add-account-onboard.component'

const AddAccountContent = () => {
  const { width } = useWindowSize()
  const { step } = useContext(AddAccountContext)
  if (step === AddAccountSteps.SELECT_TYPE)
    return width < 1200 ? <AddAccountMobile /> : <AddAccountDesktop />
  return <AddAccountOnboard />
}
const AddAccount = () => (
  <AddAccountProvider>
    <AddAccountContent />
  </AddAccountProvider>
)

export default onlyActive(AddAccount)
