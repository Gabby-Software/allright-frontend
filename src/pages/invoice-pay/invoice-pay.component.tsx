import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import EatRightProfile from '../../assets/media/eatright-profile.png'
import {
  AmexIcon,
  // BtcIcon,
  CaretDownIcon,
  CaretLeftIcon,
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
import { EP_CARDS } from '../../enums/api.enum'
import useAppyCoupon from '../../hooks/api/coupon/useApplyCoupon'
import useInvoice from '../../hooks/api/invoices/useInvoice'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useAuth } from '../../hooks/use-auth.hook'
import api from '../../managers/api.manager'
import { mainHost } from '../../pipes/main-host'
import { InvoiceItemType } from '../../types/invoice.type'
import { isEatRight } from '../../utils/domains'
import PageNotFound from '../page-not-found/page-not-found.component'
import { Styles, Success } from './invoice-pay.styles'

type Method = 'card' | 'crypto' | null

export default function InvoicePay() {
  const [method, setMethod] = useState<Method>('card')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const formRef = useRef<any>()
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const [isSuccess, setSuccess] = useState(false)
  const auth = useAuth()
  const [updateCreditCard, setUpdateCreditCard] = useState(false)
  const [savedCardNumber, setSavedCardNumber] = useState('')
  const [savedCardExpiry, setSavedCardExpiry] = useState('')
  const [paymentMethodId, setPaymentMethodId] = useState('')

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

  useEffect(() => {
    api
      .get(EP_CARDS)
      .then((res) => res.data.data)
      .then((res) => {
        if (res?.length) {
          setSavedCardNumber(res[0]?.last4 || '')
          setSavedCardExpiry(
            res[0]?.exp_month?.padStart(2, '0') +
              '/' +
              res[0]?.exp_year?.slice(2)
          )
          setPaymentMethodId(res[0]?.provider_id || '')
        } else {
          // no saved cards
          setUpdateCreditCard(true)
        }
      })
      .catch((err) => {
        console.error(err)
        setUpdateCreditCard(true)
      })
  }, [])

  // redirect back to EatRight if invoice is alredy paid
  useEffect(() => {
    if (invoice?.status === 'paid' && isEatRight()) {
      document.location.href = mainHost()
    }
  }, [invoice])

  const onSubmitClicked = () => {
    if (!method) {
      setMethod('card')

      return
    }

    // formRef.current?.handleSubmit(updateCreditCard)
    formRef.current?.handleSubmit(updateCreditCard)
  }

  const renderItemType = (item: InvoiceItemType) => {
    if (item.type === 'fee' && item.name === 'Bag deposit fee') {
      return 'Bag deposit fee'
    } else if (item.type === 'delivery_fee' && item.name === 'Delivery fee') {
      return 'Delivery fee'
    } else if (item.type === 'meal_plan') {
      return 'Meal Plan'
    }

    return item.type
  }

  const renderUnitPrice = (item: InvoiceItemType) => {
    if (
      item.tax_included &&
      item.type === 'fee' &&
      item.name === 'Bag deposit fee'
    ) {
      return (Number(item.unit_price) - item.tax_value).toFixed(2)
    } else if (item.tax_included && item.type === 'meal_plan') {
      return (Number(item.unit_price) - item.tax_value).toFixed(2)
      // return Number(item.subtotal).toFixed(2)
    } else {
      return item.unit_price
    }
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
            <Button>Go Back</Button>
          </a>
        </Success>
      </Page>
    )
  }

  return (
    <Page>
      <Styles $expand={detailsOpen}>
        <div className="invoice-pay__details">
          {isEatRight() && (
            <a
              className="invoice-pay__link"
              href={`${mainHost()}/plans/${
                invoice?.items?.length
                  ? invoice?.items[0]?.extras?.meal_plan_id
                  : '1'
              }`}
            >
              <CaretLeftIcon /> Go back to Meal Plan Overview
            </a>
          )}
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
                        {item.total?.toFixed(2)} AED
                      </p>
                    </div>
                    <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                      {item.name === 'Bag deposit fee' ||
                      item.name === 'Delivery fee'
                        ? ''
                        : item.description}
                    </p>
                    <p className="invoice-pay__item-card-text invoice-pay__item-card-text_secondary">
                      {`${item.quantity}x + ${renderUnitPrice(item)} AED ${
                        item.is_taxable ? `+ VAT (${item.tax_rate}%)` : ''
                      }`}
                    </p>
                  </div>
                </div>
              ))}

              <div className="invoice-pay__summary">
                <div className="invoice-pay__summary-row">
                  <p className="invoice-pay__summary-text">Subtotal</p>
                  <span>
                    {invoice?.items?.every((item) => item.tax_included)
                      ? (invoice.subtotal - invoice.tax_value).toFixed(2)
                      : invoice.subtotal?.toFixed(2)}{' '}
                    AED
                    {/* {invoice.subtotal} AED */}
                  </span>
                </div>
                <div className="invoice-pay__summary-row">
                  <p className="invoice-pay__summary-text">
                    Tax ({invoice.tax_rate}%)
                  </p>
                  <span>{invoice.tax_value?.toFixed(2)} AED</span>
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
                <span>{invoice.total?.toFixed(2)} AED</span>
              </div>
            </>
          )}
        </div>

        <div className="invoice-pay__payment">
          <Card color="secondary">
            <h2 className="invoice-pay__payment-title">
              Total Payable
              <span>{invoice.total?.toFixed(2)} AED</span>
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
                  disabled={updateCreditCard}
                  cardNumber={savedCardNumber}
                  cardExpiry={savedCardExpiry}
                  icons={
                    <>
                      <VisaIcon />
                      <McIcon />
                      <AmexIcon />
                    </>
                  }
                />

                {!updateCreditCard && (
                  <Button
                    className="invoice-pay__update-card"
                    variant="secondary"
                    onClick={() => setUpdateCreditCard(true)}
                  >
                    Update credit card
                  </Button>
                )}

                {method === 'card' && (
                  <CreditCardForm
                    hint={
                      invoice.is_subscription
                        ? `*Your card will be weekly charged for a payment of ${invoice.total} AED and once you submit`
                        : `*Your card will be charged for a one-time payment of ${invoice.total} AED once you submit`
                    }
                    invoiceId={invoice.id}
                    onSuccess={() => setSuccess(true)}
                    formRef={formRef}
                    updateCreditCard={updateCreditCard}
                    isVisible={updateCreditCard}
                    paymentMethodId={
                      updateCreditCard ? undefined : paymentMethodId
                    }
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
                  <SecureIcon style={{ display: 'inline-block' }} />
                  <span style={{ display: 'inline-block' }}>
                    Payments securely processed and encrypted by Stripe
                    <sup>TM</sup>
                  </span>
                </p>
              </div>
            </div>

            <div>
              <Button
                className="invoice-pay__submit"
                id="pay-invoice-submit"
                onClick={onSubmitClicked}
              >
                Pay {invoice.total?.toFixed(2)} AED
              </Button>
            </div>
          </Card>
        </div>
      </Styles>
    </Page>
  )
}
