import React, {useState, useEffect} from 'react';
import Styles from './form-datepicker.styles';
import {Field, FieldProps} from "formik";
import FormError from "../form-error/form-error.component";
import {DatePicker} from 'antd';
import moment from 'moment';
import {ReactComponent as CalendarIcon} from "../../../assets/media/icons/calendar.svg";

type Props = {
    name:string;
    label: string;
    disabled?: boolean;
    onUpdate?:(name:string,value:string)=>void;
};
const FormDatepicker = ({name, label, onUpdate, disabled}: Props) => {
    return (
      <Field name={name}>
          {
              ({field, form}: FieldProps) => (
                  <Styles className={'text_input__wrapper'}>
                      <label className={'text_input__cont'}>
                          <div className={'text_input__label'}>{label}</div>
                          <DatePicker
                              suffixIcon={<CalendarIcon/>}
                              disabled={disabled}
                              value={field.value?moment(field.value):null} className={'text_input__input'}
                                      onChange={(date, dateString: string)=>{
                                          form.setFieldValue(name, dateString);
                                          onUpdate && onUpdate(name, dateString);
                                      }}
                              onBlur={field.onBlur}/>
                      </label>
                      <FormError name={name}/>
                  </Styles>
              )
          }
      </Field>
    );
};

export default FormDatepicker;
