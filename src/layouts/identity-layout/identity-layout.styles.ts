import styled from 'styled-components'

export default styled.div`
  display: flex;
  font-family: 'Work Sans', sans-serif;
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
  .layout {
    &__main {
      width: 100%;
      height: 100vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
    &__wrapper {
      padding: 80px 0 180px 0;
      margin: auto;
      width: 100%;
      max-width: 395px;
    }
  }
`
