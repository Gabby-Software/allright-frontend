import { onlyGuest } from '../../guards/guest.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import SignUpDesktop from './sign-up.desktop'
import SignUpMobile from './sign-up.mobile'

const SignUp = () => {
  const isMobile = useIsMobile()
  return isMobile ? <SignUpMobile /> : <SignUpDesktop />
}

export default onlyGuest(SignUp)
