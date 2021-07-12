import React, {useState, useEffect, useContext, useRef} from 'react';
import userTypes from "../../enums/user-types.enum";
import * as Yup from 'yup';
import {
    Formik,
    Form, FormikHelpers,
} from 'formik';
import FormSwitch from "../../components/forms/form-switch/form-switch.component";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import {Link, Redirect} from 'react-router-dom';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Styles, {Wrapper, Logo, SwitchState, Title} from '../styles';
import {AuthFormContext} from "../../modules/auth/auth.context";
import {AuthFormFieldsType, AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import {Routes} from "../../enums/routes.enum";
import logger from "../../managers/logger.manager";
import FormRadio from "../../components/forms/form-radio-button/form-radio-button.component";
import genderTypes from "../../enums/gender-types";
import {onlyGuest} from "../../guards/guest.guard";
import brand from "../../config/branding.config";
import FormPassword from "../../components/forms/form-password/form-password.component";
import {EP_REGISTER} from "../../enums/api.enum";
import api, {handleError} from "../../managers/api.manager";
import {mainHost} from "../../pipes/main-host";
import IframeManager from "../../managers/iframe.manager";
import cookieManager from "../../managers/cookie.manager";
import {AuthResponseType} from "../../hooks/authorization.hook";

type LoginDataType = {
    type: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
};
const SignUp = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const iframe = useRef<HTMLIFrameElement>(null);
    const handleSubmit = (form: LoginDataType, helper: FormikHelpers<AuthFormFieldsType>) => {
        logger.info('submitting form', form);
        const {first_name, last_name, email, password, type, gender} = form;
        api.post<AuthResponseType>(EP_REGISTER, {
            first_name, last_name, email, password, gender,
            account_type: type,
            password_confirmation: password
        })
            .then(res => res.data)
            .then((res) => {
                logger.success('REGISTRATION SUCCESS', res);
                cookieManager.set('access_token', res.access_token, res.expires_in);
                cookieManager.set('auth', JSON.stringify(res.user), res.expires_in);
                helper.setSubmitting(false);
                setIsSubmitted(true);

            })
            .catch(handleError(helper))
    };
    const userTypeOptions = [
        {label: 'Client', value: userTypes.CLIENT},
        {label: 'Trainer', value: userTypes.TRAINER},
    ];
    const genderOptions = [
        {label: 'Male', value: genderTypes.MALE},
        {label: 'Female', value: genderTypes.FEMALE},
    ];
    if (isSubmitted) return <Redirect to={Routes.REGISTER_CONFIRMATION}/>;
    return (
        <Styles>
            <Wrapper>
                <Logo/>
                <Title>
                    <div className={'title__hr'}/>
                    <h1 className={'title__h1'}>{t('auth:sign-up-title')}</h1>
                    <h2 className={'title__h2'}>{t('auth:sign-up-subtitle')}</h2>
                </Title>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            type: Yup.string().required(),
                            first_name: Yup.string().required().name(),
                            last_name: Yup.string().required().name(),
                            email: Yup.string().required().email(),
                            password: Yup.string().required().min(8).password()
                        })}
                >
                    {() => (
                        <Form>
                            <FormSwitch name={'type'} options={userTypeOptions}/>
                            <div className={'sign-up__name'}>
                                <FormInputLabeled name={'first_name'} label={'First Name'} onUpdate={update}/>
                                <FormInputLabeled name={'last_name'} label={'Last Name'} onUpdate={update}/>
                            </div>
                            <FormRadio name={'gender'} label={'What\'s your gender?'} options={genderOptions}/>
                            <FormInputLabeled name={'email'} label={'Email'} onUpdate={update}/>
                            <FormPassword name={'password'} label={'Create a password'} onUpdate={update}/>
                            <ButtonSubmit>{t('auth:sign-up')}</ButtonSubmit>
                        </Form>
                    )}
                </Formik>
                <SwitchState>
                    {t('auth:have-account')} <Link to={Routes.LOGIN}>{t('auth:sign-in')}</Link>
                </SwitchState>
                <iframe style={{display: "none"}} src={mainHost() + '/auth'} ref={iframe}/>
            </Wrapper>
        </Styles>
    );
};

export default onlyGuest(SignUp);
