import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { ProfileDataType } from '../../modules/auth/profile-data.type'
import { FileType } from '../../modules/auth/file.type'

export type ProfileFormType = AccountObjType &
  AccountType &
  ProfileDataType & {
    current_password: string
    password: string
    password_confirmation: string
    tnb?: boolean
    card_number: string
    card_expiry: string
    card_cvc: string
  }
