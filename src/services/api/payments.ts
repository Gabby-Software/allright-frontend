import api from '../../managers/api.manager'

export async function getStripeKey(url: string) {
  const response = await api.get(url)
  return response.data.data
}
