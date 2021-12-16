import React, { useContext } from 'react'
import { useLocation } from 'react-router'

import { ReactComponent as LeftArrowIcon } from '../../assets/media/icons/left-arrow.svg'
import { Routes } from '../../enums/routes.enum'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { Logo, Wrapper } from '../../pages/styles'
import { mainHost } from '../../pipes/main-host'
import { isEatRight } from '../../utils/domains'
import IdentityMobileFooter from '../identity-mobile-footer/identity-mobile-footer.component'
import Styles from './identity-mobile-layout.styles'

const routesWithBackLink = [
  Routes.LOGIN,
  Routes.REGISTER,
  Routes.VERIFY_EMAIL,
  Routes.FORGOT_PASSWORD,
  Routes.FORGOT_PASSWORD_CONFIRMATION
]

type Props = {
  children: React.ReactNode
  title: string
  desc: string
}
const IdentityMobileLayout = ({ children, title, desc }: Props) => {
  const { data } = useContext(AuthDataContext)
  const location = useLocation()
  const isER = isEatRight()

  return (
    <Styles>
      {isER && routesWithBackLink.includes(location.pathname) && (
        <div className={'goBackLink'}>
          <a href={mainHost()}>
            <LeftArrowIcon /> Go Back Eatright
          </a>
        </div>
      )}
      <Wrapper>
        <Logo />
        <h1 className={'layout__title'}>{title}</h1>
        <h2 className={'layout__desc'}>{desc}</h2>
        {children}
      </Wrapper>
      <IdentityMobileFooter showLegals={!data?.user} />
    </Styles>
  )
}

export default IdentityMobileLayout
