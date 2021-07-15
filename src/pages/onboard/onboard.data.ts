import {OnBoardItemType, OnBoardStepType} from "./onboard.type";
import config from "../../config/branding.config";
import * as Yup from 'yup';

const liveRightOnBoard: OnBoardStepType[] = [
    {
        desc: 'onboard-more-info',
        validationSchema: Yup.object({}),
        fields: [
            {
                type: 'row',
                data: [
                    {
                        type: 'text',
                        name: 'phone_number',
                        label: 'profile:phone'
                    },
                    {
                        type: 'date',
                        name: 'birthday',
                        label: 'profile:birth-date'
                    }
                ]
            }
        ]
    },
    {
        desc: 'onboard-location',
        validationSchema: Yup.object({}),
        fields: [
            {
                type: 'text',
                name: 'address',
                label: 'profile:address',
            },
            {
                type: 'row',
                data: [
                    {
                        type: 'text',
                        name: 'city',
                        label: 'profile:city'
                    },
                    {
                        type: 'text',
                        name: 'postal_code',
                        label: 'profile:postal-code'
                    }
                ]
            },
            {
                type: "country-select",
                name: 'country.id',
                label: 'profile:country'
            }
        ]
    },
    {
        desc: 'onboard-restrictions',
        validationSchema: Yup.object({}),
        fields: [
            {
                type: 'textarea',
                name: 'dietary_restrictions',
                label: 'profile:dietary-restrictions'
            },
            {
                type: 'textarea',
                name: 'injuries',
                label: 'profile:injuries'
            },
        ]
    }
];
const eatRightOnBoard: OnBoardStepType[] = [
    {
        desc: 'onboard-location',
        validationSchema: Yup.object({}),
        fields: []
    }
];
const onBoardResource: {[key:string]:OnBoardStepType[]} = {
    LiveRight: liveRightOnBoard,
    EatRight: eatRightOnBoard
};
export const onBoardData: OnBoardStepType[] = onBoardResource[config.name] || liveRightOnBoard;
