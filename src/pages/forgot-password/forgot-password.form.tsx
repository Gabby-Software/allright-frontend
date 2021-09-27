import {
  Form,
  Formik,
  FormikHelpers,
  FormikProps /* useFormik */
} from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'

// import Button from '../../components/buttons/button/button.component'
// import Input from '../../components/form/input/input.component'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import { toast } from '../../components/toast/toast.component'
import { EP_SEND_RESET_PASSWORD } from '../../enums/api.enum'
import api, { handleError } from '../../managers/api.manager'
import { AuthFormContext } from '../../modules/auth/auth.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { FormDesc } from '../styles'

type EmailType = { email: string }

const ForgotPasswordForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation()
  const { form, update } = useContext(AuthFormContext) as AuthFormTypeNotNull
  // Why does this form value have to be in the context as above
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

  // const handleSubmit = ({ email }: EmailType) => {
  //   api
  //     .post(EP_SEND_RESET_PASSWORD, { email })
  //     .then((res) => {
  //       toast.show({ type: 'success', msg: 'Reset password sent' })
  //       onSubmit()
  //     })
  //     .catch((e) => {
  //       toast.show({ type: 'error', msg: e.message })
  //     })
  // }

  // const formik = useFormik({
  //   validationSchema: Yup.object().shape({
  //     email: Yup.string().email('Invalid email').required('Required')
  //   }),
  //   initialValues: {
  //     email: ''
  //   },
  //   onSubmit: handleSubmit
  // })
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

    // <form onSubmit={formik.handleSubmit}>
    //   <FormDesc>{t('auth:recover-password-desc')}</FormDesc>
    //   {/* <FormInputLabeled name={'email'} label={'Email'} onUpdate={update} /> */}
    //   <Input
    //     name={'email'}
    //     id={'email'}
    //     label={'Email'}
    //     onChange={formik.handleChange}
    //   />
    //   <Button type="submit">{t('auth:send-link')}</Button>{' '}
    // </form>
  )
}

export default ForgotPasswordForm
