import styled from 'styled-components'

export default styled.div`
  .text_input {
    &__cont {
      position: relative;
      display: block;
    }
    &__label {
      color: ${(p) => p.theme.vars.colors.neutral_60};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
      text-align: left;
    }
    &__input {
      resize: none;
      display: block;
      background-color: ${(p) => p.theme.vars.colors.gray_1};
      border: 1px solid ${(p) => p.theme.vars.colors.neutral_30};
      color: ${(p) => p.theme.vars.colors.primaryDark};
      padding: 14px 16px;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      height: unset;
      @media all and (max-width: ${(p) => p.theme.vars.media.mobile}px) {
        height: 88px;
      }
      &:focus {
        border-color: ${(p) => p.theme.vars.colors.inputBorder};
      }
    }
  }
`
