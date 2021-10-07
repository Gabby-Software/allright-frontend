import React, { useContext } from 'react'

import { toast } from '../../components/toast/toast.component'
import { EP_ADD_ACCOUNT } from '../../enums/api.enum'
import { onlyActive } from '../../guards/active.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import api from '../../managers/api.manager'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { serverError } from '../../pipes/server-error.pipe'
import { AddAccountContext } from '../add-account/add-account.context'
import { OnBoardProvider } from '../onboard/onboard.context'
import OnboardDesktop from '../onboard/onboard.desktop'
import OnBoardMobile from '../onboard/onboard.mobile'
import { addAccountOnboardData } from './add-account-onboard.data'

type Props = {}
const AddAccountOnboard = ({}: Props) => {
  const isMobile = useIsMobile()
  const { accountType } = useContext(AddAccountContext)

  const preSubmit = () => {
    return api
      .post(EP_ADD_ACCOUNT, { type: accountType })
      .then((res) => res.data.data)
      .then((res) => {
        // TODO see if it works.
        // logger.success('ADD ACCOUNT SUCCESS', res)
        // const user = data?.user as AccountObjType
        // user.accounts.push(res)
        // user.accounts = user.accounts.map((acc) => ({
        //   ...acc,
        //   is_current: acc.type === accountType
        // }))
        // console.log('SETTING COOKIE 4', user)
        // cookieManager.set('auth', JSON.stringify(user))
        // setData({
        //   ...(data as AuthResponseType),
        //   user
        // })
      })
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
  }

  return (
    <OnBoardProvider steps={addAccountOnboardData} preSubmit={preSubmit}>
      {isMobile ? <OnBoardMobile /> : <OnboardDesktop />}
    </OnBoardProvider>
  )
}

export default onlyActive(AddAccountOnboard)
