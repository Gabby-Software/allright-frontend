import React, {ComponentType, useState, useContext} from 'react';
import Styles from './add-account.styles';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import FormButton from "../../components/forms/form-button/form-button.component";
import {classes} from "../../pipes/classes.pipe";
import userTypes from "../../enums/user-types.enum";
import {ReactComponent as ClientImage} from "../../assets/media/client.svg";
import {ReactComponent as TrainerImage} from "../../assets/media/trainer.svg";
import {ReactComponent as OrgImage} from "../../assets/media/organization.svg";
import {AuthDataContext} from "../../modules/auth/auth-data.context";
import {AccessOptionType} from "../../modules/auth/access-option.type";
import api from "../../managers/api.manager";
import {EP_ADD_ACCOUNT} from "../../enums/api.enum";
import logger from "../../managers/logger.manager";
import cookieManager from "../../managers/cookie.manager";
import {Routes} from "../../enums/routes.enum";
import {Redirect} from 'react-router-dom';
import {AccountObjType} from "../../modules/auth/account.type";
import {toast} from "../../components/toast/toast.component";
import {serverError} from "../../pipes/server-error.pipe";

type AccountOptionType = {
    image: ComponentType<any>;
    title: string;
    desc: string;
    type: string;
    disabled?: boolean;
    exist?: boolean;
}
type AccountOptionActionType = {
    onClick: () => void;
    active: string;
}
const AddAccountOption = ({
                              image: Image, title, desc, type, onClick, active, disabled, exist
                          }: AccountOptionType & AccountOptionActionType) => {
    const {t} = useTranslation();
    return (
        <div className={classes(
            'add-account__option',
            active === type && 'add-account__option__active',
            (exist || disabled) && 'add-account__option__disabled',
        )}
             onClick={(disabled||exist) ? undefined : onClick}>
            <Image className={'add-account__option__image'}/>
            <div>
                <h3 className={'add-account__option__title'}>{title}</h3>
                <p className={'add-account__option__desc'}>{desc}</p>
            </div>
            <small className={'add-account__option__note'}>{disabled?t('auth:add-account.coming-soon'):exist?t('auth:add-account.already',{type}):null}</small>
        </div>
    );
};
const AddAccountForm = () => {
    const {t} = useTranslation();
    const [selected, setSelected] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);
    const {data, setData} = useContext(AuthDataContext);
    const types = data?.user?.accounts?.map(acc => acc.type);
    const options: AccountOptionType[] = [
        {
            type: userTypes.CLIENT,
            image: ClientImage,
            title: t('auth:add-account.client-title'),
            desc: t('auth:add-account.client-desc')
        },
        {
            type: userTypes.TRAINER,
            image: TrainerImage,
            title: t('auth:add-account.trainer-title'),
            desc: t('auth:add-account.trainer-desc')
        },
        {
            type: userTypes.ORG,
            image: OrgImage,
            title: t('auth:add-account.org-title'),
            desc: t('auth:add-account.org-desc'),
            disabled: true
        },
    ];
    const handleSubmit = () => {
        api.post(EP_ADD_ACCOUNT, {type:selected})
            .then(res => res.data.data)
            .then(res => {
                logger.success('ADD ACCOUNT SUCCESS', res);
                const user = data?.user as AccountObjType;
                user.accounts.push(res);
                user.accounts = user.accounts.map(acc => ({...acc, is_current: acc.uuid === res.uuid}));
                cookieManager.set('auth', JSON.stringify(user));
                setSubmitted(true);
            })
            .catch(e => toast.show({type: 'error', msg: serverError(e)}))
    };
    if(submitted)
        return <Redirect to={Routes.ADD_ACCOUNT_ONBOARD}/>;
    return (
        <Styles>
            <h2 className={'add-account__title'}>{t('auth:add-account.title')}</h2>
            <div className={'add-account__options'}>
                {
                    options.map(o => (
                        <AddAccountOption
                            {...o}
                            exist={types?.includes(o.type as AccessOptionType)}
                            onClick={() => setSelected(o.type)}
                            active={selected}
                        />))
                }
            </div>
            <FormButton
                className={'add-account__submit'}
                type={'primary'} disabled={!selected}
                onClick={handleSubmit}
            >{t('proceed')}</FormButton>
        </Styles>
    );
};

export default AddAccountForm;
