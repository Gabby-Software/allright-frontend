import { Field, FieldProps } from 'formik'
import { useState } from 'react'

import { classes } from '../../../pipes/classes.pipe'
import { OptionType } from '../../../types/option.type'
import FormError from '../form-error/form-error.component'
import Styles, { RadioWithBrandStyles } from './form-radio-button.styles'

type Props = {
  name: string
  label: string
  options: OptionType[]
  brandColors?: boolean
  onChange?: (params?: any) => void
  noForm?: boolean
  defaultValue?: string
  disabled?: boolean
}
const FormRadio = ({
  name,
  label,
  options,
  brandColors = false,
  onChange,
  noForm = false,
  defaultValue,
  disabled
}: Props) => {
  const [active, setActive] = useState(defaultValue)
  const Wrapper = brandColors ? RadioWithBrandStyles : Styles
  return noForm || disabled ? (
    <Wrapper className={'radio__wrapper'} disabled={disabled}>
      <div className={'radio__label'}>{label}</div>
      <div className={'radio__cont'}>
        <div className={'radio'}>
          {options.map(({ value, label }) => (
            <div
              key={label}
              tabIndex={1}
              className={classes(
                'radio__button',
                value === active && 'radio__button__active'
              )}
              onClick={() => {
                if (!disabled) {
                  setActive(value)
                  onChange && onChange(value)
                }
              }}
              // onBlur={form.handleBlur}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  ) : (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Wrapper className={'radio__wrapper'}>
          <div className={'radio__label'}>{label}</div>
          <div className={'radio__cont'}>
            <div className={'radio'}>
              {options.map(({ value, label }) => (
                <div
                  key={label}
                  tabIndex={1}
                  className={classes(
                    'radio__button',
                    value === field.value && 'radio__button__active'
                  )}
                  onClick={() => {
                    // onChange && onChange()
                    form.setFieldValue(name, value)
                  }}
                  onBlur={form.handleBlur}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
          <FormError name={name} />
        </Wrapper>
      )}
    </Field>
  )
}

export default FormRadio
