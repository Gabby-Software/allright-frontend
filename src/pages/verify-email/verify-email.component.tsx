import React, {useState, useEffect} from 'react';
import Styles from './verify-email.styles';
import {Redirect, useLocation, useParams} from "react-router-dom";
import logger from "../../managers/logger.manager";
import {VerifyEmailParamsType} from "../../modules/auth/verify-email-params.type";
import {onlyGuest} from "../../guards/guest.guard";
import {Routes} from "../../enums/routes.enum";
import {onlyAuth} from "../../guards/auth.guard";

enum verifiedState {
    NONE, SUCCESS, ERROR
};
const VerifyEmail = () => {
    const {id, token} = useParams<VerifyEmailParamsType>();
    const [verified, setVerified] = useState<verifiedState>(verifiedState.NONE);
    const location = useLocation();
    useEffect(() => {
        logger.info('PARAMS', id, token, location.search);
        if(id && token) {
            const query = new URLSearchParams(location.search);
        }
    }, []);
    // if(verified === verifiedState.SUCCESS)
    //     return <Redirect to={Routes.REGISTER_ON_BOARD}/>;
    if(verified === verifiedState.ERROR)
        return <Redirect to={Routes.LOGIN}/>;
    return (<div/>);
};

export default onlyAuth(VerifyEmail);
