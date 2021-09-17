import { OnBoardStepType } from '../onboard/onboard.type'
import * as Yup from 'yup'

export const addAccountOnboardData: OnBoardStepType[] = [
  {
    desc: 'add-account.onboard',
    validationSchema: Yup.object({}),
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
      }
    ],
    client: [
      {
        type: 'textarea',
        name: 'about',
        label: 'profile:about'
      },
      {
        type: 'textarea',
        name: 'qualifications',
        label: 'profile:qualifications'
      },
      {
        type: 'textarea',
        name: 'additional_info',
        label: 'profile:additional-information'
      }
    ],
    trainer: [
      {
        type: 'textarea',
        name: 'dietary_restrictions',
        label: 'profile:dietary-restrictions'
      },
      {
        type: 'textarea',
        name: 'injuries',
        label: 'profile:injuries'
      }
    ]
  }
]
