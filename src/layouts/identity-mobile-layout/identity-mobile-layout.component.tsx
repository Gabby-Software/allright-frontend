import React, { useContext } from 'react'

import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { Logo, Wrapper } from '../../pages/styles'
import IdentityMobileFooter from '../identity-mobile-footer/identity-mobile-footer.component'
import Styles from './identity-mobile-layout.styles'

type Props = {
  children: React.ReactNode
  title: string
  desc: string
}
const IdentityMobileLayout = ({ children, title, desc }: Props) => {
  const { data } = useContext(AuthDataContext)

  return (
    <Styles>
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
