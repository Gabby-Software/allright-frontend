import React, { useEffect, useState } from 'react'

import { ReactComponent as ViewIcon } from '../../../assets/media/icons/view_2.svg'
import { ReactComponent as ViewOffIcon } from '../../../assets/media/icons/view-off_2.svg'
import FormInputLabeled from '../form-input-labeled/form-input-labeled.component'

type FormPasswordPropsType = {
  name: string
  label: string
  onUpdate?: (name: string, value: string) => void
}
const types = {
  PASSWORD: 'password',
  TEXT: 'text'
}
const FormPassword = ({ name, label, onUpdate }: FormPasswordPropsType) => {
  const [type, setType] = useState(types.PASSWORD)
  return (
    <FormInputLabeled
      name={name}
      label={label}
      type={type}
      onUpdate={onUpdate}
      icon={
        type === types.PASSWORD ? (
          <ViewIcon color="inherit" onClick={() => setType(types.TEXT)} />
        ) : (
          <ViewOffIcon
            color="inherit"
            onClick={() => setType(types.PASSWORD)}
          />
        )
      }
    />
  )
}

export default FormPassword
