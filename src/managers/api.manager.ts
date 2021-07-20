import axios, {AxiosRequestConfig} from 'axios';
import cookieManager from "./cookie.manager";
import {EP_CSRF, EP_LOGOUT} from "../enums/api.enum";
import logger from "./logger.manager";
import {Routes} from "../enums/routes.enum";
import {FormikHelpers} from "formik";
import {toast} from "../components/toast/toast.component";
import {serverError} from "../pipes/server-error.pipe";
import {i18n} from "../modules/i18n/i18n.context";
import {auth} from "./auth.manager";
import {AccountType} from "../modules/auth/account.type";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});
logger.info('ENV', process.env);
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = cookieManager.get('access_token');
        const uuid = JSON.parse(cookieManager.get('auth')||'{}')
            ?.accounts?.find((acc:AccountType) => acc.is_current).uuid;
        if(token) config.headers['Authorization'] =  `Bearer ${token}`;
        if(uuid) config.headers['Account-Token'] =  uuid;
        logger.info('HTTP_REQUEST', token, config.url, config.data);
        return config;
    },
    err => Promise.reject(err)
);
api.interceptors.response.use(
    res => {
        logger.info('HTTP_RESPONSE', res.config.url, res);
        return res;
    },
    err => {
        if(!err.response) {
            logger.error('HTTP_ERROR', 'network error!');
            // toast.show({type: 'error',msg:i18n.t('errors:network-error')});
            return Promise.reject(err);
        }
        logger.error('HTTP_ERROR', err.response?.data?.message || err.message, err.response);
        if(err.response.status === 401 && false) {
            // Todo: call api to logout
            api.post(EP_LOGOUT);
            localStorage.clear();
            cookieManager.removeAll();
            // Todo: remove user data from redux store
            window.location.pathname = Routes.LOGIN;
        }
        return Promise.reject(err)
    }
);
export const handleError = (formHelper?:FormikHelpers<any>) => (e: any) => {
    if(e?.response?.data?.errors) {
        for (const [name, [message]] of Object.entries<string[]>(e.response.data.errors)) {
            formHelper?.setFieldError(name, message);
        }
        toast.show({type: 'error', msg: Object.values<string[]>(e.response.data.errors)[0][0]})
    } else {
        toast.show({type: 'error', msg: serverError(e)})
    }
    formHelper?.setSubmitting(false)
};
export default api;
