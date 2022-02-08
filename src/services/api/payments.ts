import { EP_STRIPE_CHECKOUT } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function getStripeKey(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function generatePaymentIntent(
  invoiceId: number,
  paymentMethodId?: string
) {
  const params = new URLSearchParams(window.location.search)

  const payload = {
    invoice_id: invoiceId,
    payment_method_id: 1,
    is_renewal: params.get('is_renewal') ? true : false
  } as any

  if (paymentMethodId) {
    payload.stripe_payment_method_id = paymentMethodId
  }

  const response = await api.post(EP_STRIPE_CHECKOUT, payload)

  return response.data.data
}
