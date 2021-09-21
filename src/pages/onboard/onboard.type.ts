import { AnyObjectSchema } from 'yup'

import { OptionType } from '../../types/option.type'

export type OnBoardFieldType =
  | 'text'
  | 'date'
  | 'select'
  | 'row'
  | 'textarea'
  | 'country-select'
  | 'radio'
  | 'password'
  | 'list'
  | 'phone'
  | 'checkbox'
export type OnBoardItemType = {
  type: OnBoardFieldType
  name?: string
  label?: string
  options?: OptionType[]
  data?: OnBoardItemType[]
  props?: any
}
export type OnBoardStepType = {
  desc: string
  fields: OnBoardItemType[]
  trainer?: OnBoardItemType[]
  client?: OnBoardItemType[]
  validationSchema: AnyObjectSchema
}
