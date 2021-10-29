import { Skeleton } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useParams } from 'react-router'

import { CaretDownIcon } from '../../../../assets/media/icons'
import Card from '../../../../components/cards/card/card.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import userTypes from '../../../../enums/user-types.enum'
import useInvoice from '../../../../hooks/api/invoices/useInvoice'
import { useAuth } from '../../../../hooks/use-auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import InvoiceCard from '../../../../components/cards/invoice-card/invoice-card.component'
import IconActions from '../../components/icon-actions/icon-actions.component'
import {
  Divider,
  HeadActions,
  HeadContent,
  HeadRow,
  Row,
  RowCell,
  RowText,
  RowTextTotal,
  RowTitle,
  Styles,
  TableHeadRow,
  TableRow,
  Title
} from './invoice-mobile.styles'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import Button from '../../../../components/buttons/button/button.component'
import { mainHost } from '../../../../pipes/main-host'
import { BackLink } from '../../../../components/typography'

const PAYMENT_METHODS: Record<string, any> = {
  credit_card: 'Credit Card'
}

type Props = {}

export default function InvoiceMobile({}: Props) {
  const params = useParams<any>()
  const { t } = useTranslation()
  const { type } = useAuth()
  const [showDetails, setShowDetails] = useState(false)

  const { invoice, isInvoiceLoading, onMarkPaid, onSend } = useInvoice({
    id: params.id
  })

  const currency = invoice.currency?.code
  return (
    <>
      {isInvoiceLoading ? (
        <Skeleton />
      ) : (
        <Styles>
          <BackLink
            native
            to={
              type === userTypes.CLIENT
                ? `${mainHost()}/invoices`
                : `${mainHost()}/financials/receivables`
            }
          >
            {`Back to ${type === userTypes.CLIENT ? 'Invoices' : 'Financials'}`}
          </BackLink>

          {type === userTypes.CLIENT && (
            <InvoiceCard showDate showPay showDue asLink={false} {...invoice} />
          )}

          <Card className="invoice__content">
            {type === userTypes.TRAINER && (
              <HeadRow>
                <HeadContent>
                  <Title primary className="mb-4">
                    {t('invoices:invoice-number')}
                    {invoice.invoice_number}
                  </Title>

                  <Title className="mb-4">
                    {invoice.total} {invoice.currency?.code}
                  </Title>

                  <RowCell className="mb-4">
                    <RowTitle>{t('invoices:issued-on')}</RowTitle>
                    <RowText>
                      {moment(invoice.created_at).format(DATE_RENDER_FORMAT)}
                    </RowText>
                  </RowCell>

                  <RowCell className="mb-4">
                    <RowTitle>{t('invoices:due-on')}</RowTitle>
                    <RowText primary>
                      {moment(invoice.due_on).format(DATE_RENDER_FORMAT)}
                    </RowText>
                  </RowCell>
                </HeadContent>

                <HeadActions>
                  <StatusBadge status={invoice.status} className="invoice__btn">
                    {t(`invoices:statuses.${invoice.status}`)}
                  </StatusBadge>

                  {invoice.status !== invoiceStatuses.DRAFT &&
                    invoice.status !== invoiceStatuses.PAID && (
                      <Button
                        className="invoice__btn"
                        size="sm"
                        onClick={() => onMarkPaid(invoice.id)}
                      >
                        Mark as Paid
                      </Button>
                    )}

                  {type === userTypes.TRAINER &&
                    invoice.status === invoiceStatuses.DRAFT && (
                      <Button
                        className="invoice__btn"
                        size="sm"
                        onClick={() => onSend(invoice.id)}
                      >
                        Send to Client
                      </Button>
                    )}

                  <IconActions {...invoice} />
                </HeadActions>
              </HeadRow>
            )}

            <Row
              className="invoice__toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              <RowText className="invoice__toggle-text">
                {showDetails ? 'Hide' : 'Show'} Invoice Details
              </RowText>
              <CaretDownIcon />
            </Row>

            {showDetails && (
              <div className="mb-6">
                <Row className="mb-6">
                  <RowCell>
                    <RowTitle className="invoice__issued-title">
                      Issued By:
                    </RowTitle>
                    <RowText className="invoice__issued-text">
                      {invoice.invoice_from?.user?.first_name}{' '}
                      {invoice.invoice_from?.user?.last_name}
                    </RowText>
                    <RowTitle>
                      {invoice.invoice_from?.address?.address || '-'}
                    </RowTitle>
                    <RowTitle>
                      {invoice.invoice_from?.address?.country?.name_english ||
                        '-'}
                    </RowTitle>
                  </RowCell>
                </Row>

                <Row className="mb-6">
                  <RowCell>
                    <RowTitle className="invoice__issued-title">
                      Issued To:
                    </RowTitle>
                    <RowText className="invoice__issued-text">
                      {invoice.invoice_to?.user?.first_name}{' '}
                      {invoice.invoice_to?.user?.last_name}
                    </RowText>
                    <RowTitle>
                      {invoice.invoice_to?.address?.address || '-'}
                    </RowTitle>
                    <RowTitle>
                      {invoice.invoice_to?.address?.country?.name_english ||
                        '-'}
                    </RowTitle>
                  </RowCell>
                </Row>

                <Divider />
              </div>
            )}

            <Row className="mb-6">
              <RowCell>
                <RowTitle>Default Payment Method</RowTitle>
                <RowText>
                  {PAYMENT_METHODS[invoice.payment_method] ||
                    invoice.payment_method ||
                    '-'}
                </RowText>
              </RowCell>
            </Row>
            <Row className="mb-6">
              <RowCell>
                <RowTitle>Currency</RowTitle>
                <RowText>{currency || '-'}</RowText>
              </RowCell>

              <RowCell right>
                <RowTitle>Session Expiry</RowTitle>
                <RowText>-</RowText>
              </RowCell>
            </Row>

            <TableHeadRow>
              <RowText white>Item</RowText>
              <RowText white>Cost</RowText>
            </TableHeadRow>

            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <Row className="mb-4">
                  <RowCell>
                    <RowText>{item.type}</RowText>
                    <RowTitle>{item.name}</RowTitle>
                  </RowCell>

                  <RowCell right>
                    <RowText>
                      {asMoney(item.total)} {invoice.currency?.code}
                    </RowText>
                  </RowCell>
                </Row>
                <Row className="mb-6">
                  <RowCell>
                    <RowTitle>
                      {item.quantity} x {item.unit_price} {currency}
                    </RowTitle>
                  </RowCell>
                  <RowCell>
                    <RowTitle>
                      ({item.tax_value} {currency} VAT)
                    </RowTitle>
                  </RowCell>
                </Row>

                <Divider />
              </TableRow>
            ))}

            <TableRow className="mb-6">
              <Row className="mb-4">
                <RowTitle>Subtotal:</RowTitle>
                <RowText>
                  {invoice.subtotal} {currency}
                </RowText>
              </Row>
              <Row className="mb-4">
                <RowTitle>VAT({invoice.tax_rate}%)</RowTitle>
                <RowText>
                  {invoice.tax_value} {currency}
                </RowText>
              </Row>
              <Row className="mb-4">
                <RowTitle>Discounts:</RowTitle>
                <RowText>
                  {invoice.discount_amount} {currency}
                </RowText>
              </Row>
              <Divider />
            </TableRow>

            <Row>
              <RowText semibold>Total Payable</RowText>
              <RowTextTotal>
                {invoice.total} {currency}
              </RowTextTotal>
            </Row>
          </Card>
        </Styles>
      )}
    </>
  )
}
