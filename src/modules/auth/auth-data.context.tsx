import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { EP_GET_USER } from '../../enums/api.enum'
import { AuthResponseType } from '../../hooks/authorization.hook'
import api from '../../managers/api.manager'
import cookieManager from '../../managers/cookie.manager'
import { AccountObjType } from './account.type'

export const AuthDataContext = createContext<{
  data: AuthResponseType | null
  setData: (data: AuthResponseType | null) => void
}>({ data: null, setData: () => {} })

// const allowedRoutes = [
//   Routes.REGISTER_ON_BOARD,
//   Routes.ADD_ACCOUNT,
//   Routes.ADD_ACCOUNT_ONBOARD,
//   Routes.PROFILE
// ]

export const AuthDataProvider = ({ children }: { children: any }) => {
  const access_token = cookieManager.get('access_token')
  const user = JSON.parse(cookieManager.get('auth') || '{}') as AccountObjType
  const location = useLocation()
  const [data, setData] = useState<AuthResponseType | null>(
    access_token ? { access_token, user } : null
  )

  useEffect(() => {
    if (data && !location.pathname.includes('invitations')) {
      api
        .get(EP_GET_USER)
        .then((res) => res.data.data)
        .then((res) => {
          const d = data as AuthResponseType
          d.user = res

          setData({ ...d })

          console.log('SETTING COOKIE 2')
          cookieManager.set('auth', JSON.stringify(res))
        })
    }
  }, [])

  return (
    <AuthDataContext.Provider
      value={{
        data,
        setData: (data: AuthResponseType | null) => {
          setData(data)
          data && cookieManager.set('access_token', data?.access_token)
          data && cookieManager.set('auth', JSON.stringify(data?.user))
        }
      }}
    >
      {children}
    </AuthDataContext.Provider>
  )
}
