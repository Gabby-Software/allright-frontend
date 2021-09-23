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
  CaretDownIcon,
  McIcon,
  SecureIcon,
  VisaIcon
} from '../../assets/media/icons'
import { useState } from 'react'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useParams } from 'react-router-dom'
import useInvoice from '../../hooks/api/invoices/useInvoice'
import CreditCardForm  from '../../components/payments/credit-card-form/credit-card-form.component'

type Method = 'card' | 'crypto' | null

export default function InvoicePay() {
  const [method, setMethod] = useState<Method>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()

  const { invoice } = useInvoice({ id: params.id })

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
                      <p className="invoice-pay__item-card-text">{item.type}</p>
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

                {method === 'card' && (
                  <CreditCardForm hint="*Your card will be charged for a one-time payment of 902 AED once you submit" />
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

            <Button className="invoice-pay__submit">
              Pay {invoice.total} AED
            </Button>
          </Card>
        </div>
      </Styles>
    </Page>
  )
}
