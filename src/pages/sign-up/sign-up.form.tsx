import React, {useContext, useRef, useState} from 'react';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {AuthFormContext} from "../../modules/auth/auth.context";
import {AuthFormFieldsType, AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import logger from "../../managers/logger.manager";
import {ipstack} from "../../managers/ipstack.manager";
import api, {handleError} from "../../managers/api.manager";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {EP_REGISTER} from "../../enums/api.enum";
import cookieManager from "../../managers/cookie.manager";
import userTypes from "../../enums/user-types.enum";
import genderTypes from "../../enums/gender-types";
import FormSwitch from "../../components/forms/form-switch/form-switch.component";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import FormRadio from "../../components/forms/form-radio-button/form-radio-button.component";
import FormPassword from "../../components/forms/form-password/form-password.component";
import {MobileStickyBottom} from "../styles";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";

type LoginDataType = {
    type: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
};
const SignUpForm = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const {setData} = useContext(AuthDataContext);
    const handleSubmit = async (form: LoginDataType, helper: FormikHelpers<AuthFormFieldsType>) => {
        logger.info('submitting form', form);
        const {first_name, last_name, email, password, type, gender} = form;
        // const defaults = await ipstack.getDefaults();
        api.post<AuthResponseType>(EP_REGISTER, {
            lang_code: navigator.language.substring(0,2),
            first_name, last_name, email, password, gender,
            account_type: type,
            password_confirmation: password
        })
            .then(res => res.data)
            .then((res) => {
                logger.success('REGISTRATION SUCCESS', res);
                cookieManager.set('access_token', res.access_token, res.expires_in);
                cookieManager.set('auth', JSON.stringify(res.user), res.expires_in);
                setData(res);
                helper.setSubmitting(false);
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
        {label: 'Other', value: genderTypes.OTHER},
    ];
    return (
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
                    <MobileStickyBottom>
                        <ButtonSubmit>{t('auth:sign-up')}</ButtonSubmit>
                    </MobileStickyBottom>
                </Form>
            )}
        </Formik>
    )
};

export default SignUpForm;
