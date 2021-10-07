import React, { useEffect, useState } from 'react'

import { ReactComponent as ViewIcon } from '../../../assets/media/icons/view_2.svg'
import { ReactComponent as ViewOffIcon } from '../../../assets/media/icons/view-off_2.svg'
import FormInputLabeled from '../form-input-labeled/form-input-labeled.component'

type FormPasswordPropsType = {
  name: string
  label: string
  onUpdate?: (name: string, value: string) => void
  MaskIcon?: any
  UnmaskIcon?: any
}
const types = {
  PASSWORD: 'password',
  TEXT: 'text'
}
const FormPassword = ({
  name,
  label,
  onUpdate,
  MaskIcon,
  UnmaskIcon
}: FormPasswordPropsType) => {
  const [type, setType] = useState(types.PASSWORD)
  return (
    <FormInputLabeled
      name={name}
      label={label}
      type={type}
      onUpdate={onUpdate}
      icon={
        type === types.PASSWORD ? (
          <span onClick={() => setType(types.TEXT)}>
            {UnmaskIcon ? <UnmaskIcon /> : <ViewIcon color="inherit" />}
          </span>
        ) : (
          <span onClick={() => setType(types.PASSWORD)}>
            {MaskIcon ? <MaskIcon /> : <ViewOffIcon color="inherit" />}
          </span>
        )
      }
    />
  )
}

export default FormPassword
