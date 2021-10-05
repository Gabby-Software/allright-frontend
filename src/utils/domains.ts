import brand from '../config/branding.config'

export function isEatRight() {
  return (
    brand.name.toLowerCase().includes('eat') ||
    brand.name.toLowerCase().includes('local')
  )
}
