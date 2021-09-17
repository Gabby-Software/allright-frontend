import React, { useContext } from 'react'
import { OnBoardContext } from './onboard.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import Steps from '../../components/steps/steps.component'
import OnboardStep from './onboard-step.component'

const OnboardDesktop = () => {
  const { step, steps, data, goTo } = useContext(OnBoardContext)
  const { t } = useTranslation()
  return (
    <IdentityLayout
      sidebar={() => (
        <>
          <IdentitySidebar.Title>
            Hello {data?.first_name}
          </IdentitySidebar.Title>
          <IdentitySidebar.Subtitle>
            {t(`auth:${steps[step]?.desc}`)}
          </IdentitySidebar.Subtitle>
        </>
      )}
    >
      <Steps currentStep={step} dots changeStep={goTo}>
        {steps.map((stepData) => (
          <OnboardStep key={stepData.desc} {...stepData} />
        ))}
      </Steps>
    </IdentityLayout>
  )
}
export default OnboardDesktop
