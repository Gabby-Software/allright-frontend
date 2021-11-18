import moment, { Moment } from 'moment'
import * as Yup from 'yup'

import config from '../../config/branding.config'
import { /* OnBoardItemType, */ OnBoardStepType } from './onboard.type'

const liveRightOnBoard: OnBoardStepType[] = [
  {
    desc: 'onboard-more-info',
    validationSchema: Yup.object({
      phone_number: Yup.string().nullable().phone(),
      birthday: Yup.date().nullable().max(moment().add(-16, 'years'), 'age-16')
    }),
    fields: [
      {
        type: 'row',
        // type: 'text',
        data: [
          {
            type: 'phone',
            name: 'phone_number',
            label: 'profile:phone'
          },
          {
            type: 'date',
            name: 'birthday',
            label: 'profile:birth-date',
            props: {
              disabledDate: (d: Moment) =>
                d.isAfter(moment().add(-16, 'years')) ||
                d.isBefore(moment().add(-120, 'years'))
            }
          }
        ]
      }
    ]
  },
  {
    desc: 'onboard-location',
    validationSchema: Yup.object({
      postal_code: Yup.string().nullable().zip()
    }),
    fields: [
      {
        type: 'text',
        name: 'addresses.0.address',
        label: 'profile:address'
      },
      {
        type: 'row',
        data: [
          {
            type: 'text',
            name: 'addresses.0.city',
            label: 'profile:city'
          },
          {
            type: 'text',
            name: 'addresses.0.postal_code',
            label: 'profile:postal-code'
          }
        ]
      },
      {
        type: 'country-select',
        name: 'addresses.0.country.code',
        label: 'profile:country'
      }
    ]
  },
  {
    desc: 'onboard-restrictions',
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
    trainer: [
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
    client: [
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
const eatRightOnBoard: OnBoardStepType[] = [
  {
    desc: 'onboard-location-eatright',
    validationSchema: Yup.object({ postal_code: Yup.string().zip() }),
    fields: [
      {
        type: 'text',
        name: 'addresses.0.address',
        label: 'profile:address'
      },
      {
        type: 'row',
        data: [
          {
            type: 'text',
            name: 'addresses.0.city',
            label: 'profile:city'
          }
        ]
      },
      {
        type: 'country-select',
        name: 'addresses.0.country.code',
        label: 'profile:country'
      }
    ]
  }
]
const onBoardResource: { [key: string]: OnBoardStepType[] } = {
  LiveRight: liveRightOnBoard,
  EatRight: eatRightOnBoard
}
export const onBoardData: OnBoardStepType[] =
  onBoardResource[config.name] || liveRightOnBoard
