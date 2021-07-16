import React, {useState, useEffect} from 'react';
import {useAuth} from "./use-auth.hook";
import {ProfileDataType} from "../modules/auth/profile-data.type";
import {AddressType} from "../types/address.type";
import {PaymentInfoType} from "../modules/auth/payment-info.type";
import {FileType} from "../modules/auth/file.type";

export const useProfile = () => {
    const auth = useAuth();
    const profile = auth.accounts.find(acc => acc.is_current)?.profile;
    return {
        phone_number: '',
        addresses: [],
        dietary_restrictions: '',
        injuries: '',
        notes: '',
        custom_url: '',
        about: '',
        qualifications: '',
        additional_info: '',
        terms_and_conditions: null,
        ...profile
    } as ProfileDataType;
};
