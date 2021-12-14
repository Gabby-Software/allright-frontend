import { Field, FieldProps } from 'formik'
import React, { useEffect, useState } from 'react'

import { ReactComponent as WarningIcon } from '../../../assets/media/icons/warning.svg'
import logger from '../../../managers/logger.manager'
import { classes } from '../../../pipes/classes.pipe'
import FormError from '../form-error/form-error.component'
import Styles from './form-input-labeled.styles'

type Props = {
  name: string
  label: string
  type?: string
  icon?: React.ReactNode
  onUpdate?: (name: string, value: string) => void
  disabled?: boolean
}
const FormInputLabeled = ({
  name,
  label,
  type,
  onUpdate,
  icon,
  disabled
}: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles
          className={classes(
            'text_input__wrapper',
            form.errors[name] && form.touched[name] && 'text_input__error',
            icon && 'text_input__icon'
          )}
        >
          <label className={'text_input__cont'}>
            <div className={'text_input__label'}>{label}</div>
            <div className={'text_input__content'}>
              <input
                className={'text_input__input'}
                type={type || 'text'}
                name={name}
                value={field.value}
                onBlur={field.onBlur}
                disabled={disabled}
                onChange={(e) => {
                  form.setFieldValue(name, e.target.value)
                  onUpdate && onUpdate(name, e.target.value)
                }}
              />
              {icon || null}
              {form.errors[name] && form.touched[name] ? (
                <WarningIcon
                  className={`text_input__error ${icon && 'right40'}`}
                />
              ) : null}
            </div>
          </label>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormInputLabeled
