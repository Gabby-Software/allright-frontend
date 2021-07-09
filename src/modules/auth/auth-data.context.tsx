import React, {createContext, useContext, useState, ComponentType, ElementType} from 'react';
import {AuthObjectType, AuthResponseType} from "../../hooks/authorization.hook";
import cookieManager from "../../managers/cookie.manager";
import {mainHost} from "../../pipes/main-host";

export const AuthDataContext = createContext<{
    data:AuthResponseType|null;
    setData:(data: AuthResponseType|null)=>void;
}>({data: null,setData: ()=>{}});
export const AuthDataProvider = ({children}:{children: any}) => {
    const access_token = cookieManager.get('access_token');
    const user = JSON.parse(cookieManager.get('auth')||'{}') as AuthObjectType;
    if(access_token && user.email_verified_at) {
        document.location.href = mainHost();
    }
    const [data, setData] = useState<AuthResponseType|null>(access_token?({access_token, user}):null);
    return (
        <AuthDataContext.Provider value={{data, setData}}>{children}</AuthDataContext.Provider>
    )
};
