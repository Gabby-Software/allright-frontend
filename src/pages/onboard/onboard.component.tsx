import React, {useState, useEffect, useContext} from 'react';
import Styles from './onboard.styles';
import {OnBoardContext, OnBoardProvider} from "./onboard.context";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import IdentityLayout from "../../layouts/identity-layout/identity-layout.component";
import IdentitySidebar from "../../layouts/identity-sidebar/identity-sidebar.component";
import {onBoardData} from "./onboard.data";
import Steps from "../../components/steps/steps.component";
import OnboardStep from "./onboard-step.component";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import OnBoardMobile from "./onboard.mobile";
import OnboardDesktop from "./onboard.desktop";

const Onboard = () => {
    const isMobile = useIsMobile();
    return (
        <OnBoardProvider>
            {isMobile ? <OnBoardMobile/> : <OnboardDesktop/>}
        </OnBoardProvider>
    );
};

export default Onboard;
