import React, {createContext, useContext, useState, ComponentType, ElementType} from 'react';
import {AuthResponseType} from "../../hooks/authorization.hook";

export const AuthDataContext = createContext<{
    data:AuthResponseType|null;
    setData:(data: AuthResponseType|null)=>void;
}>({data: null,setData: ()=>{}});
export const AuthDataProvider = ({children}:{children: any}) => {
    const [data, setData] = useState<AuthResponseType|null>(null);
    return (
        <AuthDataContext.Provider value={{data, setData}}>{children}</AuthDataContext.Provider>
    )
};
