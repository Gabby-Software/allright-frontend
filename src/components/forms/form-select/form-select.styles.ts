import styled from 'styled-components'

export const MobileStyles = styled.div`
  .select_input {
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
      display: block;
      padding: 14px 16px;
      border: 1px solid #c4c4c4;
      color: ${(p) => p.theme.vars.colors.dark};
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      outline: none;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      &:focus {
        border-color: black;
      }

      .ant-select-selector {
        background-color: transparent;
        border: 0px;
        height: 22px;
        padding: 0px;
        .ant-select-selection-item {
          line-height: 24px;
        }
      }
    }
  }
`

export const DesktopStyles = styled.div`
  width: 100%;
  .select_input {
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
  }
  .ant-select {
    display: block;
    padding: 9px 3px;
    border: 1px solid ${(p) => p.theme.vars.colors.neutral_30};
    color: ${(p) => p.theme.vars.colors.dark};
    border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
    outline: none;
    width: 100%;
    box-sizing: border-box;
    svg {
      transform-origin: center center;
      transition: ${(p) => p.theme.vars.defaults.transition};
    }
    &-selector {
      border: none !important;
      background: none !important;
      cursor: pointer;
      box-shadow: none !important;
    }
    &-selection-item {
      text-align: left;
    }
    &-open {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`
