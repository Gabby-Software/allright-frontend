import { onlyActive } from '../../guards/active.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { OnBoardProvider } from './onboard.context'
import { onBoardData } from './onboard.data'
import OnboardDesktop from './onboard.desktop'
import OnBoardMobile from './onboard.mobile'

const Onboard = () => {
  const isMobile = useIsMobile()
  return (
    <OnBoardProvider steps={onBoardData}>
      {isMobile ? <OnBoardMobile /> : <OnboardDesktop />}
    </OnBoardProvider>
  )
}

export default onlyActive(Onboard)
