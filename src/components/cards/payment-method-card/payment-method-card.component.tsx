import { Styles } from './payment-method-card.styles'
import { ReactNode } from 'react'

interface PaymentMethodCardProps {
  title: string
  icons?: ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function PaymentMethodCard({
  title,
  icons,
  active,
  disabled,
  onClick
}: PaymentMethodCardProps) {
  return (
    <Styles $active={active} $disabled={disabled} onClick={onClick}>
      <div className="payment-method-card__item">
        <div className="payment-method-card__circle" />
        <p className="payment-method-card__label">{title}</p>
      </div>

      <div className="payment-method-card__item">{icons}</div>
    </Styles>
  )
}
