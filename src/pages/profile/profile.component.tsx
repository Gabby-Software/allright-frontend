import React, {useState, useEffect} from 'react';
import Styles from './profile.styles';
import ProfileSidebar from "./sections/profile-sidebar/profile-sidebar.component";
import ProfileInfo from "./sections/profile-info/profile-info.component";
import ProfileBasic from "./sections/profile-basic/profile-basic.component";
import ProfilePassword from "./sections/profile-password/profile-password.component";
import ProfileAccounts from "./sections/profile-accounts/profile-accounts.component";
import {ProfileContext, ProfileProvider, useProfileContext} from "./profile.context";
import {useAuth} from "../../hooks/use-auth.hook";
import {useProfile} from "../../hooks/use-profile.hook";
import {Form, Formik} from "formik";
import ProfileImage from "./sections/profile-image/profile-image.component";
import ProfileTnb from "./sections/profile-tnb/profile-tnb.component";
import logger from "../../managers/logger.manager";
import {profileSchema} from "./profile.schema";

const ProfileContent = () => {
    const auth = useAuth();
    const profile = useProfile();
    const {handleSubmit, setTnbFile} = useProfileContext();
    return (
            <Formik initialValues={{...auth, ...profile, password: '', password_confirmation: ''}}
                    onSubmit={handleSubmit} validationSchema={profileSchema}>
                <Form>
                    <Styles className={'profile'}>
                        <ProfileSidebar/>
                        <main className={'profile__main'}>
                            <ProfileImage/>
                            <ProfileBasic/>
                            <ProfileInfo/>
                            {
                                auth?.type === 'trainer'?(
                                    <ProfileTnb/>
                                ):null
                            }
                            <ProfilePassword/>
                            <ProfileAccounts/>
                        </main>
                    </Styles>
                </Form>
            </Formik>
    );
};
const Profile = () => (
    <ProfileProvider>
        <ProfileContent/>
    </ProfileProvider>
    )
export default Profile;
