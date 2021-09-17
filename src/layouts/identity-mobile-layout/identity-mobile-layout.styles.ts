import styled from 'styled-components'

export default styled.div`
  font-family: 'Work Sans', sans-serif;
  background-color: white;
  .center {
    text-align: center;
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
  .sign-up__skip {
    // @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    margin-top: 10px;
    //     position: absolute;
    //     top: -20px;
    //     right: 0;
    //     max-width: 100px;
    // }
  }
  .layout {
    &__title {
      font-weight: 700;
      font-size: 1.5rem;
      margin: 0 0 5px 0;
      @media all and (max-height: 700px) {
        margin-top: 0px;
      }
    }
    &__desc {
      font-size: 18px;
      margin: 0 auto 50px auto;
      color: ${(p) => p.theme.vars.colors.light2};
      max-width: 500px;
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
