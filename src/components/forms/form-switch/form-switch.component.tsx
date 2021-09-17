import React, { useState, useEffect } from 'react'
import Styles from './form-switch.styles'
import { FormikProps, Field, FieldProps, ErrorMessage } from 'formik'
import { classes } from '../../../pipes/classes.pipe'
import FormError from '../form-error/form-error.component'

type Props = {
  name: string
  onUpdate?: (name: string, value: string) => void
  options: { label: string; value: string }[]
}
const FormSwitch = ({ name, options, onUpdate }: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'switch__wrapper'}>
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
        </Styles>
      )}
    </Field>
  )
}

export default FormSwitch
