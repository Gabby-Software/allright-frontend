import { Field, FieldProps } from 'formik'
import React, { useEffect, useState } from 'react'

import FormRow from '../../../../components/forms/form-row/form-row.component'
import { useAuth } from '../../../../hooks/use-auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { date } from '../../../../pipes/date.pipe'
import { OnBoardItemType } from '../../../onboard/onboard.type'
import Styles from './profile-field.styles'

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
