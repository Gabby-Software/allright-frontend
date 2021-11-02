import { useState } from 'react'

import { toast } from '../../../components/toast/toast.component'
import { applyCoupon } from '../../../services/api/coupons'

interface UseApplyCoupon {
  coupon: string
  setCoupon: (coupon: string) => void
  applyData: any
  isCouponApplying: boolean
  couponError: string | null
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
  const [couponError, setCouponError] = useState(null)

  const onApplyCoupon = async (
    invoice_id: number,
    invoice_amount: number,
    onSuccess?: () => void
  ) => {
    try {
      setIsCouponApplying(true)
      setCouponError(null)
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
        msg: error.response?.data?.errors?.code
          ? 'Invalid Coupon! try entering a valid one.'
          : error.response?.data?.message
          ? error.response?.data?.message
          : error.response?.message
      })
      setCouponError(
        error.response?.data?.errors?.code
          ? 'Invalid Coupon! try entering a valid one.'
          : error.response?.data?.message
          ? error.response?.data?.message
          : error.response?.message
      )
    }
  }

  return {
    coupon,
    setCoupon,
    applyData,
    isCouponApplying,
    couponError,
    onApplyCoupon
  }
}

export default useAppyCoupon
