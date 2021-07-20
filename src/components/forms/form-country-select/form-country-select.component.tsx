import React, {useState, useEffect} from 'react';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import FormSelect from "../form-select/form-select.component";
import {OptionType} from "../../../types/option.type";
import api from "../../../managers/api.manager";
import { EP_GET_COUNTRIES} from "../../../enums/api.enum";
import logger from "../../../managers/logger.manager";
import {CountryType} from "../../../types/country.type";

type FormCountrySelectPropsType = {
    name?: string;
    label?: string;
    onUpdate?: (val:string) =>void;
}
const FormCountrySelect = ({name = 'country.code', label, onUpdate}: FormCountrySelectPropsType) => {
    const {t} = useTranslation();
    const [countries, setCountries] = useState<OptionType[]>([]);
    useEffect(() => {
        const c = localStorage.getItem('countries');
        if(c){
            setCountries(JSON.parse(c));
        } else {
            api.get<{data:CountryType[]}>(EP_GET_COUNTRIES)
                .then(res => res.data.data)
                .then(cs => {
                    logger.success('COOUNTRIES', cs,cs.map(country => ({label: country.name_english, value: String(country.code)})));
                    setCountries(cs.map(country => ({label: country.name_english, value: String(country.code)})))
                })
        }
        // import('./form-country-select.data.json').then(module => module.default).then((data) => {
        //     setCountries((data as unknown as string[]).map(c => ({label:c, value: c})));
        // })
    }, []);
    return (
        <FormSelect name={name} label={label || t('profile:country')} options={countries} onUpdate={onUpdate}/>
    )
};

export default FormCountrySelect;
