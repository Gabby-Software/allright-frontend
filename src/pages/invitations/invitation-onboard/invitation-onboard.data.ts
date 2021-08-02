import {onBoardData} from "../../onboard/onboard.data";
import {OnBoardStepType} from "../../onboard/onboard.type";
import * as Yup from 'yup';

export const invitationOnBoardData: OnBoardStepType[] = [
    {
        desc: 'onboard-set-password',
        validationSchema: Yup.object({
            password: Yup.string().password(),
            password_confirmation: Yup.string().equals([Yup.ref('password')], 'passwords-not-match')
        }),
        fields: [
            {
                type: 'row',
                data: [
                    {
                        type: 'password',
                        name: 'password',
                        label: 'profile:new-password'
                    },
                    {
                        type: 'password',
                        name: 'password_confirmation',
                        label: 'profile:confirm-password'
                    }
                ]
            }
        ]
    },
    ...onBoardData
];
