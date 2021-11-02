import { EP_APPLY_COUPON } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export const applyCoupon = async (data: {
  code: string
  invoice_id: number
  invoice_amount: number
}) => {
  const res = await api.post(EP_APPLY_COUPON, data)
  return res.data.data
}
