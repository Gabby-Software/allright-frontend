import React, {useState, useEffect} from 'react';
import Styles from './verify-email.styles';
import {Redirect, useLocation, useParams} from "react-router-dom";
import logger from "../../managers/logger.manager";
import {VerifyEmailParamsType} from "../../modules/auth/verify-email-params.type";
import {onlyGuest} from "../../guards/guest.guard";
import {Routes} from "../../enums/routes.enum";
import {onlyAuth} from "../../guards/auth.guard";
import api, {handleError} from "../../managers/api.manager";
import {EP_VERIFY_EMAIL} from "../../enums/api.enum";
import {toast} from "../../components/toast/toast.component";
import {serverError} from "../../pipes/server-error.pipe";
import {mainHost} from "../../pipes/main-host";

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
            api.get(`${EP_VERIFY_EMAIL}/${id}/${token}${location.search}`)
                .then(res => {
                    logger.success('EMAIL VERIFIED', res);
                    document.location.href=mainHost()+Routes.REGISTER_ON_BOARD;
                })
                .catch(e => {
                    toast.show({type: 'error', msg: serverError(e)});
                    setVerified(verifiedState.ERROR);
                })
        }
    }, []);
    if(verified === verifiedState.ERROR || !id || !token)
        return <Redirect to={Routes.LOGIN}/>;
    return (<div/>);
};

export default VerifyEmail;
