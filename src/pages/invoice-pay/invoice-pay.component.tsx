import Page from '../../components/containers/page/page.component'
import { Styles } from './invoice-pay.styles'
import Card from '../../components/cards/card/card.component'
import UserBadge from '../../components/user-badge/user-badge.component'
import Button from '../../components/buttons/button/button.component'
import Input from '../../components/form/input/input.component'
import PaymentMethodCard from '../../components/cards/payment-method-card/payment-method-card.component'
import {
  AmexIcon,
  BtcIcon,
  McIcon,
  SecureIcon,
  VisaIcon,
} from '../../assets/media/icons'
import { useState } from 'react'

type Method = 'card' | 'crypto' | null

export default function InvoicePay() {
  const [method, setMethod] = useState<Method>(null)
  return (
    <Page>
      <Styles>
        <div className="invoice-pay__details">
          <div className="invoice-pay__title-container">
            <h2 className="invoice-pay__title">
              Invoice <span>#12345</span>
            </h2>
          </div>

          <div className="invoice-pay__from">
            <p className="invoice-pay__label">From</p>

            <UserBadge firstName="Coach" lastName="Rob" size="sm" />
          </div>

          <div className="invoice-pay__items">
            <div className="invoice-pay__item-card">
              <div className="invoice-pay__item-card-row">
                <p className="invoice-pay__item-card-text">Coaching</p>
                <p className="invoice-pay__item-card-text">450 AED</p>
              </div>
              <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                Consultation for one
              </p>
              <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                1x + 451 AED + VAT (5%)
              </p>
            </div>
          </div>

          <div className="invoice-pay__summary">
            <div className="invoice-pay__summary-row">
              <p className="invoice-pay__summary-text">Subtotal</p>
              <span>900 AED</span>
            </div>
            <div className="invoice-pay__summary-row">
              <p className="invoice-pay__summary-text">Tax (3%)</p>
              <span>34 AED</span>
            </div>
            <div className="invoice-pay__summary-row">
              <p className="invoice-pay__summary-row-text">Voucher/Coupon</p>
              <span>-</span>
            </div>
          </div>

          <div className="invoice-pay__total">
            <p className="invoice-pay__total-text">Total Payable</p>
            <span>934 AED</span>
          </div>
        </div>

        <div className="invoice-pay__payment">
          <Card color="secondary">
            <h2 className="invoice-pay__payment-title">
              Total Payable
              <span>934 AED</span>
            </h2>

            <div className="invoice-pay__payment-voucher">
              <p className="invoice-pay__payment-label">
                Do you have a voucher or coupon?
              </p>

              <div className="invoice-pay__payment-input-container">
                <Input
                  id="invoice-voucher"
                  className="invoice-pay__payment-input"
                  placeholder="ex: FRXXX"
                />

                <Button variant="secondary">Apply</Button>
              </div>
            </div>

            <div>
              <p className="invoice-pay__payment-label">
                How would you like to pay?
              </p>

              <div>
                <PaymentMethodCard
                  active={method === 'card'}
                  onClick={() => setMethod('card')}
                  title="Credit Card"
                  icons={
                    <>
                      <VisaIcon />
                      <McIcon />
                      <AmexIcon />
                    </>
                  }
                />
                <PaymentMethodCard
                  disabled
                  title="Crypto"
                  onClick={() => setMethod('crypto')}
                  active={method === 'crypto'}
                  icons={
                    <>
                      <BtcIcon />
                    </>
                  }
                />
                <p className="invoice-pay__payment-hint">
                  <SecureIcon />
                  260bit secure encrypted payments
                </p>
              </div>
            </div>

            <Button className="invoice-pay__submit">
              Pay 902 AED
            </Button>
          </Card>
        </div>
      </Styles>
    </Page>
  )
}
