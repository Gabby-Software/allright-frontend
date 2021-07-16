import React, {useState, useEffect} from 'react';
import {useAuth} from "./use-auth.hook";
import {ProfileDataType} from "../modules/auth/profile-data.type";
export const useProfile = () => {
    const auth = useAuth();
    return auth.accounts.find(acc => acc.is_current)?.profile as ProfileDataType;
};
