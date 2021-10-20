import useSWR from 'swr'

import { EP_GET_INVOICES } from '../../../enums/api.enum'
import { getInvoice, markPainInvoice } from '../../../services/api/invoices'
import { InvoiceFullType } from '../../../types/invoice.type'
import { useState } from 'react'
import { toast } from '../../../components/toast/toast.component'

export interface UseInvoice {
  invoice: InvoiceFullType
  isInvoiceLoading: boolean
  onMarkPaid: (id: number) => void
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
    onMarkPaid
  }
}
