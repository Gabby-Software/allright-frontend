import { Radio } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

type AdrressRadioProps = {
  id: string
  label: string
  className?: string
  name: string
  checked?: boolean
  defaultChecked?: boolean
  value?: string | number | boolean
  onChange?: (e?: any) => void
}

const Wrapper = styled.div`
  [type='radio'] {
    display: none;
  }

  label {
    display: flex;
    cursor: pointer;
  }

  label::before {
    content: '';
    width: 18px;
    height: 18px;
    background: blue;
    border-radius: 50%;
    display: inline-block;
  }

  [type='radio']:checked + label::before {
    display: inline-block;
    content: '';
    border-radius: 50%;
    border-width: 3px;
    border: 6px solid ${getColorCarry('primary')};
    width: 18px;
    height: 18px;
    background-color: transparent;
  }

  [type='radio'] + label::before {
    display: inline-block;
    content: '';
    border-radius: 50%;
    border-width: 3px;
    border: 6px solid ${getColorCarry('neutral_70')};
    width: 18px;
    height: 18px;
    background-color: transparent;
    margin-right: 10px;
  }

  [type='radio']:checked + label {
    color: ${getColorCarry('primary')};
  }
`

export const Radio_2 = styled(Radio)`

  .ant-radio-inner {
    border-width: 5px;
  }
  .ant-radio-checked {
    + span {
      color: ${getColorCarry('primary')};
    }
    .ant-radio-inner {
      border-color: ${getColorCarry('primary')};
      &:after {
        opacity: 0;
      }
    }
  }

  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none;
  }

  .ant-radio-inner {
    width: 18px;
    height: 18px;
  }
`

export default function AddressRadioButton({
  id,
  label,
  className,
  name,
  checked,
  defaultChecked,
  onChange
}: AdrressRadioProps) {
  return (
    <>
      <Wrapper>
        <input
          name={name}
          type="radio"
          id={id}
          className={className}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <label htmlFor={id} className={`${className}__label`}>
          {label}
        </label>
      </Wrapper>
    </>
  )
}
