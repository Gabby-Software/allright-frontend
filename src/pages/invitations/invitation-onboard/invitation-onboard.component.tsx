import React, {useState, useEffect, useContext} from 'react';
import Styles from './invitation-onboard.styles';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import {OnBoardContext, OnBoardProvider} from "../../onboard/onboard.context";
import OnBoardMobile from "../../onboard/onboard.mobile";
import OnboardDesktop from "../../onboard/onboard.desktop";
import {Skip} from "../../styles/skip.styles";
import {invitationOnBoardData} from "./invitation-onboard.data";

type Props = {};
const SkipOnboard = () => {
    const {step} = useContext(OnBoardContext);
    if(step!==0)
        return <Skip/>;
    return null;
};
const InvitationOnboard = ({}:Props) => {
    const isMobile = useIsMobile();
    return (
        <OnBoardProvider steps={invitationOnBoardData}>
            {isMobile ? <OnBoardMobile/> : <OnboardDesktop/>}
            <SkipOnboard/>
        </OnBoardProvider>
    );
};

export default InvitationOnboard;
