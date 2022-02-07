import api from '../../managers/api.manager'
import { EP_STRIPE_CHECKOUT } from '../../enums/api.enum'

export async function getStripeKey(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function generatePaymentIntent(invoiceId: number) {
  const params = new URLSearchParams(window.location.search)

  const response = await api.post(EP_STRIPE_CHECKOUT, {
    invoice_id: invoiceId,
    payment_method_id: 1,
    is_renewal: params.get('is_renewal') ? true : false
  })
  return response.data.data
}
