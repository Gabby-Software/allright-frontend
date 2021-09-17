import React from 'react'
import { onlyGuest } from '../../guards/guest.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import LoginMobile from './login.mobile'
import LoginDesktop from './login.desktop'

const Login = () => {
  const isMobile = useIsMobile()
  return isMobile ? <LoginMobile /> : <LoginDesktop />
}

export default onlyGuest(Login)
