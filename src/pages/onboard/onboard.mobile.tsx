import React, { useContext } from 'react'

import Steps from '../../components/steps/steps.component'
// import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'
// import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { OnBoardContext } from './onboard.context'
import OnboardStep from './onboard-step.component'

const OnBoardMobile = () => {
  const { steps, step, data, goTo } = useContext(OnBoardContext)
  const { t } = useTranslation()
  return (
    <IdentityMobileLayout
      title={`Hello ${data?.first_name}`}
      desc={t(`auth:${steps[step]?.desc}`)}
    >
      <Steps currentStep={step} dots changeStep={goTo}>
        {steps.map((stepData) => (
          <OnboardStep key={stepData.desc} {...stepData} />
        ))}
      </Steps>
    </IdentityMobileLayout>
  )
}
export default OnBoardMobile
