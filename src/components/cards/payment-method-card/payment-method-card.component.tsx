import { ReactNode } from 'react'

import { Styles } from './payment-method-card.styles'

interface PaymentMethodCardProps {
  title: string
  icons?: ReactNode
  active?: boolean
  disabled?: boolean
  cardNumber?: string
  cardExpiry?: string
  onClick?: () => void
}

export default function PaymentMethodCard({
  title,
  icons,
  active,
  disabled,
  cardNumber,
  cardExpiry,
  onClick
}: PaymentMethodCardProps) {
  return (
    <Styles $active={active} $disabled={disabled} onClick={onClick}>
      <div className="payment-method-card">
        <div className="payment-method-card__item">
          <div className="payment-method-card__circle" />
          <p className="payment-method-card__label">{title}</p>
        </div>

        <div className="payment-method-card__item">{icons}</div>
      </div>
      {!disabled && (
        <div className="payment-info">
          <p>{cardNumber ? `XXXX XXXX XXXX ${cardNumber}` : ''}</p>
          <p>{cardExpiry || ''}</p>
        </div>
      )}
    </Styles>
  )
}
