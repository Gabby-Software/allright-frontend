import React, {useState, createContext, ComponentProps, useContext, useEffect} from 'react';
import {AccountObjType, AccountType} from "../../modules/auth/account.type";
import {ProfileDataType} from "../../modules/auth/profile-data.type";
import {FormikHelpers} from "formik";
import {ProfileFormType} from "./profile.type";
import logger from "../../managers/logger.manager";
import api, {handleError} from "../../managers/api.manager";
import {
    EP_GET_ADDRESSES, EP_GET_USER,
    EP_UPDATE_AVATAR, EP_UPDATE_PASSWORD,
    EP_UPDATE_PROFILE, EP_UPDATE_PROFILE_CUSTOM,
    EP_UPDATE_TNB,
    EP_UPDATE_USER
} from "../../enums/api.enum";
import {FileType} from "../../modules/auth/file.type";
import {useAuth} from "../../hooks/use-auth.hook";
import {useProfile} from "../../hooks/use-profile.hook";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {AddressType} from "../../types/address.type";
import {fillExist} from "../../pipes/fill-exist.pipe";
import cookieManager from "../../managers/cookie.manager";

export type ProfileContextType = {
    editMode: boolean,
    setEditMode: (mode: boolean) => void;
    avatarFile: File | null;
    setAvatarFile: (file: File | null) => void;
    tnbFile: File | null;
    setTnbFile: (file: File | null) => void;
    handleSubmit: (values: ProfileFormType, helper: FormikHelpers<ProfileFormType>) => void;
    addresses: AddressType[];
    switchAccount: (uuid: string) => void;
}
export const ProfileContext = createContext<ProfileContextType>({
    editMode: false,
    setEditMode: () => {
    },
    avatarFile: null,
    tnbFile: null,
    setAvatarFile: () => {
    },
    setTnbFile: () => {
    },
    handleSubmit: () => {
    },
    addresses: [],
    switchAccount: () => {
    }
});
export const ProfileProvider = ({children}: { children: ComponentProps<any> }) => {
    const [editMode, setEditMode] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [tnbFile, setTnbFile] = useState<File | null>(null);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const {data, setData} = useContext(AuthDataContext);
    const {uuid, accounts} = useAuth();
    useEffect(() => {
        api.get(EP_GET_USER)
            .then(res => res.data.data)
            .then(res => {
                const d = data as AuthResponseType;
                d.user = res;
                setData({...d});
                cookieManager.set('auth', JSON.stringify(res));
            });
    }, [uuid]);
    const switchAccount = (new_uuid: string) => {
        if(uuid === new_uuid) return;
        (data as AuthResponseType).user.accounts = data?.user.accounts.map(acc => ({
            ...acc,
            is_current: acc.uuid === new_uuid
        })) || [];
        setData({...data} as AuthResponseType);
        cookieManager.set('auth', JSON.stringify(data?.user));
    };
    const handleSubmit = async (values: ProfileFormType, helper: FormikHelpers<ProfileFormType>) => {
        const {
            first_name, last_name, email, birthday, gender, terms_and_conditions,
            phone_number, addresses, dietary_restrictions,
            injuries, about, qualifications, additional_info, avatar,
            password, password_confirmation, current_password
        } = values;
        const user = data?.user as AccountObjType;
        logger.info('SUBMITTING 1');
        try {
            if(current_password && password && password_confirmation) {
                await api.put(EP_UPDATE_PASSWORD, {
                    current_password, password, password_confirmation
                })
            }
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
                })).slice(0,2);
            }
            const authRes = await api.put<{data:AccountObjType}>(EP_UPDATE_PROFILE_CUSTOM, payload)
                .then(res => res.data.data);
            (data as AuthResponseType).user = authRes;
            // const authPayload = fillExist({
            //     first_name, last_name, email, birthday, gender, city
            // });
            // const authRes = (await api.put(EP_UPDATE_USER, authPayload).then(res => res.data.data)) as AccountObjType;
            // (data as AuthResponseType).user = {
            //     ...authRes,
            //     accounts: (data?.user?.accounts as AccountType[])
            // };
            // setData({
            //     ...data
            // } as AuthResponseType);
            // logger.info('SUBMITTING 2');
            // const profilePayload = fillExist({
            //     phone_number, dietary_restrictions, injuries, about, qualifications, additional_info
            // });
            // const res = (await api.put(EP_UPDATE_PROFILE, profilePayload).then(res => res.data.data)) as AccountType;
            // const idx = user.accounts.findIndex(acc => acc.is_current);
            // user.accounts[idx] = res;
            // setData({
            //     ...data
            // } as AuthResponseType);
            // logger.info('SUBMITTING 3');
            // setData({
            //     ...data
            // } as AuthResponseType);
            if (avatarFile) {
                const fd = new FormData();
                fd.append('avatar', avatarFile);
                const res = (await api.post(EP_UPDATE_AVATAR, fd).then(res => res.data.data)) as FileType;
                logger.success('AVATAR RESPONSE', res);
                (data as AuthResponseType).user.avatar = res;
                logger.info('SUBMITTING 5', user, data);
            } else if (avatar?.file_name && !avatar?.url) {
                await api.delete(EP_UPDATE_AVATAR);
                (data as AuthResponseType).user.avatar = null;
            }
            if (terms_and_conditions?.file_name || tnbFile) {
                const fd = new FormData();
                tnbFile && fd.append('terms_conditions', tnbFile || '');
                const tnbres = (await api.post(EP_UPDATE_TNB, fd).then(res => res.data.data)) as AccountType;
                logger.success('TNB RESPONSE', tnbres);
                logger.info('SUBMITTING 4');
                const idx = (data as AuthResponseType).user.accounts.findIndex(acc => acc.is_current);
                (data as AuthResponseType).user.accounts[idx].profile = tnbres.profile;
            }
            setData({
                ...data
            } as AuthResponseType);
            setEditMode(false);
        } catch (e) {
            setData({
                ...data
            } as AuthResponseType);
            handleError(helper)(e);
        } finally {

        }
    };
    return (
        <ProfileContext.Provider
            value={{
                editMode,
                setEditMode,
                avatarFile,
                setAvatarFile,
                tnbFile,
                setTnbFile,
                handleSubmit,
                addresses,
                switchAccount
            }}>
            {children}
        </ProfileContext.Provider>
    )
};
export const useProfileContext = () => useContext(ProfileContext);
