import React, {useState, useEffect, useContext} from 'react';
import {AuthDataContext} from "../modules/auth/auth-data.context";
import {AccountObjType, AccountType} from "../modules/auth/account.type";
export const useAuth = () => {
    const {data} = useContext(AuthDataContext);
    const user = data?.user as AccountObjType;
    return {
        ...data?.user,
        ...data?.user.accounts.find(acc => acc.is_current)
    } as AccountObjType & AccountType;
};
