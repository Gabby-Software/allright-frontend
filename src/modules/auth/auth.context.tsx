import React, {
  ComponentType,
  createContext,
  ElementType,
  useContext,
  useState
} from 'react'

import genderTypes from '../../enums/gender-types'
import userTypes from '../../enums/user-types.enum'
import { AuthFormFieldsType, AuthFormType } from './auth-form.type'

const searchParams = new URLSearchParams(location.search)

export const AuthFormContext = createContext<AuthFormType>(null)
export const AuthFormProvider = ({ children }: { children: any }) => {
  const [form, setForm] = useState<AuthFormFieldsType>({
    type: userTypes.CLIENT,
    first_name: searchParams.get('firstname') || '',
    last_name: searchParams.get('lastname') || '',
    email: searchParams.get('email') || '',
    password: searchParams.get('password') || '',
    new_password: '',
    confirm_new_password: '',
    gender: genderTypes.MALE
  })
  const update = (name: string, value: string) =>
    setForm({ ...form, [name]: value })
  return (
    <AuthFormContext.Provider value={{ form, update }}>
      {children}
    </AuthFormContext.Provider>
  )
}
