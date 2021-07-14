import React, {useState, useEffect, useContext, useRef} from 'react';
import userTypes from "../../enums/user-types.enum";
import * as Yup from 'yup';
import {
    Formik,
    FormikProps,
    Form, FormikHelpers,
} from 'formik';
import FormSwitch from "../../components/forms/form-switch/form-switch.component";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import {Link} from 'react-router-dom';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Styles, {Wrapper, Logo, SwitchState, ForgetPassword, Title, MobileStickyBottom} from '../styles';
import {AuthFormContext} from "../../modules/auth/auth.context";
import {AuthFormFieldsType, AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import {Routes} from "../../enums/routes.enum";
import logger from "../../managers/logger.manager";
import {onlyGuest} from "../../guards/guest.guard";
import brand from "../../config/branding.config";
import FormPassword from "../../components/forms/form-password/form-password.component";
import {EP_LOGIN} from "../../enums/api.enum";
import api, {handleError} from "../../managers/api.manager";
import {mainHost} from "../../pipes/main-host";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {auth} from "../../managers/auth.manager";
import cookieManager from "../../managers/cookie.manager";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import LoginForm from "./login.form";
import IdentityMobileLayout from "../../layouts/identity-mobile-layout/identity-mobile-layout.component";
import LoginMobile from "./login.mobile";
import LoginDesktop from "./login.desktop";

const Login = () => {
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    return isMobile ? <LoginMobile/> : <LoginDesktop/>;
};

export default onlyGuest(Login);
