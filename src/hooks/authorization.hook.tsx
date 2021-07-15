import React, {useState, useEffect} from 'react';
import {AccountObjType} from "../modules/auth/account.type";
type IframeEventType = {
    event: string;
    key: string;
    [key:string]:any;
}
const messages = {
    CHECK_LOGIN: 'check_login',
    DO_LOGIN: 'do_login',
};

export type AuthResponseType = {
    access_token: string;
    expires_in?: number;
    user: AccountObjType;
}

export const useAuthorization = (isAuthCallback: () => AuthResponseType, handleAuthCallback: (auth: AuthResponseType) => void) => {

    useEffect(() => {
        const handler = ({data:{key, event, ...payload}}: MessageEvent<IframeEventType>) => {
            switch (event) {
                case messages.CHECK_LOGIN:
                    window.parent.postMessage({key, response: isAuthCallback()}, '*');
                    break;
                case messages.DO_LOGIN:
                    handleAuthCallback(payload as AuthResponseType);
                    window.parent.postMessage({key, response: 1}, '*');
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);
};
