import { getBrand } from '../../config/branding.config'

export const vars = (isClient?: boolean) => {
  const brand = getBrand(isClient)
  return {
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
      red_80: '#D70004',
      blue_60: '#2E81ED',
      defaultBlack: '#2E2F31',

      primary_v2: '#EF1733',
      background_v2: '#F1F4F7',
      primaryDark_v2: '#2E2F31',
      primaryDark2_v2: '#404040',
      dark_v2: '#757575',
      secondary1_v2: '#E4E8ED',
      secondary2_v2: '#9E9E9E',
      secondary3_v2: '#F8F8F8',
      secondary4_v2: '#5E5E5E',
      secondary5_v2: '#A1ADB9',
      secondary6_v2: '#8A95A7',
      secondary7_v2: '#A7B8D2',
      secondary8_v2: '#D0D9E8',
      inputBorder_v2: '#E0E0E0',
      link: brand.link,
      link_lighten: '#82B8FA',
      link_darken: '#2871d0',
      link_bg: '#EBF4FF',
      chat_blue: '#DFE6F1',
      chat_dark: '#404040',
      orange: '#E48713',
      orange_90: '#FF9900',
      blue_20: '#D0E6FE',
      blue_40: '#82B8FA',
      blue_50: '#549BF5',
      blue_80: '#0053D7',
      red_40: '#FA8284',
      red_60: '#ED2E32',
      red_100: '#870002',
      green_10: '#F2FFF2',
      green_20: '#D7FED6',
      green_90: '#00B334',
      green_80: '#00D721',
      yellow_20: '#FEFAD0',
      yellow_60: '#EDD92E',
      yellow_80: '#EDD92E',
      orange_100: '#FF6B2C',
      orange_60: '#ED9C30',
      orange_20: '#FEEED6'
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
      font: "'Circular Std', sans-serif"
    }
  }
}

const varsObj = vars(false)
export type VarsType = typeof varsObj

export default vars(false)
