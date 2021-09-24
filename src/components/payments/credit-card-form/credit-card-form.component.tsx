import { Styles } from './credit-card-form.styles'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useStripeKey from '../../../hooks/api/invoices/useStripeKey'
import { useMemo } from 'react'
import { LoadingPlaceholder } from '../../placeholders'
import usePaymentIntent from '../../../hooks/api/payments/usePaymentIntent'
import { toast } from '../../toast/toast.component'

interface CreditCardFormProps {
  hint?: string
  invoiceId: number
  onSuccess: () => void
}

function Content({ hint, invoiceId, onSuccess }: CreditCardFormProps) {
  const { clientSecret } = usePaymentIntent(invoiceId)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()

      const submitBtn: HTMLButtonElement = document.getElementById(
        'pay-invoice-submit'
      ) as HTMLButtonElement

      if (!stripe || !elements || !clientSecret) {
        return
      }

      const cardElement = elements.getElement(CardNumberElement)

      if (!cardElement) {
        return
      }

      submitBtn.disabled = true

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement
          }
        }
      )

      if (error) {
        toast.show({
          type: 'error',
          msg: error.message || 'Oops! Something went wrong...'
        })

        submitBtn.disabled = false
      }

      if (paymentIntent?.status === 'succeeded') {
        onSuccess()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Styles>
      <form id="pay-invoice-form" onSubmit={handleSubmit}>
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
        {!!hint && <p className="credit-card__hint">{hint}</p>}
      </form>
    </Styles>
  )
}

export default function CreditCardForm(props: CreditCardFormProps) {
  const { stripeConfig } = useStripeKey()

  const stripePromise = useMemo(
    () =>
      stripeConfig.public_key ? loadStripe(stripeConfig.public_key) : null,
    [stripeConfig.public_key]
  )

  return !stripePromise ? (
    <LoadingPlaceholder />
  ) : (
    <Elements stripe={stripePromise}>
      <Content {...props} />
    </Elements>
  )
}
