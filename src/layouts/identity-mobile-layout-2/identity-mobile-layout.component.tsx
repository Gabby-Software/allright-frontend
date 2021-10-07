import React, { useContext } from 'react'

import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { Logo } from '../../pages/styles'
import IdentityMobileFooter from '../identity-mobile-footer/identity-mobile-footer.component'
import Styles from './identity-mobile-layout.styles'
import Wrapper from './identity-mobile-layout-wrapper.styles'

type Props = {
  children: React.ReactNode
  title: string
  desc: string
  footer?: boolean
}
const IdentityMobileLayout = ({
  children,
  title,
  desc,
  footer = true
}: Props) => {
  const { data } = useContext(AuthDataContext)

  return (
    <Styles>
      <header className="layout__header">
        <Logo />
        <h1 className={'layout__title'}>{title}</h1>
        <h2 className={'layout__desc'}>{desc}</h2>
      </header>
      <Wrapper>{children}</Wrapper>
      {footer && <IdentityMobileFooter showLegals={!data?.user} />}
    </Styles>
  )
}

export default IdentityMobileLayout
