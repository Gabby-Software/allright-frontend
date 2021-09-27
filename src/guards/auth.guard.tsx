import React, { ComponentType, ComponentProps, useContext } from 'react'
import { AuthDataContext } from '../modules/auth/auth-data.context'
import { Redirect } from 'react-router'
import { Routes } from '../enums/routes.enum'
import { mainHost } from '../pipes/main-host'
import { unblockCookies } from '../utils/cookie'

export const onlyAuth =
  (Component: ComponentType) => (props: ComponentProps<any>) => {
    const { data } = useContext(AuthDataContext)
    if (data?.access_token && data?.user.email_verified_at) {
      unblockCookies()
      document.location.href = mainHost()
      return null
    }
    if (!data?.access_token) return <Redirect to={Routes.LOGIN} />
    return <Component {...props} />
  }
