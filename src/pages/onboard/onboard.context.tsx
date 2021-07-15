import React, {createContext, useState, useContext} from 'react';
import {AccountObjType, AccountType} from "../../modules/auth/account.type";
import {ProfileDataType} from "../../modules/auth/profile-data.type";
import cookieManager from "../../managers/cookie.manager";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {FormikHelpers} from 'formik';
import {mainHost} from "../../pipes/main-host";
import {OnBoardStepType} from "./onboard.type";

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
    const {data: initialData} = useContext(AuthDataContext);
    const initialUser = (initialData as AuthResponseType).user;
    const [step, setStep] = useState(0);
    const [data, setData] = useState<AccountObjType & ProfileDataType>({...initialUser, ...initialUser?.accounts?.find(acc => acc.is_current)?.profile as ProfileDataType});
    const update = (name:string, val:any) => setData({...data,[name]:val});
    const nextStep = () => {
        setStep(step+1);
    };
    const onSubmit = (values: AccountObjType & ProfileDataType, helper: FormikHelpers<AccountObjType & ProfileDataType>) => {
        // todo: handle submit;
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
