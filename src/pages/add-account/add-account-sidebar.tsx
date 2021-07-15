import React, {useContext} from 'react';
import IdentitySidebar from "../../layouts/identity-sidebar/identity-sidebar.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {AuthDataContext} from "../../modules/auth/auth-data.context";

const AddAccountSidebar = () => {
    const {t} = useTranslation();
    const {data} = useContext(AuthDataContext);
    return (
        <>
            <IdentitySidebar.Title>Hello {data?.user?.first_name}</IdentitySidebar.Title>
            <IdentitySidebar.Subtitle>{t('auth:add-account.desc')}</IdentitySidebar.Subtitle>
        </>
    );
};

export default AddAccountSidebar;
