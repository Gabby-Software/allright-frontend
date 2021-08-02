import React, {useState, useEffect} from 'react';
import Styles from './invitation-onboard.styles';
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import {OnBoardProvider} from "../../onboard/onboard.context";
import OnBoardMobile from "../../onboard/onboard.mobile";
import OnboardDesktop from "../../onboard/onboard.desktop";
import {Skip} from "../../styles/skip.styles";
import {invitationOnBoardData} from "./invitation-onboard.data";

type Props = {};
const InvitationOnboard = ({}:Props) => {
    const isMobile = useIsMobile();
    return (
        <OnBoardProvider steps={invitationOnBoardData}>
            {isMobile ? <OnBoardMobile/> : <OnboardDesktop/>}
            <Skip/>
        </OnBoardProvider>
    );
};

export default InvitationOnboard;
