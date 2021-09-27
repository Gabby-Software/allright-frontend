import { DatePicker } from 'antd'
import { DatePickerProps } from 'antd/es/date-picker'
import { Field, FieldProps } from 'formik'
import moment from 'moment'

import { ReactComponent as CalendarIcon } from '../../../assets/media/icons/calendar.svg'
import vars from '../../../assets/styles/_variables'
import FormError from '../form-error/form-error.component'
import Styles from './form-datepicker.styles'

type Props = DatePickerProps & {
  name: string
  label: string
  disabled?: boolean
  onUpdate?: (name: string, value: string) => void
}
const FormDatepicker = ({
  name,
  label,
  onUpdate,
  disabled,
  ...props
}: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'text_input__wrapper'}>
          <label className={'text_input__cont'}>
            <div className={'text_input__label'}>{label}</div>
            <DatePicker
              {...props}
              suffixIcon={<CalendarIcon color={vars.colors.neutral_70} />}
              disabled={disabled}
              defaultPickerValue={
                field.value ? moment(field.value) : moment().add(-16, 'years')
              }
              value={field.value ? moment(field.value) : null}
              className={'text_input__input'}
              onChange={(date, dateString: string) => {
                form.setFieldValue(name, dateString)
                onUpdate && onUpdate(name, dateString)
              }}
              onBlur={field.onBlur}
            />
          </label>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormDatepicker
