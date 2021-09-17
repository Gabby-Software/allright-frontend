import React, { useState, useEffect, useContext } from 'react'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { OnBoardProvider } from '../onboard/onboard.context'
import OnBoardMobile from '../onboard/onboard.mobile'
import OnboardDesktop from '../onboard/onboard.desktop'
import { addAccountOnboardData } from './add-account-onboard.data'
import { Skip } from '../styles/skip.styles'
import { onlyActive } from '../../guards/active.guard'
import api from '../../managers/api.manager'
import { EP_ADD_ACCOUNT } from '../../enums/api.enum'
import logger from '../../managers/logger.manager'
import { AccountObjType } from '../../modules/auth/account.type'
import cookieManager from '../../managers/cookie.manager'
import { toast } from '../../components/toast/toast.component'
import { serverError } from '../../pipes/server-error.pipe'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { AddAccountContext } from '../add-account/add-account.context'
import { AuthResponseType } from '../../hooks/authorization.hook'

type Props = {}
const AddAccountOnboard = ({}: Props) => {
  const isMobile = useIsMobile()
  const { data, setData } = useContext(AuthDataContext)
  const { accountType } = useContext(AddAccountContext)
  const preSubmit = () => {
    return api
      .post(EP_ADD_ACCOUNT, { type: accountType })
      .then((res) => res.data.data)
      .then((res) => {
        logger.success('ADD ACCOUNT SUCCESS', res)
        const user = data?.user as AccountObjType
        user.accounts.push(res)
        user.accounts = user.accounts.map((acc) => ({
          ...acc,
          is_current: acc.type === accountType
        }))
        console.log('SETTING COOKIE 4', user)
        cookieManager.set('auth', JSON.stringify(user))
        setData({
          ...(data as AuthResponseType),
          user
        })
      })
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
  }
  return (
    <OnBoardProvider steps={addAccountOnboardData} preSubmit={preSubmit}>
      {isMobile ? <OnBoardMobile /> : <OnboardDesktop />}
      <Skip />
    </OnBoardProvider>
  )
}

export default onlyActive(AddAccountOnboard)
