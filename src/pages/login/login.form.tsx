import React, { useContext } from 'react'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { AuthFormContext } from '../../modules/auth/auth.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { Form, Formik, FormikHelpers } from 'formik'
import logger from '../../managers/logger.manager'
import api, { handleError } from '../../managers/api.manager'
import { AuthResponseType } from '../../hooks/authorization.hook'
import { EP_LOGIN } from '../../enums/api.enum'
import cookieManager from '../../managers/cookie.manager'
import { mainHost } from '../../pipes/main-host'
import { auth } from '../../managers/auth.manager'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import FormPassword from '../../components/forms/form-password/form-password.component'
import { ForgetPassword, MobileStickyBottom } from '../styles'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import * as Yup from 'yup'

type LoginDataType = {
  type: string
  email: string
  password: string
}
const LoginForm = () => {
  const { setData } = useContext(AuthDataContext)
  const { t } = useTranslation()
  const { form, update } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const handleSubmit = (
    form: LoginDataType,
    helper: FormikHelpers<AuthFormFieldsType>
  ) => {
    logger.info('submitting login', form)
    const { type, email, password } = form
    api
      .post<AuthResponseType>(EP_LOGIN, { email, password })
      .then((res) => res.data)
      .then((res) => {
        console.log('SETTING COOKIE 5')
        cookieManager.set('access_token', res.access_token, res.expires_in)
        cookieManager.set('auth', JSON.stringify(res.user), res.expires_in)
        if (res.user.email_verified_at) {
          document.location.href = mainHost()
        } else {
          auth.current = res
          setData(res)
        }
      })
      .catch(handleError(helper))
  }
  return (
    <Formik
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        type: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
      })}
    >
      {() => (
        <Form>
          {/*<FormSwitch name={'type'} options={userTypeOptions} onUpdate={update}/>*/}
          <FormInputLabeled name={'email'} label={'Email'} onUpdate={update} />
          <FormPassword
            name={'password'}
            label={'Password'}
            onUpdate={update}
          />
          <ForgetPassword to={'/forgot-password'}>
            {t('auth:forgot-password')}
          </ForgetPassword>
          <MobileStickyBottom>
            <ButtonSubmit>{t('auth:sign-in')}</ButtonSubmit>
          </MobileStickyBottom>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
