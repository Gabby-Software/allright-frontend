import { Link } from 'react-router-dom'
import styled from 'styled-components'

import config from '../../config/branding.config'
import Styles from './identity-sidebar.styles'

type Props = {
  children: React.ReactNode
}
const IdentitySidebar = ({ children }: Props) => {
  const Logo = config.logo
  return (
    <Styles className={'sidebar'}>
      <Logo className={'sidebar__logo'} />
      <div className={'sidebar__body'}>{children}</div>
      <p className={'sidebar__footer'}>
        © LiveRight DMCC, 2021 - Some Rights Reserved
      </p>
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
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: normal;
  color: ${(p) => p.theme.vars.colors.defaultWhite};
  text-decoration: none;
  &:hover {
    color: ${(p) => p.theme.vars.colors.neutral_50};
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
  color: ${(p) => p.theme.vars.colors.neutral_50};
  font-size: 0.875rem;
  line-height: 1.75rem;
  font-weight: normal;
`
IdentitySidebar.Subtitle = styled.div`
  color: ${(p) => p.theme.vars.colors.neutral_40};
  font-size: 1rem;
  font-weight: normal;
`
IdentitySidebar.Hr = styled.div`
  margin: 50px 0;
  border-top 0;
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.neutral_40};
  max-width: 50px;
`
IdentitySidebar.Space = styled.div`
  margin-top: 40px;
`
export default IdentitySidebar
