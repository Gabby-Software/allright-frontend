import React from 'react'

import { onlyAuth } from '../../guards/auth.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import SignUpConfirmationDesktop from './sign-up-confirmation.desktop'
import SignUpConfirmationMobile from './sign-up-confirmation.mobile'

const SignUpConfirmation = () => {
  const isMobile = useIsMobile()
  return isMobile ? <SignUpConfirmationMobile /> : <SignUpConfirmationDesktop />
}

export default onlyAuth(SignUpConfirmation)
