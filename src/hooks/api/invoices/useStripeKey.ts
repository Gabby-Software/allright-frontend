import useSWR from 'swr'
import { EP_STRIPE_KEY } from '../../../enums/api.enum'
import { getStripeKey } from '../../../services/api/payments'

interface StripeResponse {
  id: number
  is_instant: boolean
  is_manual: boolean
  name: string
  public_key: string
}

interface UseStripeKey {
  isLoading: boolean
  stripeConfig: StripeResponse
}

export default function useStripeKey(): UseStripeKey {
  const { data,error } = useSWR(EP_STRIPE_KEY, getStripeKey)

  const isLoading = !data && !error
  const stripe = data || {}
  return {
    isLoading,
    stripeConfig: stripe
  }
}
