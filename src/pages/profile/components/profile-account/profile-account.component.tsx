import React, {useState, useEffect} from 'react';
import Styles from './profile-account.styles';
import {classes} from "../../../../pipes/classes.pipe";
import {noImage} from "../../../../pipes/no-image.pipe";
import {capitalize} from "../../../../pipes/capitalize.pipe";

type Prop = {
    first_name: string;
    last_name: string;
    type: string;
    image: string;
    active?: boolean;
    className?: string;
    noRadio?: boolean;
    onClick?: () => void;
};
const ProfileAccount = ({first_name, last_name, type, image, active, className, noRadio, onClick}: Prop) => {
    return (
        <Styles className={classes(className, active && 'account__active')} onClick={onClick}>
            {
                noRadio ? null : (
                    <div className={classes('account__radio', active && 'account__radio__active')}/>
                )
            }
            <div className={'account__data'}>
                <div className={'account__type'}>{capitalize(type)}</div>
            </div>
        </Styles>
    );
};

export default ProfileAccount;
