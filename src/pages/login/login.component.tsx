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
import Styles, {Wrapper, Logo, SwitchState,ForgetPassword, Title} from '../styles';
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
import IframeManager from "../../managers/iframe.manager";
import {mainHost} from "../../pipes/main-host";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {auth} from "../../managers/auth.manager";

type LoginDataType = {
    type: string;
    email: string;
    password: string;
};
const Login = () => {
    const {t} = useTranslation();
    const {setData} = useContext(AuthDataContext);
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const iframe = useRef<HTMLIFrameElement>(null);
    const handleSubmit = (form: LoginDataType, helper: FormikHelpers<AuthFormFieldsType>) => {
        logger.info('submitting login', form);
        const {type, email, password} = form;
        api.post<AuthResponseType>(EP_LOGIN, {email,password})
            .then(res => res.data)
            .then(res => {
                const ifm = new IframeManager(iframe.current?.contentWindow as Window);
                logger.success('LOGGED IN!', res, iframe.current);
                auth.current = res;
                setData(res);
                ifm.send({
                    action: IframeManager.messages.DO_LOGIN,
                    payload: res
                }).then(() => {
                    logger.success('LOGIN SUCCESS!');
                    helper.setSubmitting(false);
                    if(res.user.email_verified_at)
                        window.location.href = mainHost();
                });
            })
            .catch(handleError(helper));
    };
    const userTypeOptions = [
        {label: 'Client', value: userTypes.CLIENT},
        {label: 'Trainer', value: userTypes.TRAINER},
    ];
    return (
        <Styles>
            <Wrapper>
                <Logo/>
                <Title>
                    <div className={'title__hr'}/>
                    <h1 className={'title__h1'}>{t('auth:sign-in-title')}</h1>
                    <h2 className={'title__h2'}>{t('auth:sign-in-subtitle')}</h2>
                </Title>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            type: Yup.string().required(),
                            email: Yup.string().required().email(),
                            password: Yup.string().required()
                        })}
                >
                    {() => (
                        <Form>
                            <FormSwitch name={'type'} options={userTypeOptions} onUpdate={update}/>
                            <FormInputLabeled name={'email'} label={'Email'} onUpdate={update}/>
                            <FormPassword name={'password'} label={'Password'} onUpdate={update}/>
                            <ForgetPassword className={'desktop'} to={'/forgot-password'}>{t('auth:forgot-password')}</ForgetPassword>
                            <ButtonSubmit>{t('auth:sign-in')}</ButtonSubmit>
                        </Form>
                    )}
                </Formik>
                <ForgetPassword className={'mobile'} to={'/forgot-password'}>{t('auth:forgot-password')}</ForgetPassword>
                <SwitchState>
                    {t('auth:dont-have-account')} <Link to={Routes.REGISTER}>{t('auth:sign-up')}</Link>
                </SwitchState>
            </Wrapper>
            <iframe style={{display:"none"}} src={mainHost()+'/auth'} ref={iframe}/>
        </Styles>
    );
};

export default onlyGuest(Login);
