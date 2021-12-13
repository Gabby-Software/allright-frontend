import styled from 'styled-components'

export default styled.div`
  .text_input {
    &__cont {
      position: relative;
      display: block;
    }
    &__content {
      position: relative;
      svg {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 16px;
        margin: auto;
        &:not(.text_input__error) {
          width: 18px;
          cursor: pointer;
          z-index: 2;
          &:active + svg {
            display: none;
          }
        }

        &.right40 {
          right: 40px;
        }
      }
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
      display: block;
      padding: 14px 16px;
      border: 1px solid ${(p) => p.theme.vars.colors.neutral_30};
      color: ${(p) => p.theme.vars.colors.dark};
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        border-color: black;
        & + svg + svg.text_input__error {
          display: none;
        }
        & ~ svg:not(.text_input__error) {
          display: block;
        }
      }
      &:disabled {
        color: ${(p) => p.theme.vars.colors.secondary};
      }
    }
  }

  &.text_input {
    &__error {
      .text_input {
        &__input {
          border-color: ${(p) => p.theme.vars.colors.error};
          padding-right: 40px;
          &:not(:focus) + svg {
            opacity: 0;
          }
        }
      }
      svg {
        color: ${(p) => p.theme.vars.colors.error};
      }
    }
    &__icon {
      .text_input {
        &__input {
          padding-right: 40px;
        }
      }
    }
  }
`
