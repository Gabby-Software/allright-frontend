import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FieldProps, Field, FormikProps } from 'formik'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import FormError from '../../components/forms/form-error/form-error.component'
import logger from '../../managers/logger.manager'
import { EP_GET_TRAINER, EP_GET_USER } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import userTypes from '../../enums/user-types.enum'
import { AccountType } from '../../modules/auth/account.type'
import { ProfileFormType } from '../profile/profile.type'
import { OnBoardContext } from './onboard.context'

const Styles = styled.label`
  .form-cbx {
    &__cont {
      ${(p) => p.theme.extend.flexCenter}
      justify-content: flex-start;
    }
    &__input {
    }
    &__label {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
      a {
        color: ${(p) => p.theme.vars.colors.primary};
      }
    }
  }
`

const TnbCheckbox = () => {
  const { t } = useTranslation()
  const [tnb, setTnb] = useState<string>('')
  const [form, setForm] = useState<FormikProps<ProfileFormType> | null>(null)
  const { step } = useContext(OnBoardContext)
  useEffect(() => {
    if (!form) return
    api
      .get(EP_GET_TRAINER)
      .then((res) => res.data.data)
      .then((res) =>
        res.accounts.find((acc: AccountType) => acc.type === userTypes.TRAINER)
      )
      .then((res) => res?.profile?.terms_and_conditions)
      .then((res) => {
        logger.info('TRAINER', res?.url, form, form?.values.tnb)
        setTnb(res?.url || '')
        form?.setFieldValue('tnb', false)
      })
      .catch((e) => console.error(e))
  }, [form])
  useEffect(() => {
    form?.setFieldValue('tnb', !tnb)
    form?.setFieldTouched('tnb', false)
  }, [tnb, step])
  return (
    <Field name={'tnb'}>
      {({ field, form: formik }: FieldProps) => {
        logger.info('FORM?FORMIK', field.value)
        if (!form) {
          setForm(formik)
        }
        if (!tnb) return null

        return (
          <Styles className={'form-cbx__wrapper'}>
            <div className={'form-cbx__cont'}>
              <input
                className={'form-cbx__input'}
                type={'checkbox'}
                {...field}
                checked={field.value}
              />
              <span className={'form-cbx__label'}>
                {t('auth:accept-tnb')}{' '}
                <a target={'_blank'} rel={'noreferrer'} href={tnb}>
                  {t('auth:tnb')}
                </a>
              </span>
            </div>
            <FormError name={'tnb'} />
          </Styles>
        )
      }}
    </Field>
  )
}

export default TnbCheckbox
