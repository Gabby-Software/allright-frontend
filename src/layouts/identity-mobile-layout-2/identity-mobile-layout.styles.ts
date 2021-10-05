import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  font-family: 'Circular Std', sans-serif;
  background-color: white;
  .center {
    text-align: center;
  }
  .layout__header {
    background-color: white;
    text-align: center;
    padding: 1rem 20px;
  }
  .desktop {
    @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
      display: none;
    }
  }
  .switch__wrapper {
    margin-bottom: 54px;
    max-width: 320px;
    margin-right: auto;
    margin-left: auto;
  }
  .text_input__wrapper,
  .radio__wrapper,
  .textarea__wrapper {
    margin-bottom: 12px;
    @media all and (max-width: ${(p) => p.theme.vars.media.mobile}px) {
      margin-bottom: 22px;
    }
  }
  .sign-up__name {
    @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
      display: flex;
      justify-content: space-between;
      .text_input__wrapper {
        width: 48%;
      }
    }
  }
  .ant-btn {
    margin-top: 36px;
  }
  @media (max-width: ${(p) => p.theme.vars.media.mobile}px) {
    .ant-btn {
      margin-top: 0;
      &.button-submit {
        margin-top: 44px;
      }
      &.confirm__cancel-btn {
        margin-top: 1rem;
        border-color: ${getColorCarry('blue_60')};
        color:  ${getColorCarry('blue_60')};
      }
    }
  }
  .sign-up__skip {
    margin-top: 10px;
  }
  .layout {
    &__title {
      font-weight: 700;
      font-size: 1.375rem;
      margin: 0 0 5px 0;
      @media all and (max-height: 700px) {
        margin-top: 0px;
      }
    }
    &__desc {
      font-size: 18px;
      margin: 0 auto 70px auto;
      color: ${getColorCarry('neutral_70')};
      max-width: 500px;
      font-weight: 400;
      text-align: center;
      @media (max-width: ${(p) => p.theme.vars.media.mobile}px) {
        font-size: 14px;
      }
    }
    &__hr {
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
        border-bottom: 1px solid ${(p) => p.theme.vars.colors.secondary};
        max-width: 164px;
        margin: 15px auto;
      }
    }
  }
`
