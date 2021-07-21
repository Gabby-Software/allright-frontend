import {AccountObjType, AccountType} from "../../modules/auth/account.type";
import {ProfileDataType} from "../../modules/auth/profile-data.type";

export type ProfileFormType = AccountObjType & AccountType & ProfileDataType & {
    current_password: string;
    password: string;
    password_confirmation: string;
}
