import { ReactComponent as EatrightIcon } from '../assets/media/eatright-logo-compact.svg'
import eatfavicon from '../assets/media/favicon-eat.ico'
import livefavicon from '../assets/media/favicon-live.ico'
import { ReactComponent as LiverightIcon } from '../assets/media/logo-compact.svg'
import { BrandingType } from '../types/branding.type'

const brands: { [key: string]: BrandingType } = {
  default: {
    primaryColor: '#ED1731',
    primaryLightColor: '#ed4452',
    primaryColor_2: '#FFEBEB',
    primaryColor_3: '#FDB6B7',
    logo: LiverightIcon,
    icon: livefavicon,
    name: 'LiveRight',
    multiple_accounts: true,
    showUserInfo: true
  },
  'identity.liverightdev.xyz': {
    primaryColor: '#ED1731',
    primaryColor_2: '#FFEBEB',
    primaryColor_3: '#FDB6B7',
    primaryLightColor: '#ed4452',
    logo: LiverightIcon,
    icon: livefavicon,
    name: 'LiveRight',
    multiple_accounts: true,
    showUserInfo: true
  },
  'identity.eatrightdev.xyz': {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    primaryColor_2: '#f4f8ea',
    primaryColor_3: '',
    logo: EatrightIcon,
    icon: eatfavicon,
    name: 'EatRight',
    multiple_accounts: false,
    showUserInfo: false
  },
  'identity.liverightstaging.xyz': {
    primaryColor: '#ED1731',
    primaryLightColor: '#ed4452',
    primaryColor_2: '#FFEBEB',
    primaryColor_3: '#FDB6B7',
    logo: LiverightIcon,
    icon: livefavicon,
    name: 'LiveRight',
    multiple_accounts: true,
    showUserInfo: true
  },
  'identity.eatrightstaging.xyz': {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    primaryColor_2: '#f4f8ea',
    primaryColor_3: '',
    logo: EatrightIcon,
    icon: eatfavicon,
    name: 'EatRight',
    multiple_accounts: false,
    showUserInfo: false
  },
  'payments.eatrightdev.xyz': {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    primaryColor_2: '#f4f8ea',
    primaryColor_3: '',
    logo: EatrightIcon,
    icon: eatfavicon,
    name: 'EatRight',
    multiple_accounts: false,
    showUserInfo: false
  },
  'payments.eatrightstaging.xyz': {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    primaryColor_2: '#f4f8ea',
    primaryColor_3: '',
    logo: EatrightIcon,
    icon: eatfavicon,
    name: 'EatRight',
    multiple_accounts: false,
    showUserInfo: false
  },
  localhost: {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    primaryColor_2: '#f4f8ea',
    primaryColor_3: '',
    logo: EatrightIcon,
    icon: livefavicon,
    name: 'Localhost',
    multiple_accounts: false,
    showUserInfo: false
  }
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
