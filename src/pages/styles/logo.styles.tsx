import styled from 'styled-components'

import config from '../../config/branding.config'
const Logo = config.logo
export default styled(Logo)`
  width: 106px;
  height: auto;
  color: ${(p) => p.theme.vars.colors.primaryDark};
  margin: 45px 0 43px 0;
  @media all and (max-height: 800px) {
    width: 106px;
    margin: 22px 0 44px 0;
  }
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    margin-top: 25px;
  }
`
