import React, { useContext } from 'react'

import { AccountObjType, AccountType } from '../modules/auth/account.type'
import { AuthDataContext } from '../modules/auth/auth-data.context'

export const useAuth = () => {
  const { data } = useContext(AuthDataContext)

  const user = data?.user as AccountObjType
  const account = data?.user?.accounts?.find(
    (acc) => acc.is_current
  ) as AccountType

  return {
    ...user,
    ...account,
    addresses: account?.addresses?.length
      ? account?.addresses
      : [
          {
            address: '',
            city: '',
            country: null,
            is_default: true,
            postal_code: '',
            region: ''
          }
        ]
  } as AccountObjType & AccountType
}
