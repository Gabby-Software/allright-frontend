import React, { useContext } from 'react'

import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { OnBoardContext, OnBoardProvider } from '../../onboard/onboard.context'
import OnboardDesktop from '../../onboard/onboard.desktop'
import OnBoardMobile from '../../onboard/onboard.mobile'
import { Skip } from '../../styles/skip.styles'
import { invitationOnBoardData } from './invitation-onboard.data'

type Props = {}
const SkipOnboard = () => {
  const { step, steps } = useContext(OnBoardContext)
  if (step !== 0 && step !== steps.length - 1) return <Skip />
  return null
}
const InvitationOnboard = ({}: Props) => {
  const isMobile = useIsMobile()
  return (
    <OnBoardProvider steps={invitationOnBoardData} disableBackToFirstStep>
      {isMobile ? <OnBoardMobile /> : <OnboardDesktop />}
      <SkipOnboard />
    </OnBoardProvider>
  )
}

export default InvitationOnboard
