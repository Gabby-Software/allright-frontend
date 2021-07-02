import React, {useState, useEffect} from 'react';
import Styles, {Logo, ResendEmail, Wrapper} from "../styles";
import logoCompact from "../../assets/media/logo-compact.png";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {onlyGuest} from "../../guards/guest.guard";
import Back from "../styles/back/back.component";
import {Routes} from "../../enums/routes.enum";

const SignUpConfirmation = () => {
    const {t} = useTranslation();
    const resendEmail = () => {
        // todo: handle submittion
    };
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <h1 className={'forgot-password__title'}>{t('auth:sign-up')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:sign-up-confirm-1')}</span>
                    <span>{t('auth:sign-up-confirm-2')}</span>
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

export default onlyGuest(SignUpConfirmation);
