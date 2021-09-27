import { onBoardData } from '../../onboard/onboard.data'
import { OnBoardStepType } from '../../onboard/onboard.type'
import * as Yup from 'yup'

export const invitationOnBoardData: OnBoardStepType[] = [
  {
    desc: 'onboard-set-password',
    validationSchema: Yup.object({
      password: Yup.string().required().password(),
      password_confirmation: Yup.string()
        .required()
        .equals([Yup.ref('password')], 'passwords-not-match')
    }),
    fields: [
      {
        type: 'row',
        data: [
          {
            type: 'password',
            name: 'password',
            label: 'profile:new-password'
          },
          {
            type: 'password',
            name: 'password_confirmation',
            label: 'profile:confirm-password'
          }
        ]
      }
    ]
  },
  ...onBoardData.slice(0, 2),
  {
    desc: 'onboard-restrictions',
    validationSchema: Yup.object({
      tnb: Yup.boolean()
        .required("You did not accept trainer's Terms and Conditions")
        .nullable()
        .oneOf([true], "You did not accept trainer's Terms and Conditions")
    }),
    fields: [
      {
        type: 'textarea',
        name: 'dietary_restrictions',
        label: 'profile:dietary-restrictions'
      },
      {
        type: 'textarea',
        name: 'injuries',
        label: 'profile:injuries'
      },
      {
        type: 'checkbox'
      }
    ]
  }
]
