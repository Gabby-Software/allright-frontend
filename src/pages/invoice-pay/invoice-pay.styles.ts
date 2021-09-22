import styled from 'styled-components'
import Card from '../../components/cards/card/card.component'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  display: flex;

  .invoice-pay {
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
    
    &__submit {
      width: 100%;
      margin-top: 3rem;
    }
  }
`
