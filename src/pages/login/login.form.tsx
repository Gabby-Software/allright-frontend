import { Form, Formik, FormikHelpers } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import Cookies from 'js-cookie'

// import AuthLink from '../../components/auth-link/auth-liks.component'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import FormPassword from '../../components/forms/form-password/form-password.component'
import { EP_LOGIN } from '../../enums/api.enum'
// import { Routes } from '../../enums/routes.enum'
import { AuthResponseType } from '../../hooks/authorization.hook'
import api, { handleError } from '../../managers/api.manager'
import { auth } from '../../managers/auth.manager'
import cookieManager from '../../managers/cookie.manager'
import { AuthFormContext } from '../../modules/auth/auth.context'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { mainHost } from '../../pipes/main-host'
import { unblockCookies } from '../../utils/cookie'
import { ForgetPassword, MobileStickyBottom } from '../styles'
import { isEatRight } from '../../utils/domains'

type LoginDataType = {
  type: string
  email: string
  password: string
}
const LoginForm = () => {
  const { setData } = useContext(AuthDataContext)
  const { t } = useTranslation()
  const { form, update } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const searchParams = new URLSearchParams(location.search)

  const handleSubmit = (
    form: LoginDataType,
    helper: FormikHelpers<AuthFormFieldsType>
  ) => {
    const { email, password } = form
    const session = searchParams.get('session_id') || ''
    api
      .post<AuthResponseType>(EP_LOGIN, { email, password, session })
      .then((res) => res.data)
      .then((res) => {
        cookieManager.set('access_token', res.access_token, res.expires_in)
        // cookieManager.set('auth', JSON.stringify(res.user), res.expires_in, false)

        // Temporarily solution to prevent exceeding 4096KB limit for auth cookie
        const expiry = res.expires_in || (24 * 60 * 60)
        const d: Date = new Date()
        d.setTime(d.getTime() + expiry * 1000)
        Cookies.set('auth', JSON.stringify(res.user), { path: '/', expires: d, domain: document.location.hostname.split('.').slice(1).join('.') })

        if (res.user.email_verified_at) {
          unblockCookies()
          if (isEatRight() && searchParams.get('from_checkout')) {
            document.location.href = `${mainHost()}/plans/1/edit?from_checkout=true`
          } else {
            document.location.href = mainHost()
          }
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
          <FormInputLabeled
            name={'email'}
            label={t('auth:email')}
            onUpdate={update}
          />
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

          {/* <AuthLink
            linkText={t('auth:create-account')}
            message={t('auth:dont-have-account')}
            url={Routes.REGISTER}
          /> */}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
