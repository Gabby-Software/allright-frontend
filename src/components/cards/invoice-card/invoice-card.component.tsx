import moment from 'moment'
import React, { useMemo } from 'react'

import Button from '../../buttons/button/button.component'
import Ellipsis from '../../ellipsis/ellipsis.component'
import StatusBadge from '../../status-badge/status-badge.component'
import { invoiceStatuses } from '../../../enums/invoice-statuses'
import { paymentMethods } from '../../../enums/payment-method.enum'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/use-auth.hook'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { InvoiceType } from '../../../types/invoice.type'
import { DATE_RENDER_FORMAT } from '../../../utils/date'
import { Styles } from './invoice-card.styles'
import { getRoute } from '../../../utils/routes'

interface InvoiceCardProps {
  mobileColumn?: boolean
  showMark?: boolean
  showLink?: boolean
  onMark?: any
  showDate?: boolean
  showDue?: boolean
  asLink?: boolean
  showPay?: boolean
  onRemind?: () => void
  onSend?: (id: number) => void
}

const InvoiceCard = ({
  invoice_from,
  invoice_to,
  invoice_number,
  status,
  total,
  currency,
  id,
  mobileColumn,
  showDate,
  created_at,
  due_on,
  showDue,
  showPay,
  payment_method
}: InvoiceCardProps & InvoiceType) => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const isMobile = useIsMobile()
  const createdDate = created_at
    ? moment(created_at).format(DATE_RENDER_FORMAT)
    : ''
  const dueDate = due_on ? moment(due_on).format(DATE_RENDER_FORMAT) : ''

  const name = useMemo(() => {
    const user = (type === userTypes.CLIENT ? invoice_from : invoice_to)?.user
    return user ? `${user.first_name} ${user.last_name}` : ''
  }, [type])

  const statusBtn = (
    <StatusBadge status={status} className="invoice-card__btn">
      {t(`invoices:statuses.${status}`)}
    </StatusBadge>
  )

  const actionBtn = (
    <>
      {type === userTypes.CLIENT &&
        status !== invoiceStatuses.PAID &&
        payment_method === paymentMethods.CREDIT_CARD &&
        showPay && (
          <Button
            className="invoice-card__btn"
            size="sm"
            to={getRoute(Routes.INVOICE_PAY, { id })}
          >
            {t('invoices:pay')}
          </Button>
        )}
    </>
  )

  return (
    <Styles
      $mobCol={mobileColumn}
      className={mobileColumn ? 'invoice-card_mob-col' : ''}
    >
      <div className="invoice-card__row">
        <div>
          <Ellipsis className={'invoice-card__number'}>
            {t('invoices:number', { number: invoice_number })}
          </Ellipsis>

          {showDate ? (
            <p className="invoice-card__issuer">{createdDate}</p>
          ) : (
            <Ellipsis className="invoice-card__issuer">
              {type === userTypes.CLIENT
                ? t('invoices:from', { name })
                : t('invoices:to', { name })}
            </Ellipsis>
          )}
        </div>

        {mobileColumn ? !isMobile && statusBtn : statusBtn}
      </div>

      {showDue && (
        <div>
          <p className="invoice-card__due-title">{t('invoices:due-on')}</p>
          <p className="invoice-card__due-value">{dueDate}</p>
        </div>
      )}

      <div className="invoice-card__row">
        <h2 className={'invoice-card__price'}>
          {total}
          <span> {currency.code}</span>
        </h2>

        {mobileColumn ? !isMobile && actionBtn : actionBtn}
      </div>

      {isMobile && mobileColumn && (
        <div className="invoice-card__row">
          {statusBtn}
          {actionBtn}
        </div>
      )}
    </Styles>
  )
}

export default InvoiceCard
