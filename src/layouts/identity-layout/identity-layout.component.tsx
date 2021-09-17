import React, { useState, useEffect } from 'react'
import Styles from './identity-layout.styles'
import IdentitySidebar from '../identity-sidebar/identity-sidebar.component'
import { Routes } from '../../enums/routes.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import IdentityFooter from '../identity-footer/identity-footer.component'

type Props = {
  sidebar: React.ComponentType<any>
  children: React.ReactNode
  w?: string
}
const IdentityLayout = ({ w, sidebar: Sidebar, children }: Props) => {
  return (
    <Styles>
      <IdentitySidebar>
        <Sidebar />
      </IdentitySidebar>
      <main className={'layout__main'}>
        <div
          className={'layout__wrapper'}
          style={w ? { maxWidth: w } : undefined}
        >
          {children}
        </div>
      </main>
      <IdentityFooter />
    </Styles>
  )
}
// {/*<IdentitySidebar>*/}
// {/*    <IdentitySidebar.Title>Welcome back!</IdentitySidebar.Title>*/}
// {/*    <IdentitySidebar.Subtitle>Sign into your account</IdentitySidebar.Subtitle>*/}
// {/*    <IdentitySidebar.Hr></IdentitySidebar.Hr>*/}
// {/*    <IdentitySidebar.Desc>Don't have an account?</IdentitySidebar.Desc>*/}
// {/*    <IdentitySidebar.Link to={Routes.LOGIN}>Sign up for a new account</IdentitySidebar.Link>*/}
// {/*</IdentitySidebar>*/}
export default IdentityLayout
