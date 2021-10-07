import React, { useContext, useState } from 'react'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { AuthFormContext } from '../../modules/auth/auth.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { Form, Formik, FormikProps, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import FormPassword from '../../components/forms/form-password/form-password.component'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import api from '../../managers/api.manager'
import { EP_RESET_PASSWORD } from '../../enums/api.enum'
import logger from '../../managers/logger.manager'
import { toast } from '../../components/toast/toast.component'
import { serverError } from '../../pipes/server-error.pipe'
import { Routes } from '../../enums/routes.enum'
import { Redirect } from 'react-router-dom'

type PasswordType = {
  new_password: string
  confirm_new_password: string
}

const ResetPasswordForm = () => {
  const { t } = useTranslation()
  const { form } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (
    form: PasswordType,
    helper: FormikHelpers<AuthFormFieldsType>
  ) => {
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    const token = params.get('token')
    api
      .post(EP_RESET_PASSWORD, {
        email,
        token,
        password: form.new_password,
        password_confirmation: form.confirm_new_password
      })
      .then((res) => res.data)
      .then((res) => {
        logger.success('RESET PASSWORD SUCCESS', res)
        helper.setSubmitting(false)
        toast.show({ type: 'success', msg: t('alerts:reset-password-success') })
        setSubmitted(true)
      })
      .catch((e) => {
        toast.show({ type: 'error', msg: serverError(e) })
        helper.setSubmitting(false)
      })
  }
  if (submitted) return <Redirect to={Routes.LOGIN} />
  return (
    <Formik
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        new_password: Yup.string().required().min(8).password(),
        confirm_new_password: Yup.string()
          .required()
          .equals([Yup.ref('new_password')], 'passwords-not-match')
      })}
    >
      <Form>
        <FormPassword name={'new_password'} label={t('auth:new-password')} />
        <FormPassword
          name={'confirm_new_password'}
          label={t('auth:confirm-password')}
        />
        <ButtonSubmit>{t('auth:change-password')}</ButtonSubmit>
      </Form>
    </Formik>
  )
}

export default ResetPasswordForm
