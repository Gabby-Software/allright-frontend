import React, { useState, useEffect, useContext } from 'react'
import Styles, { Wrapper, Logo } from '../styles'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { AuthFormContext } from '../../modules/auth/auth.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import * as Yup from 'yup'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import { Redirect } from 'react-router'
import { Routes } from '../../enums/routes.enum'
import { onlyGuest } from '../../guards/guest.guard'
import Back from '../styles/back/back.component'
import api, { handleError } from '../../managers/api.manager'
import { EP_SEND_RESET_PASSWORD } from '../../enums/api.enum'
import { toast } from '../../components/toast/toast.component'
import logger from '../../managers/logger.manager'
import ForgotPasswordForm from './forgot-password.form'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import ForgotPasswordMobile from './forgot-password.mobile'
import ForgotPasswordDesktop from './forgot-password.desktop'

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
