import React, { useState, useEffect, useContext } from 'react'
import { useEvent } from './event.hook'
import cookieManager from '../managers/cookie.manager'
import { AuthDataContext } from '../modules/auth/auth-data.context'
import { AccountObjType } from '../modules/auth/account.type'
type IframeEventType = {
  event: string
  key: string
  [key: string]: any
}
const messages = {
  CHECK_LOGIN: 'check_login',
  DO_LOGIN: 'do_login'
}

export type AuthResponseType = {
  access_token: string
  expires_in?: number
  user: AccountObjType
}

export const useAuthorization = () => {
  const { data, setData } = useContext(AuthDataContext)
  useEvent('focus', () => {
    const user = cookieManager.get('auth')
    const access_token = cookieManager.get('access_token')
    setData(access_token ? { access_token, user: JSON.parse(user) } : null)
  })
}
