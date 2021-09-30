import { useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  AmexIcon,
  BtcIcon,
  CaretDownIcon,
  CheckmarkIcon,
  McIcon,
  SecureIcon,
  VisaIcon
} from '../../assets/media/icons'
import Button from '../../components/buttons/button/button.component'
import Card from '../../components/cards/card/card.component'
import PaymentMethodCard from '../../components/cards/payment-method-card/payment-method-card.component'
import Page from '../../components/containers/page/page.component'
import Input from '../../components/form/input/input.component'
import CreditCardForm from '../../components/payments/credit-card-form/credit-card-form.component'
import UserBadge from '../../components/user-badge/user-badge.component'
import useInvoice from '../../hooks/api/invoices/useInvoice'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { mainHost } from '../../pipes/main-host'
import { isEatRight } from '../../utils/domains'
import { Styles, Success } from './invoice-pay.styles'

type Method = 'card' | 'crypto' | null

export default function InvoicePay() {
  const [method, setMethod] = useState<Method>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const [isSuccess, setSuccess] = useState(false)

  const { invoice } = useInvoice({ id: params.id })

  if (isSuccess) {
    return (
      <Page>
        <Success>
          <div className="invoice-pay-success__icon">
            <CheckmarkIcon />
          </div>

          <p className="invoice-pay-success__title">Thank You</p>
          <p className="invoice-pay-success__subtitle">
            Coach got your payment
          </p>

          <a href={`${mainHost()}/invoices/${params.id}`}>
            <Button>Get Back</Button>
          </a>
        </Success>
      </Page>
    )
  }

  return (
    <Page>
      <Styles $expand={detailsOpen}>
        <div className="invoice-pay__details">
          <div className="invoice-pay__title-container">
            <h2 className="invoice-pay__title">
              Invoice <span>#{invoice.invoice_number}</span>
            </h2>
          </div>

          <div className="invoice-pay__from">
            <p className="invoice-pay__label">From</p>

            <UserBadge
              firstName={invoice.invoice_from?.user?.first_name}
              lastName={invoice.invoice_from?.user?.last_name}
              avatar={invoice.invoice_from?.user?.avatar?.url}
              size="sm"
            />
          </div>

          {isMobile && (
            <div
              className="invoice-pay__expand"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <p className="invoice-pay__expand-text">
                <span>See Invoice Details</span>
                <CaretDownIcon />
              </p>
            </div>
          )}

          {(isMobile ? detailsOpen : true) && (
            <>
              {invoice.items?.map((item) => (
                <div className="invoice-pay__items" key={item.id}>
                  <div className="invoice-pay__item-card">
                    <div className="invoice-pay__item-card-row">
                      <p className="invoice-pay__item-card-text">
                        {item.type === 'meal_plan' ? 'Meal Plan' : item.type}
                      </p>
                      <p className="invoice-pay__item-card-text">
                        {item.total} AED
                      </p>
                    </div>
                    <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                      {item.description}
                    </p>
                    <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                      {item.quantity}x + {item.unit_price} AED + VAT (
                      {item.tax_rate}%)
                    </p>
                  </div>
                </div>
              ))}

              <div className="invoice-pay__summary">
                <div className="invoice-pay__summary-row">
                  <p className="invoice-pay__summary-text">Subtotal</p>
                  <span>{invoice.subtotal} AED</span>
                </div>
                <div className="invoice-pay__summary-row">
                  <p className="invoice-pay__summary-text">
                    Tax ({invoice.tax_rate}%)
                  </p>
                  <span>{invoice.tax_value} AED</span>
                </div>
                <div className="invoice-pay__summary-row">
                  <p className="invoice-pay__summary-row-text">
                    Voucher/Coupon
                  </p>
                  <span>-</span>
                </div>
              </div>

              <div className="invoice-pay__total">
                <p className="invoice-pay__total-text">Total Payable</p>
                <span>{invoice.total} AED</span>
              </div>
            </>
          )}
        </div>

        <div className="invoice-pay__payment">
          <Card color="secondary">
            <h2 className="invoice-pay__payment-title">
              Total Payable
              <span>{invoice.total} AED</span>
            </h2>

            {isEatRight() && (
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
            )}

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

                {method === 'card' && (
                  <CreditCardForm
                    hint={`*Your card will be charged for a one-time payment of ${invoice.total} AED once you submit`}
                    invoiceId={invoice.id}
                    onSuccess={() => setSuccess(true)}
                  />
                )}

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

            <div>
              <Button
                className="invoice-pay__submit"
                htmlType="submit"
                id="pay-invoice-submit"
                form="pay-invoice-form"
              >
                Pay {invoice.total} AED
              </Button>
            </div>
          </Card>
        </div>
      </Styles>
    </Page>
  )
}
