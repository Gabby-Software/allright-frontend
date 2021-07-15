import React, {createContext, useState, useContext} from 'react';
import {AccountObjType, AccountType} from "../../modules/auth/account.type";
import {ProfileDataType} from "../../modules/auth/profile-data.type";
import cookieManager from "../../managers/cookie.manager";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {FormikHelpers} from 'formik';
import {mainHost} from "../../pipes/main-host";
import {OnBoardStepType} from "./onboard.type";
import api, {handleError} from "../../managers/api.manager";
import logger from "../../managers/logger.manager";
import {EP_UPDATE_PROFILE, EP_UPDATE_USER} from "../../enums/api.enum";
import {fillExist} from "../../pipes/fill-exist.pipe";

export type OnBoardContextType = {
    data: null | (AccountObjType & ProfileDataType);
    update: (name: string, value: any) => void;
    step: number;
    steps: OnBoardStepType[];
    nextStep: () => void;
    onSubmit: (values: AccountObjType & ProfileDataType, helper: FormikHelpers<AccountObjType & ProfileDataType>) => void;
};
export type OnBoardContextTypeNotNull = {
    data: AccountObjType & ProfileDataType;
    update: (name: string, value: any) => void;
    step: number;
    steps: OnBoardStepType[];
    nextStep: () => void;
    onSubmit: (values: AccountObjType & ProfileDataType, helper: FormikHelpers<AccountObjType & ProfileDataType>) => void;
};
export const OnBoardContext = createContext<OnBoardContextType>({
    data: null,
    update: () => {},
    steps: [],
    step: 0,
    nextStep: () => {},
    onSubmit: () => {}
});
export const OnBoardProvider = ({children, steps}: {children: React.ReactNode, steps: OnBoardStepType[]}) => {
    const {data: initialData, setData: setInitialData} = useContext(AuthDataContext);
    const initialUser = (initialData as AuthResponseType).user;
    const [step, setStep] = useState(0);
    const [data, setData] = useState<AccountObjType & ProfileDataType>({...initialUser, ...initialUser?.accounts?.find(acc => acc.is_current)?.profile as ProfileDataType});
    const update = (name:string, val:any) => setData({...data,[name]:val});
    const nextStep = () => {
        setStep(step+1);
    };
    const onSubmit = async (values: AccountObjType & ProfileDataType, helper: FormikHelpers<AccountObjType & ProfileDataType>) => {
        // todo: handle submit;
        const {first_name, last_name, email, birthday, gender, country,
            phone_number, address, city, dietary_restrictions, injuries, about, qualifications,
            additional_information, region_name, postal_code} = values;
        const authPayload = fillExist({
            first_name, last_name, email, birthday, gender, country_id: country?.id, city, region_name, postal_code,address
        });
        try {
            const res = (await api.put(EP_UPDATE_USER, authPayload).then(res => res.data.data)) as AccountObjType;
            (initialData as AuthResponseType).user = res;
            setInitialData({...initialData} as AuthResponseType);
            cookieManager.set('auth', JSON.stringify(res));
        } catch (e) {
            return handleError(helper)(e);
        }
        const profilePayload = fillExist({
            phone_number, dietary_restrictions, injuries, about, qualifications, additional_information
        });
        try {
            const res = (await api.put(EP_UPDATE_PROFILE, profilePayload).then(res => res.data.data)) as ProfileDataType;
            const account = initialUser.accounts.find(acc => acc.is_current) as AccountType;
            account.profile = res;
            setInitialData({...initialData} as AuthResponseType);
            cookieManager.set('auth', JSON.stringify(initialUser));
        } catch(e) {
            return handleError(helper)(e);
        }
        if(step+1>=steps.length)
            document.location.href = mainHost();
        else nextStep();
    };
    return (
        <OnBoardContext.Provider value={{data, update, step, nextStep, onSubmit, steps}}>
            {children}
        </OnBoardContext.Provider>
    );
};
