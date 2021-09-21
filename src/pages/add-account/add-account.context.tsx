import React, { createContext, useState } from 'react'

export enum AddAccountSteps {
  SELECT_TYPE,
  ONBOARD
}
type AddAccountContextType = {
  accountType: string
  setAccountType: (type: string) => void
  step: AddAccountSteps
  setStep: (step: AddAccountSteps) => void
}
export const AddAccountContext = createContext<AddAccountContextType>({
  accountType: '',
  setAccountType: () => {},
  step: AddAccountSteps.SELECT_TYPE,
  setStep: () => {}
})
const AddAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [accountType, setAccountType] = useState<string>('')
  const [step, setStep] = useState<AddAccountSteps>(AddAccountSteps.SELECT_TYPE)
  return (
    <AddAccountContext.Provider
      value={{
        accountType,
        setAccountType,
        step,
        setStep
      }}
    >
      {children}
    </AddAccountContext.Provider>
  )
}
export default AddAccountProvider
