import { Field, FieldProps } from 'formik'

import { classes } from '../../../pipes/classes.pipe'
import FormError from '../form-error/form-error.component'
import Styles, { FormSwitchNoBorder } from './form-switch.styles'

type Props = {
  name: string
  onUpdate?: (name: string, value: string) => void
  options: { label: string; value: string }[]
  border?: boolean
}

const FormSwitch = ({ name, options, onUpdate, border = false }: Props) => {
  const Wrapper = border ? FormSwitchNoBorder : Styles
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Wrapper className={'switch__wrapper'}>
          <div className={'switch__cont'}>
            <div className={'switch'}>
              <div
                className={'switch__activon'}
                style={{
                  width: `${100 / options.length}%`,
                  left:
                    (options.findIndex((o) => o.value === field.value) * 100) /
                      options.length +
                    '%'
                }}
              />
              {options.map((p) => (
                <div
                  key={p.value}
                  className={classes(
                    'switch__item',
                    field.value === p.value && 'switch__item__active'
                  )}
                  onClick={() => {
                    form.setFieldValue(name, p.value)
                    onUpdate && onUpdate(name, p.value)
                  }}
                >
                  <span>{p.label}</span>
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

export default FormSwitch
