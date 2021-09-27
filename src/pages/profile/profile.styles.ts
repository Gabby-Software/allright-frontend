import styled from 'styled-components'

export default styled.div`
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    display: flex;
  }
  .profile {
    &__main {
      width: 100%;
      max-width: 1080px;
      @media all and (max-width: ${(p) => p.theme.vars.media.tablet - 1}px) {
        padding: 0 20px 120px 20px;
      }
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
        padding: 40px;
        margin: 40px auto;
      }
    }
  }
  [class$='input__wrapper'],
  .radio__wrapper,
  .textarea__wrapper,
  .text_input__wrapper {
    margin-bottom: 24px;
  }
`
