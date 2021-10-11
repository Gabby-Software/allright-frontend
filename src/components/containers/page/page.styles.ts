import styled from 'styled-components'
import { getColorCarry } from '../../../pipes/theme-color.pipe'
import { mediaQueries } from '../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #F1F4F7;
  font-family: 'Circular Std', sans-serif;
  color: ${getColorCarry('neutral_100')};

  .page {
    &__content {
      width: 100%;
      max-width: 1060px;
      margin: 0 auto;
      padding: 1.875rem 1.25rem 2rem 1.25rem;
    }
  }

  @media ${mediaQueries.MOBILE} {
    background-color: #fff;
  }
`
