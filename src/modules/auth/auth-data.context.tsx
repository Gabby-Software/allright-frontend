import React, {createContext, useContext, useState, ComponentType, ElementType} from 'react';
import {AuthResponseType} from "../../hooks/authorization.hook";
import cookieManager from "../../managers/cookie.manager";
import {mainHost} from "../../pipes/main-host";
import {AccountObjType} from "./account.type";
import {Routes} from "../../enums/routes.enum";
import {useLocation} from 'react-router-dom';

export const AuthDataContext = createContext<{
    data:AuthResponseType|null;
    setData:(data: AuthResponseType|null)=>void;
}>({data: null,setData: ()=>{}});
const allowedRoutes = [
    Routes.REGISTER_ON_BOARD, Routes.ADD_ACCOUNT, Routes.ADD_ACCOUNT_ONBOARD,
    Routes.PROFILE
];
export const AuthDataProvider = ({children}:{children: any}) => {
    const access_token = cookieManager.get('access_token');
    const user = JSON.parse(cookieManager.get('auth')||'{}') as AccountObjType;
    const {pathname} = useLocation();
    if(access_token && user.email_verified_at && !allowedRoutes.includes(pathname)) {
        document.location.href = mainHost();
    }
    const [data, setData] = useState<AuthResponseType|null>(access_token?({access_token, user}):null);
    return (
        <AuthDataContext.Provider value={{data, setData: (data: AuthResponseType|null) => {
                setData(data);
                cookieManager.set('auth', JSON.stringify(data?.user));
            }}}>{children}</AuthDataContext.Provider>
    )
};
