import { FormikHelpers } from 'formik'
import React, { createContext, useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import brand from '../../config/branding.config'
import {
  EP_SET_PASSWORD,
  EP_UPDATE_PASSWORD,
  EP_UPDATE_PROFILE,
  EP_UPDATE_PROFILE_CUSTOM,
  EP_UPDATE_USER
} from '../../enums/api.enum'
import { AuthResponseType } from '../../hooks/authorization.hook'
import api, { handleError } from '../../managers/api.manager'
// import cookieManager from '../../managers/cookie.manager'
import logger from '../../managers/logger.manager'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { ProfileDataType } from '../../modules/auth/profile-data.type'
import { fillExist } from '../../pipes/fill-exist.pipe'
import { mainHost } from '../../pipes/main-host'
import { ProfileFormType } from '../profile/profile.type'
import { OnBoardStepType } from './onboard.type'
import { unblockCookies } from '../../utils/cookie'

export type OnBoardContextType = {
  data: null | ProfileFormType
  update: (name: string, value: any) => void
  step: number
  steps: OnBoardStepType[]
  nextStep: () => void
  onSubmit: (
    values: ProfileFormType,
    helper: FormikHelpers<ProfileFormType>
  ) => void
  goTo: (step: number) => void
  preSubmit: () => void
  requireTNB?: boolean
}
export type OnBoardContextTypeNotNull = OnBoardContextType & {
  data: ProfileFormType
}
export const OnBoardContext = createContext<OnBoardContextType>({
  data: null,
  update: () => {},
  steps: [],
  step: 0,
  nextStep: () => {},
  onSubmit: () => {},
  goTo: () => {},
  preSubmit: () => {}
})

type OnBoardProviderType = {
  children: React.ReactNode
  steps: OnBoardStepType[]
  preSubmit?: () => void
  disableBackToFirstStep?: boolean
  requireTNB?: boolean
}

export const OnBoardProvider = ({
  children,
  steps,
  preSubmit = () => {},
  disableBackToFirstStep,
  requireTNB
}: OnBoardProviderType) => {
  const { data: initialData, setData: setInitialData } =
    useContext(AuthDataContext)
  const initialUser = (initialData as AuthResponseType)?.user || {}
  const [step, setStep] = useState(0)
  const history = useHistory()
  const location = useLocation()

  const [data, setData] = useState<
    AccountObjType & AccountType & ProfileDataType
  >({
    ...initialUser,
    ...(initialUser?.accounts?.find((acc) => acc.is_current) as AccountType),
    ...(initialUser?.accounts?.find((acc) => acc.is_current)
      ?.profile as ProfileDataType)
  })

  const update = (name: string, val: any) => {
    const names = name.split('.')
    let key: any = data
    while (names.length > 1) {
      const n = names.shift()
      if (!n) return
      if (Array.isArray(key)) key = key[+n]
      else {
        key = key[n]
      }
    }
    key[names.shift() as string] = val
    setData({ ...data })
  }

  const nextStep = () => {
    if (step + 1 >= steps.length) {
      unblockCookies()
      document.location.href = mainHost()
    }
    else setStep(step + 1)
  }

  const goTo = (newStep: number) => {
    if (step === 0 && disableBackToFirstStep) return
    if (newStep === 0 && disableBackToFirstStep) return
    setStep(newStep)
  }

  const onSubmit = async (
    values: ProfileFormType,
    helper: FormikHelpers<ProfileFormType>
  ) => {
    await preSubmit()
    const {
      first_name,
      last_name,
      email,
      birthday,
      gender,
      terms_and_conditions,
      phone_number,
      addresses,
      dietary_restrictions,
      injuries,
      about,
      qualifications,
      additional_info,
      avatar,
      password,
      password_confirmation
    } = values
    const user = initialData?.user as AccountObjType
    logger.info('SUBMITTING 1')
    try {
      if (password && password_confirmation) {
        await api
          .post(EP_SET_PASSWORD + document.location.search, {
            password,
            password_confirmation
          })
          .then(() => {
            history.replace(location.pathname)
          })
        return nextStep()
      }
      const payload: any = {
        user:
          fillExist({
            first_name,
            last_name,
            email,
            birthday,
            gender
          }) || undefined
      }
      if (
        phone_number ||
        dietary_restrictions ||
        injuries ||
        about ||
        qualifications ||
        additional_info
      ) {
        payload.profile = fillExist({
          phone_number,
          dietary_restrictions,
          injuries,
          about,
          qualifications,
          additional_info
        })
      }
      if (addresses?.length) {
        payload.addresses = addresses.map((addr) => ({
          ...addr,
          country_code: addr?.country?.code || undefined,
          id: addr?.id && addr.id > 0 ? addr?.id : undefined,
          is_default: true
        }))
      }
      const authRes = await api
        .put<{ data: AccountObjType }>(EP_UPDATE_PROFILE_CUSTOM, payload)
        .then((res) => res.data.data)
      ;(initialData as AuthResponseType).user = authRes
      setInitialData({ ...(initialData as AuthResponseType) })
      setData({
        ...authRes,
        ...(authRes?.accounts?.find((acc) => acc.is_current) as AccountType),
        ...(authRes?.accounts?.find((acc) => acc.is_current)
          ?.profile as ProfileDataType)
      })
      if (step + 1 >= steps.length) {
        try {
          document.location.replace(mainHost())
        } catch (e) {
          unblockCookies()
          document.location.href = mainHost()
        }
      } else nextStep()
    } catch (e) {
      handleError(helper)(e)
    }
  }
  return (
    <OnBoardContext.Provider
      value={{
        data: {
          ...data,
          password: '',
          password_confirmation: '',
          current_password: '',
          tnb: true,
          card_number: '',
          card_expiry: '',
          card_cvc: ''
        },
        update,
        step,
        nextStep,
        onSubmit,
        goTo,
        steps,
        preSubmit,
        requireTNB
      }}
    >
      {children}
    </OnBoardContext.Provider>
  )
}
