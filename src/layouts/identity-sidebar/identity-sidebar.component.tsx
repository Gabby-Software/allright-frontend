import React, { useState, useEffect } from 'react'
import Styles from './identity-sidebar.styles'
import config from '../../config/branding.config'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}
const IdentitySidebar = ({ children }: Props) => {
  const Logo = config.logo
  return (
    <Styles className={'sidebar'}>
      <Logo className={'sidebar__logo'} />
      <div className={'sidebar__body'}>{children}</div>
    </Styles>
  )
}
IdentitySidebar.Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin: 0;
`
IdentitySidebar.Link = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
  }
`
IdentitySidebar.ExtLink = styled.a`
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    color: white;
  }
  svg {
    margin-right: 12px;
    height: 14px;
    width: auto;
  }
`
IdentitySidebar.Desc = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 500;
`
IdentitySidebar.Subtitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
`
IdentitySidebar.Hr = styled.div`
  margin: 40px 0;
  border-bottom: 1px solid white;
  max-width: 50px;
`
IdentitySidebar.Space = styled.div`
  margin-top: 40px;
`
export default IdentitySidebar
