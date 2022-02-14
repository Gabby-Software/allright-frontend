import { useEffect, useState } from 'react'

import { generatePaymentIntent } from '../../../services/api/payments'

interface UsePaymentIntent {
  clientSecret: string
}

export default function usePaymentIntent(
  invoiceId?: number,
  paymentMethodId?: string
): UsePaymentIntent {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    if (invoiceId) {
      generatePaymentIntent(invoiceId, paymentMethodId)
        .then((e) => {
          setClientSecret(e.client_secret)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [invoiceId, paymentMethodId])

  return {
    clientSecret
  }
}
