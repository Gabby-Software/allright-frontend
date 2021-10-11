import { useIsMobile } from '../../hooks/is-mobile.hook'
import InvoiceMobile from './components/invoice-mobile/invoice-mobile.component'
import InvoiceDesktop
  from './components/invoice-desktop/invoice-desktop.component'
import Page from '../../components/containers/page/page.component'

export default function Invoice() {
  const isMobile = useIsMobile()
  return (
    <Page>
      {isMobile ? <InvoiceMobile /> : <InvoiceDesktop />}
    </Page>
    )
}
