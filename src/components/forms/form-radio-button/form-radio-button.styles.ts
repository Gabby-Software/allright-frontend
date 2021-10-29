import styled from 'styled-components'

import RadioButton from '../../../assets/media/icons/radio-button.svg'
import brand from '../../../config/branding.config'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

const Styles = styled.div`
  .radio {
    display: flex;
    &__label {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      transition: ${(p) => p.theme.vars.defaults.transition};
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
      text-align: left;
      @media (max-width: ${(p) => p.theme.vars.media.mobile}px) {
        margin-top: 22px;
      }
    }
    &__cont {
    }
    &__button {
      width: 100%;
      ${(p) => p.theme.extend.flexCenter}
      justify-content:flex-start;
      margin-right: 1rem;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      border: 1px solid ${(p) => p.theme.vars.colors.inputBorder};
      color: ${(p) => p.theme.vars.colors.inputBorder};
      font-weight: 500;
      font-size: 14px;
      padding: 13px 12px;
      transition: ${(p) => p.theme.vars.defaults.transition};
      cursor: pointer;
      ${(p) => p.theme.extend.radioCircle}
      &:last-child {
        margin-right: 0;
      }
      &__active {
        color: ${(p) => p.theme.vars.colors.primaryDark};
        background-color: ${(p) => p.theme.vars.colors.card};
        border-color: ${(p) => p.theme.vars.colors.card};
      }
    }
  }
`

const RadioWithBrandStyles = styled(Styles)<any>`
  .radio__button {
    background-color: ${(p) => p.theme.vars.colors.gray_1};
    color: ${(p) => p.theme.vars.colors.neutral_60};
    border: 1px solid ${(p) => p.theme.vars.colors.gray_1};
    // position: relative;
    // padding-left: 42px;
    &:before {
      content: '';
      display: block;
      border-radius: 50%;
      border: 2px solid ${(p) => p.theme.vars.colors.neutral_60};
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      padding: 2px;
      margin-right: 13px;
    }
    &__active {
      background-color: ${(p) =>
        p.disabled ? getColorCarry('neutral_10') : getColorCarry('primaryTransparent')};
      border: 1px solid
        ${(p) =>
          p.disabled ? getColorCarry('neutral_10') : getColorCarry('primary')};
      color: ${(p) =>
        p.disabled ? getColorCarry('neutral_60') : getColorCarry('primary')};
      &:before {
        background: transparent;
        border: 5px solid
          ${(p) =>
            p.disabled ? getColorCarry('neutral_60') : getColorCarry('primary')};
      }
    }
  }
`

export { RadioWithBrandStyles }
export default Styles
