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
    data: null | (AccountObjType & ProfileDataType & AccountType);
    update: (name: string, value: any) => void;
    step: number;
    steps: OnBoardStepType[];
    nextStep: () => void;
    onSubmit: (values: AccountObjType & AccountType & ProfileDataType, helper: FormikHelpers<AccountType & AccountObjType & ProfileDataType>) => void;
};
export type OnBoardContextTypeNotNull = {
    data: AccountObjType & ProfileDataType &AccountType;
    update: (name: string, value: any) => void;
    step: number;
    steps: OnBoardStepType[];
    nextStep: () => void;
    onSubmit: (values: AccountObjType & AccountType & ProfileDataType, helper: FormikHelpers<AccountType&AccountObjType & ProfileDataType>) => void;
};
export const OnBoardContext = createContext<OnBoardContextType>({
    data: null,
    update: () => {
    },
    steps: [],
    step: 0,
    nextStep: () => {
    },
    onSubmit: () => {
    }
});
export const OnBoardProvider = ({children, steps}: { children: React.ReactNode, steps: OnBoardStepType[] }) => {
    const {data: initialData, setData: setInitialData} = useContext(AuthDataContext);
    const initialUser = (initialData as AuthResponseType).user;
    const [step, setStep] = useState(0);
    const [data, setData] = useState<AccountObjType & AccountType & ProfileDataType>({...initialUser, ...initialUser?.accounts?.find(acc => acc.is_current) as AccountType,...initialUser?.accounts?.find(acc => acc.is_current)?.profile as ProfileDataType});
    const update = (name: string, val: any) => setData({...data, [name]: val});
    const nextStep = () => {
        setStep(step + 1);
    };
    const onSubmit = async (values: AccountObjType & ProfileDataType &AccountType,
                            helper: FormikHelpers<AccountObjType & ProfileDataType & AccountType>) => {
        try {
            const {
                first_name, last_name, email, birthday, gender,
                phone_number, addresses, dietary_restrictions, injuries, about, qualifications,
                additional_info, postal_code
            } = values;
            const authPayload = fillExist({
                first_name,
                last_name,
                email,
                birthday,
                gender,
                postal_code,
            });

            const res = (await api.put(EP_UPDATE_USER, authPayload).then(res => res.data.data)) as AccountObjType;
            (initialData as AuthResponseType).user = res;
            setInitialData({...initialData} as AuthResponseType);
            cookieManager.set('auth', JSON.stringify(res));
            const profilePayload = fillExist({
                phone_number, dietary_restrictions, injuries, about, qualifications, additional_info
            });
            const res2 = (await api.put(EP_UPDATE_PROFILE, profilePayload).then(res => res.data.data)) as AccountType;
            const account = initialUser.accounts.findIndex(acc => acc.is_current);
            initialUser.accounts[account] = res2;
            setInitialData({...initialData} as AuthResponseType);
            cookieManager.set('auth', JSON.stringify(initialUser));
            if (step + 1 >= steps.length)
                document.location.href = mainHost();
            else nextStep();
        } catch (e) {
            return handleError(helper)(e);
        }
    };
    return (
        <OnBoardContext.Provider value={{data, update, step, nextStep, onSubmit, steps}}>
            {children}
        </OnBoardContext.Provider>
    );
};
