import React from 'react';
import styled from 'styled-components';
import FormButton from "../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {mainHost} from "../../pipes/main-host";

const SkipBtn = styled(FormButton)`
            margin-top: 10px;
            position: absolute;
            top: 0;
            right: 0;
            max-width: 100px;
`;
export const Skip = () => {
    const {t} = useTranslation();
    return (
        <SkipBtn type={'link'}>
            <a href={mainHost()}>{t('skip')}</a>
        </SkipBtn>
    );
};
