import React, {useState, useEffect} from 'react';
import Styles from './profile-accounts.styles';
import ProfileTitle from "../../components/profile-title/profile-title.component";
import ProfileAccount from "../../components/profile-account/profile-account.component";
import {useAuth} from "../../../../hooks/use-auth.hook";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {Link} from "react-router-dom";
import {Routes} from "../../../../enums/routes.enum";
import {useProfileContext} from "../../profile.context";

const ProfileAccounts = () => {
    const {accounts} = useAuth();
    const {t} = useTranslation();
    const {switchAccount, editMode} = useProfileContext();
    return (
        <Styles>
            <ProfileTitle title={'Accounts'}/>
            <div className={'accounts__cont'}>
                {
                    accounts.map(({uuid, is_current, type}) => (
                        <ProfileAccount active={is_current} key={uuid} type={type} disabled={editMode}
                                        className={'accounts__item'} onClick={() => editMode || switchAccount(uuid)}/>
                    ))
                }
                {
                    editMode?null:(
                        <Link to={Routes.ADD_ACCOUNT} className={'accounts__add'}>
                            <span>{t('profile:add-account')}</span>
                        </Link>
                    )
                }
            </div>
        </Styles>
    )
};

export default ProfileAccounts;
