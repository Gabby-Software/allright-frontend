import React from 'react'

import { onlyGuest } from '../../guards/guest.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import LoginDesktop from './login.desktop'
import LoginMobile from './login.mobile'

const Login = () => {
  const isMobile = useIsMobile()
  return isMobile ? <LoginMobile /> : <LoginDesktop />
}

export default onlyGuest(Login)
