import moment from 'moment'
import * as Yup from 'yup'

export const profileSchema = Yup.object({
  birthday: Yup.date().nullable().max(moment().add(-16, 'years'), 'age-16'),
  first_name: Yup.string().required().name(),
  last_name: Yup.string().required().name(),
  email: Yup.string().required().email(),
  phone_number: Yup.string().nullable().phone(),
  addresses: Yup.array(
    Yup.object({
      postal_code: Yup.string()
        .when('_delete', {
          is: (del: boolean) => !del,
          then: Yup.string().nullable().zip()
        })
        .nullable()
    })
  ).nullable(),
  current_password: Yup.string().nullable().password(),
  password: Yup.string().nullable().password(),
  password_confirmation: Yup.string()
    .equals([Yup.ref('password')], 'passwords-not-match')
    .nullable(),
  card_number: Yup.string()
    .nullable()
    .matches(/^[0-9\s]{19}/, 'Invalid value'),
  card_expiry: Yup.string().matches(
    /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
    'Invalid value'
  ),
  card_cvc: Yup.string().matches(/^[0-9]{3,4}$/, 'Invalid value')

  // payment_info: Yup.object({
  //     account_number: Yup.string()
  //         .number().min(6).max(12),
  //     tax_id: Yup.string().number()
  //         .min(4).max(17),
  //     name_on_account: Yup.string().name(true)
  // })
})
