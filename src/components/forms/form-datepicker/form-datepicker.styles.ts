import styled from 'styled-components'

// color: ${(p) => p.theme.vars.colors.dark2};
export default styled.div`
  .ant-picker-suffix {
    color: ${(p) => p.color};
  }
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
      outline: none;
      box-shadow: none;
      display: block;
      padding: 14px 16px;
      border: 1px solid #c4c4c4;
      color: ${(p) => p.theme.vars.colors.dark};
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      &:focus,
      &.ant-picker-focused {
        border-color: ${(p) => p.theme.vars.colors.inputBorder};
      }
    }
  }
`
