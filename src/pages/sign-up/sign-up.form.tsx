import { Form, Formik, FormikHelpers } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'

// import AuthLink from '../../components/auth-link/auth-liks.component'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import FormPassword from '../../components/forms/form-password/form-password.component'
import FormRadio from '../../components/forms/form-radio-button/form-radio-button.component'
import FormSwitch from '../../components/forms/form-switch/form-switch.component'
import brand from '../../config/branding.config'
import { EP_REGISTER } from '../../enums/api.enum'
import genderTypes from '../../enums/gender-types'
// import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { AuthResponseType } from '../../hooks/authorization.hook'
import api, { handleError } from '../../managers/api.manager'
import cookieManager from '../../managers/cookie.manager'
import { ipstack } from '../../managers/ipstack.manager'
import logger from '../../managers/logger.manager'
import { AuthFormContext } from '../../modules/auth/auth.context'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import {
  AuthFormFieldsType,
  AuthFormTypeNotNull
} from '../../modules/auth/auth-form.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { mainHost } from '../../pipes/main-host'
import { MobileStickyBottom } from '../styles'

export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
const searchParams = new URLSearchParams(location.search)

type LoginDataType = {
  type: string
  first_name: string
  last_name: string
  email: string
  password: string
  gender: string
}
const SignUpForm = () => {
  const { t } = useTranslation()
  const { form, update } = useContext(AuthFormContext) as AuthFormTypeNotNull
  const { setData } = useContext(AuthDataContext)
  const handleSubmit = async (
    form: LoginDataType,
    helper: FormikHelpers<AuthFormFieldsType>
  ) => {
    logger.info('submitting form', form)
    const { first_name, last_name, email, password, type, gender } = form
    let defaults = {}
    try {
      defaults = await ipstack.getDefaults()
    } catch (e) {
      // why is catch block empty 🤔???
      // eslint-disable-next-line
    }

    // search params that are passed from EatRight
    const session = searchParams.get('session') || ''
    const address = searchParams.get('address') || ''
    const city = searchParams.get('city') || ''
    const postal_code = searchParams.get('postalCode') || ''
    const country = searchParams.get('country') || ''
    const phone_number = searchParams.get('phoneNo') || ''
    const referral =
      searchParams.get('ref') || localStorage.getItem('eatright-ref') || ''
    const region = searchParams.get('region') || ''

    localStorage.removeItem('eatright-ref')

    api
      .post<AuthResponseType>(EP_REGISTER, {
        ...defaults,
        session,
        address,
        city,
        postal_code,
        country_code: country ? country.toUpperCase() : 'AE',
        phone_number,
        first_name,
        last_name,
        email,
        password,
        gender,
        account_type: type,
        password_confirmation: password,
        ref: referral,
        region
      })
      .then((res) => res.data)
      .then((res) => {
        logger.success('REGISTRATION SUCCESS', res)
        console.log('SETTING COOKIE 8')
        console.log(res.access_token, res.user)
        cookieManager.set('access_token', res.access_token, res.expires_in)
        cookieManager.set('auth', JSON.stringify(res.user), res.expires_in)
        setData(res)

        // If user was redirected from EatRight cart, skip email confirmation and redirect back to EatRight
        if (session) {
          window.location.href = `${mainHost()}/plans/1?redirectToCheckout=true&deliveryDate=${
            searchParams.get('deliveryDate') || ''
          }&renewWeekly=${searchParams.get('renewWeekly') || ''}&cutlery=${
            searchParams.get('cutlery') || ''
          }`
        }
        helper.setSubmitting(false)
      })
      .catch(handleError(helper))
  }
  const userTypeOptions = [
    { label: 'Individual', value: userTypes.CLIENT },
    { label: 'Trainer', value: userTypes.TRAINER }
  ]
  const genderOptions = [
    { label: 'Male', value: genderTypes.MALE },
    { label: 'Female', value: genderTypes.FEMALE },
    { label: 'Other', value: genderTypes.OTHER }
  ]
  return (
    <Formik
      initialValues={form}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        type: Yup.string().required(),
        first_name: Yup.string().required().name(),
        last_name: Yup.string().required().name(),
        email: Yup.string().required().email(),
        password: Yup.string()
          .required()
          .matches(
            passwordRegExp,
            'Minimum password length is 8 characters and it should contain at least 1 letter and one digit'
          )
          .min(8)
          .password()
      })}
    >
      {() => (
        <Form>
          {brand.multiple_accounts ? (
            <FormSwitch name={'type'} options={userTypeOptions} />
          ) : null}
          <div className={'sign-up__name'}>
            <FormInputLabeled
              name={'first_name'}
              label={'First Name'}
              onUpdate={update}
            />
            <FormInputLabeled
              name={'last_name'}
              label={'Last Name'}
              onUpdate={update}
            />
          </div>
          <FormRadio
            name={'gender'}
            label={"What's your gender?"}
            options={genderOptions}
            brandColors={true}
          />
          <FormInputLabeled name={'email'} label={'Email'} onUpdate={update} />
          <FormPassword
            name={'password'}
            label={'Create a password'}
            onUpdate={update}
          />
          <MobileStickyBottom>
            <ButtonSubmit>{t('auth:sign-up')}</ButtonSubmit>
          </MobileStickyBottom>
          {/* <AuthLink
            url={Routes.LOGIN}
            linkText={t('auth:sign-in')}
            message={t('auth:have-account')}
          /> */}
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
