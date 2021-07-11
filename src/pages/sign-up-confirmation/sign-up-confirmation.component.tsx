import React, {useState, useEffect, useContext} from 'react';
import Styles, {ChangeEmail, Logo, ResendEmail, Wrapper} from "../styles";

import {useTranslation} from "../../modules/i18n/i18n.hook";
import Back from "../styles/back/back.component";
import {Routes} from "../../enums/routes.enum";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import {AuthFormContext} from "../../modules/auth/auth.context";
import * as Yup from "yup";
import {AuthFormFieldsType, AuthFormTypeNotNull} from "../../modules/auth/auth-form.type";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import FormRow from "../../components/forms/form-row/form-row.component";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import FormButton from "../../components/forms/form-button/form-button.component";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {onlyAuth} from "../../guards/auth.guard";
import {auth} from "../../managers/auth.manager";
import api, {handleError} from "../../managers/api.manager";
import {EP_VERIFY_EMAIL_RESEND} from "../../enums/api.enum";
import {toast} from "../../components/toast/toast.component";
import {serverError} from "../../pipes/server-error.pipe";

const SignUpConfirmation = () => {
    const {t} = useTranslation();
    const {form, update} = useContext(AuthFormContext) as AuthFormTypeNotNull;
    const {setData} = useContext(AuthDataContext);
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const resendEmail = () => {
        api.post(EP_VERIFY_EMAIL_RESEND)
            .then(()=>toast.show({type: "success", msg: t("alerts:resend-verification-success")}))
            .catch(e => toast.show({type: "error", msg: serverError(e)}))
    };
    const changeEmail = (values: AuthFormFieldsType) => {
      // api.post()

      setIsChangingEmail(false);
    };
    return (
        <Styles>
            <Wrapper>
                <Logo/>
                <h1 className={'forgot-password__title'}>{t('auth:sign-up')}</h1>
                <div className={'forgot-password__hr'}/>
                <p className={'forgot-password__desc'}>
                    <span>{t('auth:sign-up-confirm-1')}</span>
                    <span>{t('auth:sign-up-confirm-2')}</span>
                </p>
                {
                    isChangingEmail?(
                        <Formik initialValues={form}
                            onSubmit={changeEmail}
                            validationSchema={Yup.object({
                                email: Yup.string().required().email()
                            })}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <FormInputLabeled name={'email'} label={'Email'}/>
                                        <FormRow>
                                            <FormButton type={'default'} onClick={() => {
                                                form.resetForm();
                                                setIsChangingEmail(false);
                                            }}>{t('cancel')}</FormButton>
                                            <ButtonSubmit>{t('submit')}</ButtonSubmit>
                                        </FormRow>
                                    </Form>
                                )
                            }
                        </Formik>
                    ):(
                        <>
                            <ResendEmail>
                                <span>{t('auth:not-received')}</span>
                                <a onClick={resendEmail}>{t('auth:send-again')}</a>
                            </ResendEmail>
                            <div className={'center'}>or</div>
                            <ChangeEmail><a onClick={() => {
                                setIsChangingEmail(true);
                            }}>{t('auth:change-email')}</a></ChangeEmail>
                            <Back to={Routes.LOGIN} onClick={() => {
                                setData(null);
                                auth.current = null;
                            }}/>
                        </>
                    )
                }
            </Wrapper>
        </Styles>
    )
};

export default onlyAuth(SignUpConfirmation);
