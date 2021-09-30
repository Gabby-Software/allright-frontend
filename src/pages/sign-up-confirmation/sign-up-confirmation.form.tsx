import { Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'

import { ConfirmedIcon } from '../../assets/media/icons'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import FormButton from '../../components/forms/form-button/form-button.component'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import FormRow from '../../components/forms/form-row/form-row.component'
import { toast } from '../../components/toast/toast.component'
import {
  EP_UPDATE_PROFILE_CUSTOM,
  EP_VERIFY_EMAIL_RESEND
} from '../../enums/api.enum'
// import { Routes } from '../../enums/routes.enum'
import { AuthResponseType } from '../../hooks/authorization.hook'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import api from '../../managers/api.manager'
import { AccountObjType } from '../../modules/auth/account.type'
import { AuthFormContext } from '../../modules/auth/auth.context'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { serverError } from '../../pipes/server-error.pipe'
import { SwitchState } from '../styles'
import Styles from './sign-up-confirmation.styles'

const SignUpConfirmationForm = () => {
  const { t } = useTranslation()
  const { form, update } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const { data, setData } = useContext(AuthDataContext)
  const [isChangingEmail, setIsChangingEmail] = useState(false)
  const resendEmail = () => {
    api
      .post(EP_VERIFY_EMAIL_RESEND)
      .then(() =>
        toast.show({
          type: 'success',
          msg: t('alerts:resend-verification-success')
        })
      )
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
  }
  const changeEmail = ({ email }: AuthFormFieldsType) => {
    api
      .put<{ data: AccountObjType }>(EP_UPDATE_PROFILE_CUSTOM, {
        user: { email }
      })
      .then((res) => res.data.data)
      .then((user) => setData({ ...(data as AuthResponseType), user }))
      // .then(resendEmail)
      .then(() =>
        toast.show({ type: 'success', msg: t('alerts:update-email-success') })
      )
      .then(() => setIsChangingEmail(false))
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
  }
  return (
    <Styles>
      <ConfirmedIcon />
      <h2 className={'confirm__title'}>{t('auth:sign-up-confirm-title')}</h2>
      <p className={'confirm__desc'}>{t('auth:sign-up-confirm-subtitle')}</p>
      {isChangingEmail ? (
        <Formik
          initialValues={form}
          onSubmit={changeEmail}
          validationSchema={Yup.object({
            email: Yup.string().required().email()
          })}
        >
          {(form) => (
            <Form>
              <FormInputLabeled
                name={'email'}
                label={'Email'}
                onUpdate={update}
              />
              <div className="confirm__buttons-wrapper">
                <FormButton
                  type={'default'}
                  // type="ghost"
                  className="confirm__cancel-btn"
                  onClick={() => {
                    form.resetForm()
                    setIsChangingEmail(false)
                  }}
                >
                  {t('cancel')}
                </FormButton>
                <ButtonSubmit>{t('submit')}</ButtonSubmit>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <SwitchState>
            <span>{t('auth:not-received')}</span>
            <a onClick={resendEmail}>{t('auth:send-again')}</a>
          </SwitchState>
          <SwitchState>
            <span>{t('auth:change-email-label')}</span>
            <a
              onClick={() => {
                setIsChangingEmail(true)
              }}
            >
              {t('auth:change-email')}
            </a>
          </SwitchState>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IdentitySidebar.Hr width={'100px'} spaced />
          </div>
        </>
      )}
    </Styles>
  )
}

export default SignUpConfirmationForm
