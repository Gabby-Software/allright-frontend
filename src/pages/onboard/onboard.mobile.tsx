import React, {useContext} from 'react';
import {OnBoardContext} from "./onboard.context";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import IdentityLayout from "../../layouts/identity-layout/identity-layout.component";
import IdentitySidebar from "../../layouts/identity-sidebar/identity-sidebar.component";
import {onBoardData} from "./onboard.data";
import Steps from "../../components/steps/steps.component";
import OnboardStep from "./onboard-step.component";
import IdentityMobileLayout from "../../layouts/identity-mobile-layout/identity-mobile-layout.component";

const OnBoardMobile = () => {
    const {step, data} = useContext(OnBoardContext);
    const {t} = useTranslation();
    return (
        <IdentityMobileLayout title={`Hello ${data?.first_name}`} desc={t(`auth:${onBoardData[step]?.desc}`)}>
                <Steps currentStep={step} dots>
                    {
                        onBoardData.map(stepData => <OnboardStep {...stepData}/>)
                    }
                </Steps>
        </IdentityMobileLayout>
    )
};
export default OnBoardMobile;
