import { Styles } from './credit-card-form.styles'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useStripeKey from '../../../hooks/api/invoices/useStripeKey'
import { useMemo } from 'react'
import { LoadingPlaceholder } from '../../placeholders'

interface CreditCardFormProps {
  hint?: string
}

export default function CreditCardForm({ hint }: CreditCardFormProps) {
  const { stripe } = useStripeKey()

  const stripePromise = useMemo(
    () => (stripe.public_key ? loadStripe(stripe.public_key) : null),
    [stripe.public_key]
  )

  return (
    <Styles>
      {!stripePromise ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <Elements stripe={stripePromise}>
            <div className="credit-card__row">
              <div className="credit-card__field-container">
                <p className="credit-card__field-label">Credit Card Number</p>
                <div className="credit-card__field">
                  <CardNumberElement />
                </div>
              </div>
            </div>

            <div className="credit-card__row">
              <div className="credit-card__field-container credit-card__field-container_expiry">
                <p className="credit-card__field-label">Month / Year</p>
                <div className="credit-card__field">
                  <CardExpiryElement />
                </div>
              </div>

              <div className="credit-card__field-container credit-card__field-container_cvv">
                <p className="credit-card__field-label">CVV</p>
                <div className="credit-card__field">
                  <CardCvcElement />
                </div>
              </div>
            </div>
          </Elements>
          {!!hint && <p className="credit-card__hint">{hint}</p>}
        </>
      )}
    </Styles>
  )
}
