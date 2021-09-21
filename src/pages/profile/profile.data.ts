import brand from '../../config/branding.config'
import moment, { Moment } from 'moment'
import genderTypes from '../../enums/gender-types'
import { OnBoardItemType } from '../onboard/onboard.type'

type ProfileFieldsType = {
  default: OnBoardItemType[]
  trainer?: OnBoardItemType[]
  client?: OnBoardItemType[]
}
const lrClientFields: OnBoardItemType[] = [
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
const lrTrainerFields: OnBoardItemType[] = [
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
]
const erFields: OnBoardItemType[] = []
const profileSource: { [key: string]: ProfileFieldsType } = {
  EatRight: {
    default: erFields
  },
  LiveRight: {
    trainer: lrTrainerFields,
    client: lrClientFields,
    default: lrClientFields
  },
  default: {
    trainer: lrTrainerFields,
    client: lrClientFields,
    default: lrClientFields
  }
}

export const profileInfo = (profileSource[brand.name] ||
  profileSource.default) as ProfileFieldsType
export const profileBasic: OnBoardItemType[] = [
  {
    name: '',
    label: '',
    type: 'row',
    data: [
      {
        name: 'first_name',
        label: 'profile:first-name',
        type: 'text'
      },
      {
        name: 'last_name',
        label: 'profile:last-name',
        type: 'text'
      },
      {
        name: 'birthday',
        label: 'profile:birth-date',
        type: 'date',
        props: {
          disabledDate: (d: Moment) =>
            d.isAfter(moment().add(-16, 'years')) ||
            d.isBefore(moment().add(-120, 'years'))
        }
      }
    ]
  },
  {
    name: '',
    label: '',
    type: 'row',
    data: [
      {
        name: 'email',
        label: 'profile:email',
        type: 'text',
        props: {
          disabled: true
        }
      },
      {
        name: 'phone_number',
        label: 'profile:phone',
        type: 'phone'
      },
      {
        name: 'gender',
        label: 'profile:gender',
        type: 'radio',
        options: [
          { label: 'Male', value: genderTypes.MALE },
          { label: 'Female', value: genderTypes.FEMALE },
          { label: 'Other', value: genderTypes.OTHER }
        ]
      }
    ]
  }
  // {
  //     name: 'addresses', label: '', type: 'list',
  //     data: [
  //         {
  //           type: 'text',
  //           name: 'address',
  //           label: 'profile:address'
  //         },
  //         {
  //             type: 'row',
  //             label: '', name: '',
  //             data: [
  //                 {
  //                     label: 'profile:postal-code',
  //                     name: 'postal_code',
  //                     type: 'text'
  //                 },
  //                 {
  //                     label: 'profile:city',
  //                     name: 'city',
  //                     type: 'text'
  //                 },
  //             ]
  //         },
  //         {
  //             type: 'country-select',
  //             name: 'country.code',
  //             label: 'profile:country'
  //         }
  //     ]
  // }
]
