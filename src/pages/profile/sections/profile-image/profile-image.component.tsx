import React, {useState, useEffect} from 'react';
import Styles from './profile-image.styles';
import {classes} from "../../../../pipes/classes.pipe";
import {useAuth} from "../../../../hooks/use-auth.hook";
import {noImage} from "../../../../pipes/no-image.pipe";
import {useProfileContext} from "../../profile.context";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import FormImageUpload from "../../../../components/forms/form-image-upload/form-image-upload.component";
import ProfileImage from "../../../../components/profile-image/profile-image.component";

const ProfileImageSection = () => {
    const {editMode, setAvatarFile} = useProfileContext();
    const {first_name, last_name, avatar_thumb} = useAuth();
    const {t} = useTranslation();
    return (
        <Styles>
            {
                editMode ? (
                    <FormImageUpload name={'image'}
                                     label={'Change Profile Photo'}
                                     aspectRatio={1}
                                     onUpdate={({file}) => setAvatarFile(file)}>
                        {
                            ({url}) => (<ProfileImage url={url} placeholder={noImage(first_name, last_name)}/>)
                        }
                    </FormImageUpload>
                ) : (
                    <ProfileImage url={avatar_thumb} placeholder={noImage(first_name, last_name)}/>
                )
            }
        </Styles>
    )
};

export default ProfileImageSection;
