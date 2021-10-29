import { ThemeProvider as SThemeProvider } from 'styled-components'
import { PropsWithChildren } from 'react'
import { useAuth } from '../../hooks/use-auth.hook'
import theme from '../../assets/styles'
import userTypes from '../../enums/user-types.enum'

export default function ThemeProvider({ children }: PropsWithChildren<any>) {
  const auth = useAuth()
  return (
    <SThemeProvider
      theme={theme(
        auth.type === undefined ? undefined : auth.type === userTypes.CLIENT
      )}
    >
      {children}
    </SThemeProvider>
  )
}
