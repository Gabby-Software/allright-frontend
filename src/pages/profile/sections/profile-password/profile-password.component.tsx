import React, {useState, useEffect} from 'react';
import Styles from './profile-password.styles';
import FormPassword from "../../../../components/forms/form-password/form-password.component";
import {OnBoardItemType} from "../../../onboard/onboard.type";
import {useProfileContext} from "../../profile.context";
import OnboardItem from "../../../onboard/onboard-item.component";
import ProfileField from "../../components/profile-field/profile-field.component";
import ProfileTitle from "../../components/profile-title/profile-title.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import FormRow from "../../../../components/forms/form-row/form-row.component";

const ProfilePassword = () => {
    const {editMode} = useProfileContext();
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileTitle title={'Password'}/>
            {
                editMode ? (
                    <FormRow>
                        <FormPassword name={'password'} label={t('profile:new-password')}/>
                        <FormPassword name={'password_confirmation'} label={t('profile:confirm-password')}/>
                        <div/>
                    </FormRow>
                ) : (
                    <p className={'password'}>********</p>
                )
            }
        </Styles>
    )
};

export default ProfilePassword;
