import { useState } from 'react'

import { toast } from '../../../components/toast/toast.component'
import { applyCoupon } from '../../../services/api/coupons'

interface UseApplyCoupon {
  coupon: string
  setCoupon: (coupon: string) => void
  applyData: any
  isCouponApplying: boolean
  onApplyCoupon: (
    invoice_id: number,
    invoice_amount: number,
    onSuccess?: () => void
  ) => void
}

const useAppyCoupon = (): UseApplyCoupon => {
  const [coupon, setCoupon] = useState('')
  const [applyData, setApplyData] = useState(null)
  const [isCouponApplying, setIsCouponApplying] = useState(false)

  const onApplyCoupon = async (
    invoice_id: number,
    invoice_amount: number,
    onSuccess?: () => void
  ) => {
    try {
      setIsCouponApplying(true)
      const data = await applyCoupon({
        code: coupon,
        invoice_id,
        invoice_amount
      })
      setApplyData(data)
      setIsCouponApplying(false)
      onSuccess && onSuccess()
    } catch (error: any) {
      setIsCouponApplying(false)
      toast.show({
        type: 'error',
        msg: error.response?.data?.message
      })
    }
  }

  return {
    coupon,
    setCoupon,
    applyData,
    isCouponApplying,
    onApplyCoupon
  }
}

export default useAppyCoupon
