import styled from 'styled-components'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  margin-bottom: 1.5rem;

  .credit-card {
    &__field {
      height: 46px;
      border: 1px solid ${getColorCarry('neutral_40')};
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      background-color: #fff;
      
      &-container {
        width: 100%;

        &_expiry {
          width: 100px;
        }

        &_cvv {
          width: 75px;
        }
      }

      & > div {
        width: 100%;
      }

      &-label {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_100')};
        margin-bottom: 0.5rem;
      }
    }

    &__row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
    
    &__hint {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_60')};
    }
  }
`
