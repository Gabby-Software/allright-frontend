import { useState } from 'react'
import { Redirect } from 'react-router'

import { Routes } from '../../enums/routes.enum'
import { onlyGuest } from '../../guards/guest.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import ForgotPasswordDesktop from './forgot-password.desktop'
import ForgotPasswordMobile from './forgot-password.mobile'

const ForgotPassword = () => {
  const isMobile = useIsMobile()
  const [submitted, setSubmitted] = useState(false)
  if (submitted) return <Redirect to={Routes.FORGOT_PASSWORD_CONFIRMATION} />
  return isMobile ? (
    <ForgotPasswordMobile onSubmit={() => setSubmitted(true)} />
  ) : (
    <ForgotPasswordDesktop onSubmit={() => setSubmitted(true)} />
  )
}

export default onlyGuest(ForgotPassword)
