import api from '../../managers/api.manager'
import { EP_STRIPE_CHECKOUT } from '../../enums/api.enum'

export async function getStripeKey(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function generatePaymentIntent(invoiceId: number) {
  const response = await api.post(EP_STRIPE_CHECKOUT, {
    invoice_id: invoiceId,
    payment_method_id: 1
  })
  return response.data.data
}
