import React, { useState, useEffect } from 'react'
import Styles from './profile-field.styles'
import FormRow from '../../../../components/forms/form-row/form-row.component'
import { Field, FieldProps } from 'formik'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useAuth } from '../../../../hooks/use-auth.hook'
import { OnBoardItemType } from '../../../onboard/onboard.type'
import { date } from '../../../../pipes/date.pipe'

const ProfileField = ({ name, label, data, type }: OnBoardItemType) => {
  const { t } = useTranslation()
  const { country } = useAuth()
  if (type === 'row')
    return (
      <FormRow>
        {data?.map((d) => (
          <ProfileField key={d.type} {...d} />
        ))}
      </FormRow>
    )
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <Styles>
          <div className={'field__name'}>{t(label || '')}</div>
          <div className={'field__value'}>
            {type === 'radio'
              ? t(`profile:${field.value}`)
              : type === 'country-select'
              ? country?.name_english
              : type === 'date'
              ? date(field.value)
              : field.value}
          </div>
        </Styles>
      )}
    </Field>
  )
}

export default ProfileField
