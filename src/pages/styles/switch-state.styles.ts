import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.p<any>`
  font-size: 14px;
  color: ${(p) => p.theme.vars.colors.neutral_70};
  font-weight: 400;
  margin-top: 54px;
  margin-bottom: 0;
  @media all and (max-height: 800px) {
    margin-top: 20px;
  }
  @media ${mediaQueries.MOBILE} {
    margin-top: 65px;
  }
  a {
    margin-top: 10px;
    display: block;
    color: ${(p) => p.theme.vars.colors.primary};
    font-weight: 700;
    @media ${mediaQueries.MOBILE} {
      color: ${(p) =>
        p.back ? getColorCarry('defaultBlack') : getColorCarry('primary')};
    }
  }

  .black__link {
    color: ${(p) => p.theme.vars.colors.neutral_100};
  }

  .black__link {
    color: ${(p) => p.theme.vars.colors.neutral_100};
  }
`
