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
import {EP_UPDATE_PASSWORD, EP_UPDATE_PROFILE, EP_UPDATE_PROFILE_CUSTOM, EP_UPDATE_USER} from "../../enums/api.enum";
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
        const {
            first_name, last_name, email, birthday, gender, terms_and_conditions,
            phone_number, addresses, dietary_restrictions,
            injuries, about, qualifications, additional_info, avatar,
        } = values;
        const user = initialData?.user as AccountObjType;
        logger.info('SUBMITTING 1');
        try {
            const payload: any = {
                user: fillExist({
                    first_name, last_name, email, birthday, gender
                }),
                profile: {
                    phone_number, dietary_restrictions, injuries, about, qualifications, additional_info
                },

            };
            if (addresses?.length) {
                payload.addresses = addresses.map(addr => ({
                    ...addr,
                    country_code: addr?.country?.code || undefined,
                    id: addr?.id && addr.id > 0 ?addr?.id :undefined
                }));
            }
            const authRes = await api.put<{data:AccountObjType}>(EP_UPDATE_PROFILE_CUSTOM, payload)
                .then(res => res.data.data);
            (initialData as AuthResponseType).user = authRes;
            if (step + 1 >= steps.length)
                document.location.href = mainHost();
            else nextStep();
        } catch (e) {

            handleError(helper)(e);
        }
    };
    return (
        <OnBoardContext.Provider value={{data, update, step, nextStep, onSubmit, steps}}>
            {children}
        </OnBoardContext.Provider>
    );
};
