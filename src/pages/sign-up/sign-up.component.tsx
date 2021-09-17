import React, { useState, useEffect, useContext, useRef } from 'react'
import { onlyGuest } from '../../guards/guest.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import SignUpMobile from './sign-up.mobile'
import SignUpDesktop from './sign-up.desktop'

const SignUp = () => {
  const isMobile = useIsMobile()
  return isMobile ? <SignUpMobile /> : <SignUpDesktop />
}

export default onlyGuest(SignUp)
