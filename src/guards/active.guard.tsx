import React, { ComponentType, ComponentProps, useContext } from 'react'
import { AuthDataContext } from '../modules/auth/auth-data.context'
import { Redirect } from 'react-router'
import { Routes } from '../enums/routes.enum'

export const onlyActive =
  (Component: ComponentType) => (props: ComponentProps<any>) => {
    const { data } = useContext(AuthDataContext)
    if (!data?.access_token) return <Redirect to={Routes.LOGIN} />
    if (!data?.user?.email_verified_at)
      return <Redirect to={Routes.REGISTER_CONFIRMATION} />
    return <Component {...props} />
  }
