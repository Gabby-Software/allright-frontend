import React from 'react'

import {
  DownloadIcon,
  PrinterIcon
} from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { InvoiceType } from '../../../../types/invoice.type'
import { Styles } from './icon-actions.style'

interface IconActionsProps {
}

export default function IconActions({
  ...data
}: IconActionsProps & InvoiceType) {
  return (
      <Styles>
        <IconButton size="sm" onClick={window.print}>
          <PrinterIcon />
        </IconButton>

        <a
          href={data.pdf?.url}
          target="_blank"
          download={`invoice-${data.invoice_number}.pdf`}
          rel="noreferrer"
        >
          <IconButton size="sm" disabled={!data.pdf}>
            <DownloadIcon />
          </IconButton>
        </a>
      </Styles>
  )
}
