import React from 'react';
import IdentityMobileLayout from "../../layouts/identity-mobile-layout/identity-mobile-layout.component";
import SignUpConfirmationForm from "./sign-up-confirmation.form";
import {Link} from 'react-router-dom';
import {SwitchState} from "../styles";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {Routes} from "../../enums/routes.enum";
import config from '../../config/branding.config';

const SignUpConfirmationMobile = () => {
    const {t} = useTranslation();
    return (
        <IdentityMobileLayout title={t('auth:sign-up-title')} desc={t('auth:sign-up-subtitle',{name: config.name})}>
            <SignUpConfirmationForm/>
            <SwitchState>
                <div>{t('auth:all-solved')}</div>
                <Link to={Routes.LOGIN}>{t('auth:back-login')}</Link>
            </SwitchState>
        </IdentityMobileLayout>
    );
};
export default SignUpConfirmationMobile;
