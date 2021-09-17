import { ComponentType } from 'react'

export type BrandingType = {
  logo: ComponentType<any>
  primaryColor: string
  primaryLightColor: string
  icon: string
  name: string
  multiple_accounts: boolean
}
