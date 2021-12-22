import { ReactComponent as EatrightIcon } from '../assets/media/eatright-logo-compact.svg'
import eatfavicon from '../assets/media/favicon-eat.ico'
import livefavicon from '../assets/media/favicon-live.ico'
import { ReactComponent as LiverightIcon } from '../assets/media/logo-compact.svg'
import { BrandingType } from '../types/branding.type'

const EAT_RIGHT_BRANDING: BrandingType = {
  primaryColor: '#96BE35',
  primaryLightColor: '#84a72f',
  primaryColor_2: '#f4f8ea',
  primaryColor_3: '',
  link: '#2E81ED',
  logo: EatrightIcon,
  icon: eatfavicon,
  name: 'EatRight',
  multiple_accounts: false,
  showUserInfo: false
}

const LIVE_RIGHT_BRANDING: BrandingType = {
  primaryColor: '#ED1731',
  primaryLightColor: '#ed4452',
  primaryColor_2: '#FFEBEB',
  primaryColor_3: '#FDB6B7',
  link: '#2E81ED',
  logo: LiverightIcon,
  icon: livefavicon,
  name: 'LiveRight',
  multiple_accounts: true,
  showUserInfo: true
}

const LIVE_RIGHT_TRAINER_BRANDING: BrandingType = {
  primaryColor: '#3FC9AD',
  primaryLightColor: '#8bdecd',
  primaryColor_2: '#e3f7f3',
  primaryColor_3: '#e3f7f3',
  link: '#E49A0A',
  logo: LiverightIcon,
  icon: livefavicon,
  name: 'LiveRight',
  multiple_accounts: true,
  showUserInfo: true
}

type Brands = { [key: string]: BrandingType }

const brands: Brands = {
  default: LIVE_RIGHT_BRANDING,
  localhost: EAT_RIGHT_BRANDING,
  'identity.liverightdev.xyz': LIVE_RIGHT_BRANDING,
  'identity.eatrightdev.xyz': EAT_RIGHT_BRANDING,
  'identity.liverightstaging.xyz': LIVE_RIGHT_BRANDING,
  'identity.eatrightstaging.xyz': EAT_RIGHT_BRANDING,
  'identity.theeatright.com': EAT_RIGHT_BRANDING,
  'payments.eatrightdev.xyz': EAT_RIGHT_BRANDING,
  'payments.eatrightstaging.xyz': EAT_RIGHT_BRANDING,
  'payments.theeatright.com': EAT_RIGHT_BRANDING,
  'payments.liverightdev.xyz': LIVE_RIGHT_BRANDING,
  'payments.liverightstaging.xyz': LIVE_RIGHT_BRANDING,
  'invoices.eatrightdev.xyz': EAT_RIGHT_BRANDING,
  'invoices.eatrightstaging.xyz': EAT_RIGHT_BRANDING,
  'invoices.theeatright.com': EAT_RIGHT_BRANDING,
  'invoices.liverightdev.xyz': LIVE_RIGHT_BRANDING,
  'invoices.liverightstaging.xyz': LIVE_RIGHT_BRANDING
}

export function getBrand(isClient?: boolean): BrandingType {
  const LIVE_RIGHT_BRAND =
    typeof isClient === 'boolean'
      ? isClient
        ? LIVE_RIGHT_BRANDING
        : LIVE_RIGHT_TRAINER_BRANDING
      : LIVE_RIGHT_BRANDING

  const brands: Brands = {
    default: LIVE_RIGHT_BRAND,
    localhost: EAT_RIGHT_BRANDING,
    'identity.liverightdev.xyz': LIVE_RIGHT_BRAND,
    'identity.eatrightdev.xyz': EAT_RIGHT_BRANDING,
    'identity.liverightstaging.xyz': LIVE_RIGHT_BRAND,
    'identity.eatrightstaging.xyz': EAT_RIGHT_BRANDING,
    'identity.theeatright.com': EAT_RIGHT_BRANDING,
    'payments.eatrightdev.xyz': EAT_RIGHT_BRANDING,
    'payments.eatrightstaging.xyz': EAT_RIGHT_BRANDING,
    'payments.theeatright.com': EAT_RIGHT_BRANDING,
    'payments.liverightdev.xyz': LIVE_RIGHT_BRAND,
    'payments.liverightstaging.xyz': LIVE_RIGHT_BRAND,
    'invoices.eatrightdev.xyz': EAT_RIGHT_BRANDING,
    'invoices.eatrightstaging.xyz': EAT_RIGHT_BRANDING,
    'invoices.theeatright.com': EAT_RIGHT_BRANDING,
    'invoices.liverightdev.xyz': LIVE_RIGHT_BRAND,
    'invoices.liverightstaging.xyz': LIVE_RIGHT_BRAND
  }

  return NODE_ENV === 'development' && REACT_APP_LOCAL_DEV_MODE === 'liveright'
    ? brands.default
    : brands[document.location.hostname]
}

const branding = new Proxy(brands, {
  get: (target, prop: string) => target[prop] || target['default']
})

const { NODE_ENV, REACT_APP_LOCAL_DEV_MODE } = process.env

const brand: BrandingType =
  NODE_ENV === 'development' && REACT_APP_LOCAL_DEV_MODE === 'liveright'
    ? branding.default
    : branding[document.location.hostname]

;(document.head.querySelector('[rel="icon"]') as HTMLLinkElement).href =
  brand.icon

export default brand
