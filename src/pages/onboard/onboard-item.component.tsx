import { ArrayHelpers, Field, FieldArray, FieldProps } from 'formik'
import React, { useContext } from 'react'

import FormCountrySelect from '../../components/forms/form-country-select/form-country-select.component'
import FormDatepicker from '../../components/forms/form-datepicker/form-datepicker.component'
import FormInputLabeled from '../../components/forms/form-input-labeled/form-input-labeled.component'
import FormPassword from '../../components/forms/form-password/form-password.component'
import FormPhone from '../../components/forms/form-phone/form-phone.component'
import FormRadio from '../../components/forms/form-radio-button/form-radio-button.component'
import FormRow, {
  FormRowColumn
} from '../../components/forms/form-row/form-row.component'
import FormTextarea from '../../components/forms/form-textarea/form-textarea.component'
import { useIsMobile } from '../../hooks/is-mobile.hook'
// import { AuthFormContext } from '../../modules/auth/auth.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { OnBoardContext } from './onboard.context'
import { OnBoardItemType } from './onboard.type'
import TnbCheckbox from './onboard-tnb.component'

const OnboardItem = ({
  type,
  name,
  label,
  data,
  options,
  props
}: OnBoardItemType) => {
  // console.log(type)
  const { update } = useContext(OnBoardContext)
  const { t } = useTranslation()
  const labels = data?.map(({ label }) => label)
  const isMobile = useIsMobile()

  const orientation =
    isMobile &&
    labels?.includes('profile:city') &&
    labels?.includes('profile:postal-code')
      ? 'onboard__row'
      : 'onboard__column'

  const FormRowWrapper =
    (labels?.includes('profile:phone') && labels?.includes('profile:phone')) ||
    (labels?.includes('profile:new-password') &&
      labels?.includes('profile:confirm-password'))
      ? FormRowColumn
      : FormRow

  switch (type) {
    case 'row':
      return (
        <FormRowWrapper className={orientation}>
          {data?.map((p) => (
            <OnboardItem key={p.name} {...p} />
            // why the need for recursion here?
            // ans: If the type prop is 'row', then the data prop will not be undefined, this is then used to render multiple inputs.
          ))}
        </FormRowWrapper>
      )
    case 'text':
      // console.log('name', name);
      return (
        <FormInputLabeled
          {...props}
          name={name || ''}
          label={t(label || '')}
          onUpdate={update}
        />
      )
    case 'phone':
      return (
        <FormPhone name={name || ''} label={t(label || '')} onUpdate={update} />
      )
    case 'country-select':
      return (
        <FormCountrySelect
          name={name}
          label={t(label || '')}
          onUpdate={update}
        />
      )
    case 'textarea':
      return (
        <FormTextarea
          name={name || ''}
          label={t(label || '')}
          onUpdate={update}
        />
      )
    case 'date':
      return (
        <FormDatepicker
          {...props}
          name={name || ''}
          label={t(label || '')}
          onUpdate={update}
        />
      )
    case 'radio':
      return (
        <FormRadio
          name={name || ''}
          label={t(label || '')}
          options={options || []}
        />
      )
    case 'password':
      return (
        <FormPassword
          name={name || ''}
          label={t(label || '')}
          onUpdate={update}
        />
      )
    case 'checkbox':
      return <TnbCheckbox />
    case 'list':
      return (
        <Field name={name}>
          {({ field }: FieldProps) => (
            <FieldArray name={name || ''}>
              {(helpers: ArrayHelpers) =>
                field.value.map((_: any, i: number) =>
                  data?.map((d) => (
                    <OnboardItem
                      {...d}
                      name={`${name}[${i}].${d.name}`}
                      key={i}
                    />
                  ))
                )
              }
            </FieldArray>
          )}
        </Field>
      )
  }
  return null
}

export default OnboardItem
