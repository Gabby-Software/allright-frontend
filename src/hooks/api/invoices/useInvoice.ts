import useSWR from 'swr'

import { EP_GET_INVOICES } from '../../../enums/api.enum'
import {
  getInvoice,
  markPainInvoice,
  sendInvoice
} from '../../../services/api/invoices'
import { InvoiceFullType } from '../../../types/invoice.type'
import { toast } from '../../../components/toast/toast.component'

export interface UseInvoice {
  invoice: InvoiceFullType
  isInvoiceLoading: boolean
  onMarkPaid: (id: number) => void
  onSend: (id: number) => void
  mutate: any
}

interface UseInvoiceConfig {
  mutate?: any
  id?: number
}

export default function useInvoice(config: UseInvoiceConfig = {}): UseInvoice {
  const { data, error, mutate } = useSWR(
    config.id ? EP_GET_INVOICES + `/${config.id}` : null,
    getInvoice
  )

  const onSend = async (id: number) => {
    try {
      await sendInvoice(id)
      config.mutate?.()
      mutate()

      toast.show({
        type: 'success',
        msg: 'Invoice sent to client'
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onMarkPaid = async (id: number) => {
    try {
      await markPainInvoice(id)
      config.mutate?.()
      mutate()

      toast.show({
        type: 'success',
        msg: 'Invoice marked as paid'
      })
    } catch (e) {
      console.error(e)
    }
  }

  const isInvoiceLoading = !data && !error
  const invoice = data || {}

  return {
    isInvoiceLoading,
    invoice,
    onMarkPaid,
    onSend,
    mutate
  }
}
