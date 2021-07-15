import React, {useContext} from 'react';
import {OnBoardStepType} from "./onboard.type";
import Steps from "../../components/steps/steps.component";
import {Formik, Form} from 'formik';
import {OnBoardContext, OnBoardContextTypeNotNull} from "./onboard.context";
import OnboardItem from "./onboard-item.component";
import ButtonSubmit from "../../components/forms/button-submit/button-submit.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {onBoardData} from "./onboard.data";

const OnboardStep = ({validationSchema, fields}:OnBoardStepType) => {
    const {data, onSubmit, step} = useContext(OnBoardContext) as OnBoardContextTypeNotNull;
    const {t} = useTranslation();
    return (
        <Steps.Step>
            <Formik
                initialValues={data}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    {
                        fields.map(field => <OnboardItem {...field}/>)
                    }
                    <ButtonSubmit>{t(onBoardData.length-1 > step ? 'next' : 'finish')}</ButtonSubmit>
                </Form>
            </Formik>
        </Steps.Step>
    );
};

export default OnboardStep;
