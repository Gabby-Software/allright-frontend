import React, {useState, createContext, ComponentProps, useContext, useEffect} from 'react';
import {AccountObjType, AccountType} from "../../modules/auth/account.type";
import {ProfileDataType} from "../../modules/auth/profile-data.type";
import {FormikHelpers} from "formik";
import {ProfileFormType} from "./profile.type";
import logger from "../../managers/logger.manager";
import api, {handleError} from "../../managers/api.manager";
import {
    EP_GET_ADDRESSES,
    EP_UPDATE_AVATAR,
    EP_UPDATE_PROFILE,
    EP_UPDATE_TNB,
    EP_UPDATE_USER
} from "../../enums/api.enum";
import {FileType} from "../../modules/auth/file.type";
import {useAuth} from "../../hooks/use-auth.hook";
import {useProfile} from "../../hooks/use-profile.hook";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AuthResponseType} from "../../hooks/authorization.hook";
import {AddressType} from "../../types/address.type";

export type ProfileContextType = {
    editMode: boolean,
    setEditMode: (mode: boolean) => void;
    avatarFile: File | null;
    setAvatarFile: (file: File | null) => void;
    tnbFile: File | null;
    setTnbFile: (file: File | null) => void;
    handleSubmit: (values: ProfileFormType, helper: FormikHelpers<ProfileFormType>) => void;
    addresses: AddressType[];
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
    addresses:[]
});
export const ProfileProvider = ({children}: { children: ComponentProps<any> }) => {
    const [editMode, setEditMode] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [tnbFile, setTnbFile] = useState<File | null>(null);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const {data, setData} = useContext(AuthDataContext);
    const {uuid} = useAuth();
    useEffect(() => {
        api.get<{data:AddressType[]}>(EP_GET_ADDRESSES)
            .then(res => res.data.data)
            .then(address => setAddresses(address||[]))
    }, [uuid]);
    const handleSubmit = async (values: ProfileFormType, helper: FormikHelpers<ProfileFormType>) => {
        const {
            first_name, last_name, email, birthday, gender, terms_and_conditions,
            phone_number, addresses, city, dietary_restrictions,
            injuries, about, qualifications, additional_info, avatar
        } = values;
        const authPayload = {
            first_name, last_name, email, birthday, gender, city
        };
        const user = data?.user as AccountObjType;
        logger.info('SUBMITTING 1');
        try {
            const authRes = (await api.put(EP_UPDATE_USER, authPayload).then(res => res.data.data)) as AccountObjType;
            (data as AuthResponseType).user = {
                ...authRes,
                accounts: (data?.user?.accounts as AccountType[])
            };
            setData({
                ...data
            } as AuthResponseType);
            logger.info('SUBMITTING 2');
            const profilePayload = {
                phone_number, dietary_restrictions, injuries, about, qualifications, additional_info
            };
            const res = (await api.put(EP_UPDATE_PROFILE, profilePayload).then(res => res.data.data)) as AccountType;
            const idx = user.accounts.findIndex(acc => acc.is_current);
            user.accounts[idx] = res;
            setData({
                ...data
            } as AuthResponseType);
            logger.info('SUBMITTING 3');
            if (terms_and_conditions?.file_name || tnbFile) {
                const fd = new FormData();
                tnbFile && fd.append('terms_conditions', tnbFile || '');
                const tnbres = (await  api.post(EP_UPDATE_TNB, fd).then(res => res.data.data)) as AccountType;
                logger.success('TNB RESPONSE', res);
                logger.info('SUBMITTING 4');
                const idx = user.accounts.findIndex(acc => acc.is_current);
                user.accounts[idx] = tnbres;
                setData({
                    ...data
                } as AuthResponseType);
            }
            if (avatarFile) {
                const fd = new FormData();
                fd.append('avatar', avatarFile);
                const res = (await api.post(EP_UPDATE_AVATAR, fd).then(res => res.data.data)) as FileType;
                logger.success('AVATAR RESPONSE', res);
                logger.info('SUBMITTING 5');
                user.avatar = res;
                setData({...data} as AuthResponseType);
            }
            setEditMode(false);
        } catch (e) {
            alert(e.message);
            handleError(helper)(e);
        }
    };
    return (
        <ProfileContext.Provider
            value={{editMode, setEditMode, avatarFile, setAvatarFile, tnbFile, setTnbFile, handleSubmit, addresses}}>
            {children}
        </ProfileContext.Provider>
    )
};
export const useProfileContext = () => useContext(ProfileContext);
