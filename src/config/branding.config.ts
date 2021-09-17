import { BrandingType } from '../types/branding.type'
import { ReactComponent as LiverightIcon } from '../assets/media/logo-compact.svg'
import { ReactComponent as EatrightIcon } from '../assets/media/eatright-logo-compact.svg'
import livefavicon from '../assets/media/favicon-live.ico'
import eatfavicon from '../assets/media/favicon-eat.ico'

const brands: { [key: string]: BrandingType } = {
  default: {
    primaryColor: '#ED1731',
    primaryLightColor: '#ed4452',
    logo: LiverightIcon,
    icon: livefavicon,
    name: 'LiveRight',
    multiple_accounts: true
  },
  'identity.liverightdev.xyz': {
    primaryColor: '#ED1731',
    primaryLightColor: '#ed4452',
    logo: LiverightIcon,
    icon: livefavicon,
    name: 'LiveRight',
    multiple_accounts: true
  },
  'identity.eatrightdev.xyz': {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    logo: EatrightIcon,
    icon: eatfavicon,
    name: 'EatRight',
    multiple_accounts: false
  },
  'identity.liverightstaging.xyz': {
    primaryColor: '#ED1731',
    primaryLightColor: '#ed4452',
    logo: LiverightIcon,
    icon: livefavicon,
    name: 'LiveRight',
    multiple_accounts: true
  },
  'identity.eatrightstaging.xyz': {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    logo: EatrightIcon,
    icon: eatfavicon,
    name: 'EatRight',
    multiple_accounts: false
  },
  localhost: {
    primaryColor: '#96BE35',
    primaryLightColor: '#84a72f',
    logo: EatrightIcon,
    icon: livefavicon,
    name: 'Localhost',
    multiple_accounts: true
  }
}
const branding = new Proxy(brands, {
  get: (target, prop: string) => target[prop] || target['default']
})

const { NODE_ENV, REACT_APP_LOCAL_DEV_MODE } = process.env

console.log({ NODE_ENV, REACT_APP_LOCAL_DEV_MODE })

const brand: BrandingType =
  NODE_ENV === 'development' && REACT_APP_LOCAL_DEV_MODE === 'liveright'
    ? branding.default
    : branding[document.location.hostname]
console.log(
  'BRAND',
  document.location.hostname,
  branding[document.location.hostname],
  brand
)
;(document.head.querySelector('[rel="icon"]') as HTMLLinkElement).href =
  brand.icon
export default brand
