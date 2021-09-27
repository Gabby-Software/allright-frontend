import React, { useContext } from 'react'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { AuthFormContext } from '../../modules/auth/auth.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import api, { handleError } from '../../managers/api.manager'
import { EP_SEND_RESET_PASSWORD } from '../../enums/api.enum'
import logger from '../../managers/logger.manager'
import { toast } from '../../components/toast/toast.component'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import { FormDesc } from '../styles'
type EmailType = { email: string }

const ForgotPasswordForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation()
  const { form, update } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const handleSubmit = (
    { email }: EmailType,
    helper: FormikHelpers<AuthFormFieldsType>
  ) => {
    api
      .post(EP_SEND_RESET_PASSWORD, { email })
      .then((res) => {
        toast.show({ type: 'success', msg: 'Reset password sent' })
        helper.setSubmitting(false)
        onSubmit()
      })
      .catch(handleError(helper))
  }
  return (
    <Formik
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        email: Yup.string().required().email()
      })}
    >
      {(form: FormikProps<EmailType>) => (
        <Form>
          <FormDesc>{t('auth:recover-password-desc')}</FormDesc>
          <FormInputLabeled name={'email'} label={'Email'} onUpdate={update} />
          <ButtonSubmit {...form}>{t('auth:send-link')}</ButtonSubmit>
        </Form>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm
