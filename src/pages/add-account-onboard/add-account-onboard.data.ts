import {OnBoardStepType} from "../onboard/onboard.type";
import * as Yup from 'yup';

export const addAccountOnboardData: OnBoardStepType[] = [
    {
        desc: '',
        validationSchema: Yup.object({}),
        fields: []
    }
];
