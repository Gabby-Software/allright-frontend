import React, {useState, useEffect, useContext} from 'react';
import { OnBoardProvider} from "./onboard.context";
import {onBoardData} from "./onboard.data";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import OnBoardMobile from "./onboard.mobile";
import OnboardDesktop from "./onboard.desktop";
import {onlyActive} from "../../guards/active.guard";

const Onboard = () => {
    const isMobile = useIsMobile();
    return (
        <OnBoardProvider steps={onBoardData}>
            {isMobile ? <OnBoardMobile/> : <OnboardDesktop/>}
        </OnBoardProvider>
    );
};

export default onlyActive(Onboard);
