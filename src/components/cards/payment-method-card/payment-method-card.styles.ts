import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  padding: 1rem;
  border: 1px solid ${getColorCarry('neutral_30')};
  border-radius: 10px;
  margin-bottom: 1.25rem;
  cursor: pointer;

  &:hover {
    border-color: ${getColorCarry('primary')};

    .payment-method-card {
      &__circle {
        border-color: ${getColorCarry('primary')};
        border-width: 5px;
        background-color: #fff;
      }
    }
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: ${getColorCarry('primaryTransparent')};
      border-color: ${getColorCarry('primary')};
    `}

  ${(props) =>
    props.$disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.75;
    `}

  .payment-method-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__item {
      display: flex;
      align-items: center;

      & svg {
        margin-right: 0.25rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__circle {
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      border: 1px solid ${getColorCarry('neutral_100')};
      margin-right: 0.625rem;

      ${(props) =>
        props.$active &&
        css`
          border-color: ${getColorCarry('primary')};
          border-width: 5px;
          background-color: #fff;
        `}
    }
  }

  .payment-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    color: ${getColorCarry('neutral_60')};
  }
`
