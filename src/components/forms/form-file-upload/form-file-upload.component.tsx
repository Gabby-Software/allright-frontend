import { Field, FieldProps, FormikProps } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'

import { TnCUploadIcon } from '../../../assets/media/icons'
import { ReactComponent as AddIcon } from '../../../assets/media/icons/add.svg'
import { ReactComponent as TrashIcon } from '../../../assets/media/icons/trash.svg'
import fileManager from '../../../managers/file.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { toast } from '../../toast/toast.component'
import FormError from '../form-error/form-error.component'
import Styles from './form-file-upload.styles'

type Props = {
  name: string
  label?: string
  initialFilename?: string
  onUpdate: (file: File | null) => void
  innerLabel?: boolean
  deleteIcon?: any
}
const FormFileUpload = ({
  name,
  label,
  initialFilename,
  onUpdate,
  innerLabel,
  deleteIcon
}: Props) => {
  const [filename, setFilename] = useState<string>(initialFilename || '')
  const { t } = useTranslation()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: FormikProps<any>
  ) => {
    if (!e?.target?.files || !e?.target?.files[0]) return
    const file = e?.target?.files[0]
    const size = file.size / 1024 / 1024
    if (size >= 5) {
      return toast.show({ type: 'error', msg: t('errors:max-filesize') })
    }
    fileManager.readAsUrl(e.target.files[0]).then((url) => {
      setFilename(file.name)
      form.setFieldValue(name, url)
      onUpdate && onUpdate(file)
    })
  }
  const remove = (form: FormikProps<any>) => {
    form.setFieldValue(name, '')
    setFilename('')
    onUpdate && onUpdate(null)
  }
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'file_input__wrapper'}>
          {label ? <div className={'file_input__label'}>{label}</div> : null}
          {form.values[name] ? null : (
            <label className={'file_input__add'}>
              {/* <AddIcon /> */}
              <TnCUploadIcon />
              <input
                type={'file'}
                accept={'.txt,.pdf,.doc'}
                style={{ display: 'none' }}
                onChange={(e) => handleChange(e, form)}
                onBlur={form.handleBlur}
                name={name}
              />
              {innerLabel && (
                <span className="file_input__inner_label">
                  Available formats: txt, pdf, doc
                </span>
              )}
            </label>
          )}
          {form.values[name] ? null : (
            <div className={'file_input__accept'}>
              {!innerLabel && 'Available formats: txt, pdf, doc'}
            </div>
          )}
          <div className={'file_input__bottom'}>
            <div className={'file_input__filename'}>{filename}</div>
            {field.value ? (
              <span
                className={'file_input__delete'}
                onClick={() => remove(form)}
              >
                {deleteIcon || t('remove')}
              </span>
            ) : null}
          </div>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormFileUpload
