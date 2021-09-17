import React, { useContext } from 'react'
import { OnBoardContext } from './onboard.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import Steps from '../../components/steps/steps.component'
import OnboardStep from './onboard-step.component'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout/identity-mobile-layout.component'

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
