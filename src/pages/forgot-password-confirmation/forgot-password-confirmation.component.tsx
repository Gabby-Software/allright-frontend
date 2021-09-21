import React, { useState, useEffect, useContext } from 'react'
import Styles, { Logo, Wrapper, ResendEmail } from '../styles'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { AuthFormContext } from '../../modules/auth/auth.context'
import { AuthFormTypeNotNull } from '../../modules/auth/auth-form.type'
import { Redirect } from 'react-router-dom'
import { Routes } from '../../enums/routes.enum'
import { onlyGuest } from '../../guards/guest.guard'
import Back from '../styles/back/back.component'
import api, { handleError } from '../../managers/api.manager'
import { EP_SEND_RESET_PASSWORD } from '../../enums/api.enum'
import logger from '../../managers/logger.manager'
import { toast } from '../../components/toast/toast.component'
import { serverError } from '../../pipes/server-error.pipe'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import ForgotPasswordConfirmationMobile from './forgot-password-confirmation.mobile'
import ForgotPasswordConfirmationDesktop from './forgot-password-confirmation.desktop'

const ForgotPasswordConfirmation = () => {
  const isMobile = useIsMobile()
  return isMobile ? (
    <ForgotPasswordConfirmationMobile />
  ) : (
    <ForgotPasswordConfirmationDesktop />
  )
}

export default onlyGuest(ForgotPasswordConfirmation)
