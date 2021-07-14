import React, {useState, useEffect, useContext} from 'react';
import Styles, {Wrapper, Logo, SwitchState, ForgetPassword, MobileStickyBottom} from '../styles';
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {AuthFormContext} from "../../modules/auth/auth.context";
import {AuthFormFieldsType, AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import * as Yup from 'yup';
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import {Redirect} from "react-router";
import {Routes} from "../../enums/routes.enum";
import {onlyGuest} from "../../guards/guest.guard";
import Back from "../styles/back/back.component";
import brand from "../../config/branding.config";
import api, {handleError} from "../../managers/api.manager";
import {EP_SEND_RESET_PASSWORD} from "../../enums/api.enum";
import {toast} from "../../components/toast/toast.component";
import logger from "../../managers/logger.manager";

type EmailType = {email:string};
const ForgotPassword = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = ({email}: EmailType, helper: FormikHelpers<AuthFormFieldsType>) => {
        api.post(EP_SEND_RESET_PASSWORD, {email})
            .then((res) => {
                logger.success('RRRES', res)
                toast.show({type: 'success', msg: 'Reset password sent'});
                helper.setSubmitting(false);
                setSubmitted(true);
            })
            .catch(handleError(helper));
    };
    if(submitted) return <Redirect to={Routes.FORGOT_PASSWORD_CONFIRMATION}/>;
    return (
        <Styles>
            <Wrapper>
                <Logo/>
                <h1 className={'forgot-password__title'}>{t('auth:recover-password')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:recover-password-desc-1')}
                    <b>{t('auth:recover-password-desc-2')}</b>
                        {t('auth:recover-password-desc-3')}</span>
                    <span>{t('auth:recover-password-desc-4')}</span>
                </p>
                <Formik initialValues={form}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            email: Yup.string().required().email(),
                        })}
                >
                    {(form: FormikProps<EmailType>) => (
                        <Form>
                            <FormInputLabeled name={'email'} label={'Email'} onUpdate={update}/>
                            <MobileStickyBottom>
                            <ButtonSubmit {...form}>{t('auth:send-link')}</ButtonSubmit>
                            </MobileStickyBottom>
                        </Form>
                    )}
                </Formik>
                <Back to={Routes.LOGIN}/>
            </Wrapper>
        </Styles>
    );
};

export default onlyGuest(ForgotPassword);
