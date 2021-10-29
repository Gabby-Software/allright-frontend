import styled from 'styled-components'

import { getColor, getColorCarry } from '../../../pipes/theme-color.pipe'
import { getHeight } from '../utils.styles'

export default styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  & .input__input {
    height: ${getHeight};
    border-radius: 0.625rem;
    font-size: 0.875rem;
    color: ${getColorCarry('neutral_100')};
    padding: 0 1rem;

    &.ant-input-disabled {
      color: rgba(0, 0, 0, 0.25);
    }

    & .ant-input-prefix,
    & .ant-input-suffix {
      color: ${getColorCarry('neutral_70')};
    }

    & .ant-input-prefix {
      margin-right: 0.625rem;
    }
    & .ant-input-suffix {
      margin-left: 0.625rem;
    }

    &:hover,
    &:focus,
    &:focus-within {
      border-color: ${(props) =>
        props.$disabled ? '' : getColor(props, 'link')};
    }
  }
`
