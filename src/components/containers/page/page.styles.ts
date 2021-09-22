import styled from 'styled-components'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
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
      padding-top: 1.875rem;
    }
  }
`
