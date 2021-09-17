import React, { useState, useEffect, useContext } from 'react'
import { onlyGuest } from '../../guards/guest.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import ResetPasswordMobile from './reset-password.mobile'
import ResetPasswordDesktop from './reset-password.desktop'

const ResetPassword = () => {
  const isMobile = useIsMobile()
  return isMobile ? <ResetPasswordMobile /> : <ResetPasswordDesktop />
}

export default onlyGuest(ResetPassword)
