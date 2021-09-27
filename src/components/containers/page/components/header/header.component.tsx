import { Styles } from './header.styles'
import brand from '../../../../../config/branding.config'

const Logo = brand.logo

export default function Header() {
  return (
    <Styles>
      <div className="header__content">
        <Logo class="header__logo" />
      </div>
    </Styles>
  )
}
