import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { screenSizes } from '../../enums/screen-sizes.enum'

export default styled(Link)`
  display: block;
  font-weight: 400;
  color: #333333;
  font-size: 14px;
  text-align: right;
  margin-top: 24px;
  &:hover {
    color: #333333;
    text-decoration: underline;
  }

  @media (max-width: ${screenSizes.MOBILE}px) {
    color: ${(p) => p.theme.vars.colors.neutral_80};
  }
`
