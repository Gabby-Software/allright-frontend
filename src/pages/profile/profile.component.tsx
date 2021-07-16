import React, {useState, useEffect} from 'react';
import Styles from './profile.styles';
import ProfileSidebar from "./sections/profile-sidebar/profile-sidebar.component";
import ProfileInfo from "./sections/profile-info/profile-info.component";
import ProfileBasic from "./sections/profile-basic/profile-basic.component";
import ProfilePassword from "./sections/profile-password/profile-password.component";
import ProfileAccounts from "./sections/profile-accounts/profile-accounts.component";
import {ProfileProvider, useProfileContext} from "./profile.context";
import {useAuth} from "../../hooks/use-auth.hook";
import {useProfile} from "../../hooks/use-profile.hook";
import {Form, Formik} from "formik";
import ProfileImage from "./sections/profile-image/profile-image.component";
import ProfileTnb from "./sections/profile-tnb/profile-tnb.component";

const Profile = () => {
    const auth = useAuth();
    const profile = useProfile();
    const {handleSubmit} = useProfileContext();
    return (
        <ProfileProvider>
            <Styles className={'profile'}>
                <ProfileSidebar/>
                <main className={'profile__main'}>
                    <Formik initialValues={{...auth, ...profile}}
                            onSubmit={handleSubmit}>
                        <Form>
                            <ProfileImage/>
                            <ProfileBasic/>
                            <ProfileInfo/>
                            <ProfileTnb/>
                            <ProfilePassword/>
                            <ProfileAccounts/>
                        </Form>
                    </Formik>
                </main>
            </Styles>
        </ProfileProvider>
    );
};

export default Profile;
