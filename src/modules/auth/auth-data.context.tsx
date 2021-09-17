import React, {
  createContext,
  useContext,
  useState,
  ComponentType,
  ElementType,
  useEffect
} from 'react'
import { AuthResponseType } from '../../hooks/authorization.hook'
import cookieManager from '../../managers/cookie.manager'
import { mainHost } from '../../pipes/main-host'
import { AccountObjType } from './account.type'
import { Routes } from '../../enums/routes.enum'
import { useLocation } from 'react-router-dom'
import api from '../../managers/api.manager'
import { EP_GET_USER } from '../../enums/api.enum'
import logger from '../../managers/logger.manager'

export const AuthDataContext = createContext<{
  data: AuthResponseType | null
  setData: (data: AuthResponseType | null) => void
}>({ data: null, setData: () => {} })
const allowedRoutes = [
  Routes.REGISTER_ON_BOARD,
  Routes.ADD_ACCOUNT,
  Routes.ADD_ACCOUNT_ONBOARD,
  Routes.PROFILE
]
export const AuthDataProvider = ({ children }: { children: any }) => {
  const access_token = cookieManager.get('access_token')
  const user = JSON.parse(cookieManager.get('auth') || '{}') as AccountObjType
  const { pathname } = useLocation()
  const [data, setData] = useState<AuthResponseType | null>(
    access_token ? { access_token, user } : null
  )
  useEffect(() => {
    if (!data) return
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
  }, [])
  return (
    <AuthDataContext.Provider
      value={{
        data,
        setData: (data: AuthResponseType | null) => {
          setData(data)
          logger.info('setting user cookie', data, data?.user)
          console.log('SETTING COOKIE 3')
          data && cookieManager.set('access_token', data?.access_token)
          data && cookieManager.set('auth', JSON.stringify(data?.user))
        }
      }}
    >
      {children}
    </AuthDataContext.Provider>
  )
}
