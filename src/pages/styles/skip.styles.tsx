import React, { useContext } from 'react'
import styled from 'styled-components'
import FormButton from '../../components/forms/form-button/form-button.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { mainHost } from '../../pipes/main-host'
import { OnBoardContext } from '../onboard/onboard.context'

const SkipBtn = styled(FormButton)`
  margin-top: 10px;
  position: absolute;
  top: 0;
  right: 0;
  max-width: 100px;
`
export const Skip = () => {
  const { nextStep, preSubmit } = useContext(OnBoardContext)
  const { t } = useTranslation()
  return (
    <SkipBtn type={'link'}>
      <a
        onClick={async () => {
          if (preSubmit) {
            await preSubmit()
            setTimeout(nextStep, 400)
          } else {
            nextStep()
          }
        }}
      >
        {t('skip')}
      </a>
    </SkipBtn>
  )
}
