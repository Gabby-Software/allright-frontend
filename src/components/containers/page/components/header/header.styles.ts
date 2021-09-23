import styled from 'styled-components'
import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  height: 72px;
  background-color: #fff;
  display: flex;
  align-items: center;
  
  .header {
    &__content {
      width: 100%;
      max-width: 1060px;
      margin: 0 auto;
      padding: 0 1.25rem 0 1.25rem;
    }
    
    &__logo {
      height: 40px;
      width: auto;
    }
  }

  @media ${mediaQueries.MOBILE} {
    border-bottom: 1px solid ${getColorCarry('neutral_30')};
  }
`
