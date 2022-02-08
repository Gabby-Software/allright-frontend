import styled from 'styled-components'
import Card from '../../components/cards/card/card.component'
import { getColorCarry } from '../../pipes/theme-color.pipe'
import { mediaQueries } from '../../enums/screen-sizes.enum'

export const Success = styled(Card)`
  padding: 4rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .invoice-pay-success {
    &__icon {
      width: 119px;
      height: 119px;
      border-radius: 9999px;
      background-color: ${getColorCarry('primaryTransparent')};
      color: ${getColorCarry('primary')};
      margin-bottom: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        width: 50px;
        height: 50px;
      }
    }

    &__title {
      font-size: 1.325rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.5rem;
    }

    &__subtitle {
      font-size: 0.875rem;
      font-weight: 400;
      text-align: center;
      margin-bottom: 3rem;
    }
  }
`

export const Styles = styled(Card)<any>`
  display: flex;

  .invoice-pay {
    &__link {
      text-decoration: none;
      color: #ff6b2c;
      display: flex;
      align-items: flex-end;
      margin-bottom: 1rem;
    }

    &__details {
      width: 100%;
      max-width: 60%;
      min-width: 60%;
      padding-right: 3rem;
    }
    
    &__payment {
      width: 100%;
      max-width: 40%;
      min-width: 40%;
      
      &-input {
        margin-right: 1rem;
        
        &-container {
          display: flex;
        }

        &.error {
          input {
            border: 2px solid ${getColorCarry('error')};
          }
        }

        &-errorMessage {
          margin: 8px 0;
          color: ${getColorCarry('error')}
        }
      }
      
      &-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.375rem;
        font-weight: 700;
        margin-bottom: 3rem;
        
        & span {
          font-size: 2rem;
        }
      }
      
      &-label {
        font-size: 0.875rem;
        font-weight: 400;
        margin-bottom: 0.625rem;
      }
      
      &-voucher {
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid ${getColorCarry('neutral_30')};
      }
      
      &-hint {
        display: flex;
        align-items: center;
        color: ${getColorCarry('neutral_70')};
        
        & svg {
          margin-right: 0.5rem;
        }
      }
    }
    
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: #2E2F31;
      
      & span {
        color: #1268E4;
      }
      
      &-container {
        margin-bottom: 1.5rem;
      }
    }
    
    &__expand {
      margin-bottom: ${(props) => (props.$expand ? '1.5rem' : '0')};
      
      &-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
      }
    }
    
    &__from {
      margin-bottom: 3rem;
    }
    
    &__label {
      font-size: 0.875rem;
      color: #9E9E9E;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
    
    &__items {
      padding-bottom: 1.875rem;
      margin-bottom: 1.875rem;
      border-bottom: 1px solid ${getColorCarry('neutral_30')};
    }
    
    &__item-card {
      padding: 1rem;
      background-color: ${getColorCarry('neutral_10')};
      color: ${getColorCarry('neutral_100')};
      
      &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      &-text {
        font-size: 0.875rem;
        font-weight: 700;
        
        &_secondary {
          font-size: 1rem;
          font-weight: 400;
          color: ${getColorCarry('neutral_90')};
        }
      }
    }
    
    &__summary {
      color: ${getColorCarry('neutral_100')};
      padding-bottom: 1.875rem;
      margin-bottom: 1.875rem;
      border-bottom: 1px solid ${getColorCarry('neutral_30')};
      
      &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.875rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        & span {
          font-weight: 700;
        }
      }
    }
    
    &__total {
      font-size: 1rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    &__update-card {
      width: 100%;
      margin-bottom: 20px;
    }

    &__submit {
      width: 100%;
      margin-top: 3rem;
    }

    &__applied-coupon {
      display: inline-block;
      margin: 10px 0;

      svg {
        display: inline-block;
      }

      p {
        margin: 0;
        margin-left: 10px;
        display: inline-block;
      }
    }
  }

  @media ${mediaQueries.MOBILE} {
    flex-direction: column;
    padding: 0;

    .invoice-pay {
      &__details {
        width: 100%;
        max-width: 100%;
        min-width: auto;
        padding-right: 0;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid ${getColorCarry('neutral_30')};
        margin-bottom: 1.875rem;
      }

      &__payment {
        width: 100%;
        max-width: 100%;
        min-width: auto;

        &-title {
          font-size: 1rem;

          & span {
            font-size: 1.375rem;
          }
        }
      }

      &__title {
        font-size: 1.375rem;

        &-container {
          margin-bottom: 2rem;
        }
      }
    }
`
