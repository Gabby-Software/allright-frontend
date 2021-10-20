import api from '../../managers/api.manager'
import { EP_MARK_INVOICE_AS_PAID } from '../../enums/api.enum'

export async function getInvoice(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function markPainInvoice(id: number) {
  const response = await api.post(EP_MARK_INVOICE_AS_PAID(id))
  return response.data
}

