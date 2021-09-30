import brand from '../../config/branding.config'

const vars = {
  colors: {
    primary: brand.primaryColor,
    primaryLight: brand.primaryLightColor,
    primaryTransparent: brand.primaryColor_2,
    defaultWhite: '#FFFFFF',
    primaryDark: '#40424D',
    secondary: '#BDBDBD',
    secondary2: '#d5d5d5',
    secondary3: '#818799',
    gray_1: '#F8F8F8',
    neutral_10: '#FAFAFA',
    neutral_30: '#EDEDED',
    neutral_40: '#E0E0E0',
    neutral_50: '#C2C2C2',
    neutral_60: '#9E9E9E',
    neutral_70: '#757575',
    neutral_80: '#5E5E5E',
    neutral_90: '#404040',
    neutral_100: '#2E2F31',
    red_10: '#FFEBEB',
    red: '#EF1733',
    dark: '#5A5A5A',
    dark2: '#39393d',
    light: '#EBEBEB',
    light2: '#a8a8a8',
    card: '#fbfbfb',
    labelLight: '#72727a',
    inputBorder: '#dfdfdf',
    background: '#fafafa',
    error: '#ED1731',
    success: '#56EC53',
    successDark: '#43b840',
    info: '#2F86EC',
    blue_70: '#1268E4',
    warning: '#FC7D08',
    warningDark: '#c46106',
    red_70: '#E41216',
    red_80: '##D70004',
    blue_60: '#2E81ED',
    defaultBlack: '#2E2F31'
  },
  sizes: {
    borderRadius: '6px',
    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.15)'
  },
  zIndex: {
    header: 40,
    footer: 40,
    modal: 50,
    toast: 49
  },
  media: {
    desktop: 1100,
    tablet: 720,
    mobile: 540
  },
  defaults: {
    transition: 'all .3s ease',
    // font: "'Work Sans', sans-serif"
    font: "'Circular Std', sans-serif"
  }
}

export type VarsType = typeof vars
export default vars
