import styled from 'styled-components'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  /* font-family: 'Work Sans', sans-serif; */
  font-family: 'Circular Std', sans-serif;
  ${(p) => p.theme.extend.flexCenter}
  justify-content: flex-center;
  background-color: white;
  .center {
    text-align: center;
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
    margin-bottom: 1.375rem;
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
  @media all and (max-width: ${(p) => p.theme.vars.media.mobile}px) {
    .text_input__wrapper {
      margin-bottom: 22px;
    }
  }
  .ant-btn {
    margin-top: 36px;
    font-size: 1rem;
  }
  .layout {
    &__main {
      width: 100%;
      height: 100vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
    &__wrapper {
      padding: 80px 0 0 0;
      margin: auto;
      width: 100%;
      max-width: 395px;
    }
  }
  .goBackLink {
    margin: 20px;

    a {
      color: ${getColorCarry('link')};
    }

    & svg {
      display: inline-block;
      margin: 0 rem(6px) rem(3px) 0;
    }
  }
`
