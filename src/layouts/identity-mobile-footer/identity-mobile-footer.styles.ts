import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  padding: 24px 33px 30px;
  border-top: 1px solid ${getColorCarry('neutral_30')};
  font-weight: 400;
  font-size: 12px;
  margin-top: 36px;
  display: flex;
  flex-direction: column-reverse;
  .footer {
    &__copyright {
      margin-top: 20px;
      text-align: center;
      color: ${(p) => p.theme.vars.colors.neutral_60};
    }
    &__links {
      ${(p) => p.theme.extend.flexCenter}
      justify-content: space-between;
      margin-top: 18px;
    }
    &__link {
      color: ${(p) => p.theme.vars.colors.neutral_80};
      &:hover {
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
    }
  }
`
