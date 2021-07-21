import React, {useContext} from 'react';
import {OnBoardItemType} from "./onboard.type";
import {AuthFormContext} from "../../modules/auth/auth.context";
import FormRow from "../../components/forms/form-row/form-row.component";
import FormInputLabeled from "../../components/forms/form-input-labeled/form-input-labeled.component";
import FormCountrySelect from "../../components/forms/form-country-select/form-country-select.component";
import FormTextarea from "../../components/forms/form-textarea/form-textarea.component";
import {OnBoardContext} from "./onboard.context";
import FormDatepicker from "../../components/forms/form-datepicker/form-datepicker.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import FormRadio from "../../components/forms/form-radio-button/form-radio-button.component";
import {FieldArray, Field, ArrayHelpers, FieldProps} from 'formik';

const OnboardItem = ({type, name, label, data, options, props}: OnBoardItemType) => {
    const {update} = useContext(OnBoardContext);
    const {t} = useTranslation();
    switch (type) {
        case 'row':
            return <FormRow>{data?.map(p => <OnboardItem {...p}/>)}</FormRow>;
        case 'text':
            return <FormInputLabeled name={name || ''} label={t(label || '')} onUpdate={update}/>;
        case 'country-select':
            return <FormCountrySelect name={name} label={t(label || '')} onUpdate={val => update(name || '', val)}/>;
        case 'textarea':
            return <FormTextarea name={name || ''} label={t(label || '')} onUpdate={update}/>;
        case 'date':
            return <FormDatepicker {...props} name={name || ''} label={t(label || '')} onUpdate={update}/>;
        case 'radio':
            return <FormRadio name={name || ''} label={t(label || '')} options={options || []}/>;
        case 'list':
            return (
                <Field name={name}>
                    {
                        ({field}: FieldProps) => (
                            <FieldArray name={name || ''}>
                                {
                                    (helpers: ArrayHelpers) => (
                                        field.value.map((_:any, i: number) => (
                                            data?.map(d => <OnboardItem {...d} name={`${name}[${i}].${d.name}`} key={i}/>)
                                        ))
                                    )
                                }
                            </FieldArray>
                        )
                    }
                </Field>
            )
    }
    return null;
};

export default OnboardItem;
