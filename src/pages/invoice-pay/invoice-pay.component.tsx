import { useState } from 'react'
import { useParams } from 'react-router-dom'

import EatRightProfile from '../../assets/media/eatright-profile.png'
import {
  AmexIcon,
  // BtcIcon,
  CaretDownIcon,
  CheckmarkIcon,
  GreenCheckIcon,
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
import { LoadingPlaceholder } from '../../components/placeholders'
import UserBadge from '../../components/user-badge/user-badge.component'
import useAppyCoupon from '../../hooks/api/coupon/useApplyCoupon'
import useInvoice from '../../hooks/api/invoices/useInvoice'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useAuth } from '../../hooks/use-auth.hook'
import { mainHost } from '../../pipes/main-host'
import { InvoiceItemType } from '../../types/invoice.type'
import { isEatRight } from '../../utils/domains'
import PageNotFound from '../page-not-found/page-not-found.component'
import { Styles, Success } from './invoice-pay.styles'

type Method = 'card' | 'crypto' | null

export default function InvoicePay() {
  const [method, setMethod] = useState<Method>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const [isSuccess, setSuccess] = useState(false)
  const auth = useAuth()

  if (!auth.uuid) {
    return <PageNotFound />
  }

  const { invoice, mutate } = useInvoice({ id: params.id })
  const {
    coupon,
    setCoupon,
    applyData,
    isCouponApplying,
    couponError,
    onApplyCoupon
  } = useAppyCoupon()

  const renderItemType = (item: InvoiceItemType) => {
    if (item.type === 'fee' && item.name === 'Bag deposit fee') {
      return 'Bag deposit fee'
    } else if (item.type === 'meal_plan') {
      return 'Meal Plan'
    }

    return item.type
  }

  if (isSuccess) {
    return (
      <Page>
        <Success>
          <div className="invoice-pay-success__icon">
            <CheckmarkIcon />
          </div>

          <p className="invoice-pay-success__title">Thank You</p>
          <p className="invoice-pay-success__subtitle">
            {isEatRight() ? "We've got your payment" : 'Coach got your payment'}
          </p>

          <a
            href={
              isEatRight() ? mainHost() : `${mainHost()}/invoices/${params.id}`
            }
          >
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
            {isEatRight() ? (
              <UserBadge
                firstName="Eat"
                lastName="Right"
                avatar={EatRightProfile}
                size="md"
              />
            ) : (
              <UserBadge
                firstName={invoice.invoice_from?.user?.first_name}
                lastName={invoice.invoice_from?.user?.last_name}
                avatar={invoice.invoice_from?.user?.avatar?.url}
                size="sm"
              />
            )}
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
                        {renderItemType(item)}
                      </p>
                      <p className="invoice-pay__item-card-text">
                        {item.total} AED
                      </p>
                    </div>
                    <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                      {item.name === 'Bag deposit fee' ? '' : item.description}
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
                  <span>
                    -{' '}
                    {`${
                      applyData?.discount_amount || invoice.discount_amount || 0
                    } AED`}
                  </span>
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
                    className={`invoice-pay__payment-input${
                      couponError ? ' error' : ''
                    }`}
                    placeholder="ex: FRXXX"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  {isCouponApplying ? (
                    <LoadingPlaceholder />
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        onApplyCoupon(
                          invoice.id,
                          Math.round(invoice.total),
                          () => {
                            mutate()
                          }
                        )
                      }}
                    >
                      Apply
                    </Button>
                  )}
                </div>
                {couponError && (
                  <p className="invoice-pay__payment-input-errorMessage">
                    {couponError}
                  </p>
                )}
                {applyData && (
                  <div className="invoice-pay__applied-coupon">
                    <GreenCheckIcon />
                    <p>Voucher Applied</p>
                  </div>
                )}
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
                    hint={
                      invoice.is_subscription
                        ? `*Your card will be weekly charged for a payment of ${invoice.total} AED and once you submit`
                        : `*Your card will be charged for a one-time payment of ${invoice.total} AED once you submit`
                    }
                    invoiceId={invoice.id}
                    onSuccess={() => setSuccess(true)}
                  />
                )}

                {/* <PaymentMethodCard
                  disabled
                  title="Crypto"
                  onClick={() => setMethod('crypto')}
                  active={method === 'crypto'}
                  icons={
                    <>
                      <BtcIcon />
                    </>
                  }
                /> */}

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
