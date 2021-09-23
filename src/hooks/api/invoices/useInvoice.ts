import useSWR from 'swr'

import { EP_GET_INVOICES } from '../../../enums/api.enum'
import { getInvoice } from '../../../services/api/invoices'
import { InvoiceFullType } from '../../../types/invoice.type'

export interface UseInvoice {
  invoice: InvoiceFullType
  isInvoiceLoading: boolean
}

interface UseInvoiceConfig {
  mutate?: any
  id?: number
}

export default function useInvoice(config: UseInvoiceConfig = {}): UseInvoice {
  const { data, error } = useSWR(
    config.id ? EP_GET_INVOICES + `/${config.id}` : null,
    getInvoice
  )

  const isInvoiceLoading = !data && !error
  const invoice = data || {}

  return {
    isInvoiceLoading,
    invoice
  }
}
