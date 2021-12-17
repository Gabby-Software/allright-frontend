import { Link, useLocation, useHistory } from 'react-router-dom'

import { ReactComponent as LeftArrowIcon } from '../../assets/media/icons/left-arrow.svg'
import Styles from './identity-layout.styles'
import IdentityFooter from '../identity-footer/identity-footer.component'
import IdentitySidebar from '../identity-sidebar/identity-sidebar.component'
import { mainHost } from '../../pipes/main-host'
import { Routes } from '../../enums/routes.enum'
import { isEatRight } from '../../utils/domains'

const routesWithBackLink = [
  Routes.LOGIN,
  Routes.REGISTER,
  Routes.VERIFY_EMAIL,
  Routes.FORGOT_PASSWORD,
  Routes.FORGOT_PASSWORD_CONFIRMATION
]

type Props = {
  sidebar: React.ComponentType<any>
  children: React.ReactNode
  w?: string
}

const IdentityLayout = ({ w, sidebar: Sidebar, children }: Props) => {
  const location = useLocation()
  const history = useHistory()
  const isER = isEatRight()
  const searchParams = new URLSearchParams(location.search)
  const returnURL = searchParams.get('returnURL')
  return (
    <Styles>
      <IdentitySidebar>
        <Sidebar />
      </IdentitySidebar>
      <main className={'layout__main'}>
        {isER && routesWithBackLink.includes(location.pathname) && (
          <div className={'goBackLink'}>
            <a
              onClick={() => {
                if (returnURL) {
                  window.location.href = returnURL
                } else {
                  history.goBack()
                }
              }}
            >
              <LeftArrowIcon /> Go Back Eatright
            </a>
          </div>
        )}
        <div
          className={'layout__wrapper'}
          style={w ? { maxWidth: w } : undefined}
        >
          {children}
        </div>
        <IdentityFooter />
      </main>
    </Styles>
  )
}

export default IdentityLayout
