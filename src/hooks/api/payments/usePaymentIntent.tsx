import { useEffect, useState } from 'react'
import { generatePaymentIntent } from '../../../services/api/payments'

interface UsePaymentIntent {
  clientSecret: string
}

export default function usePaymentIntent(invoiceId?: number): UsePaymentIntent {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    if (invoiceId) {
      generatePaymentIntent(invoiceId)
        .then((e) => {
          setClientSecret(e.client_secret)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [invoiceId])

  return {
    clientSecret
  }
}
