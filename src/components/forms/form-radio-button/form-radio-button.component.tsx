import { Field, FieldProps } from 'formik'

import { classes } from '../../../pipes/classes.pipe'
import { OptionType } from '../../../types/option.type'
import FormError from '../form-error/form-error.component'
import Styles, { RadioWithBrandStyles } from './form-radio-button.styles'

type Props = {
  name: string
  label: string
  options: OptionType[]
  brandColors?: boolean
}
const FormRadio = ({ name, label, options, brandColors = false }: Props) => {
  const Wrapper = brandColors ? RadioWithBrandStyles : Styles
  return (
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
                  onClick={() => form.setFieldValue(name, value)}
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
