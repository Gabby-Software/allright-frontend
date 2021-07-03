import React, {useState, useEffect, useContext} from 'react';
import userTypes from "../../enums/user-types.enum";
import * as Yup from 'yup';
import {
    Formik,
    FormikProps,
    Form,
} from 'formik';
import FormSwitch from "../../components/forms/form-switch/form-switch.component";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import {Link} from 'react-router-dom';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Styles, {Wrapper, Logo, SwitchState,ForgetPassword, Title} from '../styles';
import {AuthFormContext} from "../../modules/auth/auth.context";
import {AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import {Routes} from "../../enums/routes.enum";
import logger from "../../managers/logger.manager";
import {onlyGuest} from "../../guards/guest.guard";
import brand from "../../config/branding.config";

type LoginDataType = {
    type: string;
    email: string;
    password: string;
};
const Login = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const handleSubmit = (form: LoginDataType, submitProps: {setSubmitting:(submitting: boolean) => void}) => {
        logger.info('submitting login', form);
        const {type, email, password} = form;
        // todo: handle submit
        submitProps.setSubmitting(false);
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
                            <FormInputLabeled type={'password'} name={'password'} label={'Password'} onUpdate={update}/>
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
        </Styles>
    );
};

export default onlyGuest(Login);
