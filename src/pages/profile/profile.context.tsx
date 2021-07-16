import React, {useState, createContext, ComponentProps, useContext} from 'react';
import {AccountObjType, AccountType} from "../../modules/auth/account.type";
import {ProfileDataType} from "../../modules/auth/profile-data.type";
import {FormikHelpers} from "formik";

export type ProfileContextType = {
    editMode: boolean,
    setEditMode:(mode:boolean) => void;
    avatarFile: File | null;
    setAvatarFile: (file:File|null) => void;
    tnbFile: File|null;
    setTnbFile: (file:File|null) => void;
    handleSubmit: (values: AccountObjType & ProfileDataType &AccountType, helper: FormikHelpers<AccountObjType&ProfileDataType&AccountType>) =>void;
}
export const ProfileContext = createContext<ProfileContextType>({
    editMode:false,
    setEditMode: () => {},
    avatarFile:null,
    tnbFile: null,
    setAvatarFile: ()=>{},
    setTnbFile:()=>{},
    handleSubmit:()=>{}
});
export const ProfileProvider = ({children}: {children:ComponentProps<any>}) => {
    const [editMode, setEditMode] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File|null>(null);
    const [tnbFile, setTnbFile] = useState<File|null>(null);
    const handleSubmit = (values: AccountObjType & ProfileDataType & AccountType, helper: FormikHelpers<AccountObjType&ProfileDataType&AccountType>) => {

    };
    return (
        <ProfileContext.Provider value={{editMode, setEditMode, avatarFile, setAvatarFile, tnbFile, setTnbFile, handleSubmit}}>
            {children}
        </ProfileContext.Provider>
    )
};
export const useProfileContext = () => useContext(ProfileContext);
