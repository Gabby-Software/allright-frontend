import api from './api.manager'

export type AddressDefaultsType = {
  country_code: string
  city: string
  postal_code: string
  lang_code: string
}
type IPStackCurrency = {
  code: string
  name: string
  plural: string
  symbol: string
  symbol_native: string
}
type IPStackType = {
  ip: string
  type: string
  continent_code: string
  continent_name: string
  country_code: string
  country_name: string
  region_code: string
  region_name: string
  city: string
  zip: string
  latitude: number
  longitude: number
  currency: IPStackCurrency
}
const getDefaults: () => Promise<AddressDefaultsType> = () => {
  return api
    .get('https://api.db-ip.com/v2/free/self')
    .then((res) => res.data.ipAddress)
    .then((ip) =>
      api.get<IPStackType>(
        `https://api.ipstack.com/${ip}?access_key=${process.env.REACT_APP_IPSTACK_KEY}`
      )
    )
    .then((res) => res.data)
    .then(({ country_code, city, zip, currency, region_name }) => ({
      country_code,
      city,
      postal_code: zip,
      currency: currency.code,
      region_name,
      lang_code: navigator.language.substring(0, 2)
    }))
}
export const ipstack = {
  getDefaults
}
