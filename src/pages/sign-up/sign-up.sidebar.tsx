import React from 'react';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import IdentitySidebar from "../../layouts/identity-sidebar/identity-sidebar.component";
import {Routes} from "../../enums/routes.enum";

const SignUpSidebar = () => {
    const {t} = useTranslation();
    return (
        <>
            <IdentitySidebar.Title>{t('auth:sign-up-title')}</IdentitySidebar.Title>
            <IdentitySidebar.Subtitle>{t('auth:sign-up-subtitle')}</IdentitySidebar.Subtitle>
            <IdentitySidebar.Hr/>
            <IdentitySidebar.Desc>{t('auth:have-account')}</IdentitySidebar.Desc>
            <IdentitySidebar.Link to={Routes.LOGIN}>{t('auth:sign-in')}</IdentitySidebar.Link>
        </>
    )
};

export default SignUpSidebar;
