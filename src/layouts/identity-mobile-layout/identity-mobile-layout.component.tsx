import React, { useState, useEffect } from 'react'
import Styles from './identity-mobile-layout.styles'
import { Logo, Wrapper } from '../../pages/styles'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import IdentityFooter from '../identity-footer/identity-footer.component'
import IdentityMobileFooter from '../identity-mobile-footer/identity-mobile-footer.component'

type Props = {
  children: React.ReactNode
  title: string
  desc: string
}
const IdentityMobileLayout = ({ children, title, desc }: Props) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <Wrapper>
        <Logo />
        <h1 className={'layout__title'}>{title}</h1>
        <h2 className={'layout__desc'}>{desc}</h2>
        {children}
      </Wrapper>
      <IdentityMobileFooter />
    </Styles>
  )
}

export default IdentityMobileLayout
