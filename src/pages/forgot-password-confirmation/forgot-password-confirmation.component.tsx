import React, {useState, useEffect, useContext} from 'react';
import Styles, {Logo, Wrapper, ResendEmail} from "../styles";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {AuthFormContext} from "../../modules/auth/auth.context";
import {AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import {Redirect} from "react-router-dom";
import {Routes} from "../../enums/routes.enum";
import {onlyGuest} from "../../guards/guest.guard";
import Back from "../styles/back/back.component";
import api, {handleError} from "../../managers/api.manager";
import {EP_SEND_RESET_PASSWORD} from "../../enums/api.enum";
import logger from "../../managers/logger.manager";
import {toast} from "../../components/toast/toast.component";
import {serverError} from "../../pipes/server-error.pipe";

const ForgotPasswordConfirmation = () => {
    const {t} = useTranslation();
    const {form} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    if(!form.email)
        return <Redirect to={Routes.LOGIN}/>;
    const resendEmail = () => {
        api.post(EP_SEND_RESET_PASSWORD, {email:form.email})
            .then((res) => {
                logger.success('RESENT PASSWORD SUCCESS', res);
                toast.show({type: 'success', msg: 'Reset password sent'});
            })
            .catch(e => toast.show({type: 'error', msg: serverError(e)}));
    };
    return (
        <Styles>
            <Wrapper>
                <Logo/>
                <h1 className={'forgot-password__title'}>{t('auth:recover-password')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:recover-password-confirm-1')}</span>
                    <span>{t('auth:recover-password-confirm-2')}</span>
                </p>
                <ResendEmail>
                    <span>{t('auth:not-received')}</span>
                    <a onClick={resendEmail}>{t('auth:send-again')}</a>
                </ResendEmail>
                <Back to={Routes.LOGIN}/>
            </Wrapper>
        </Styles>
    )
};

export default onlyGuest(ForgotPasswordConfirmation);
