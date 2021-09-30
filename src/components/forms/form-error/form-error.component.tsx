import { ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles from './form-error.styles'
export type FormErrorProps = { name: string; className?: string }
export type FormErrorType = string | { key: string; values: any }
const FormError = ({ name }: FormErrorProps) => {
  const { t } = useTranslation()
  return (
    <ErrorMessage name={name}>
      {(msg: FormErrorType) => (
        <Styles className={'form__error'}>
          {typeof msg === 'string'
            ? t(`errors:${msg}`)
            : t(`errors:${msg.key}`, msg.values)}
        </Styles>
      )}
    </ErrorMessage>
  )
}

export default FormError
