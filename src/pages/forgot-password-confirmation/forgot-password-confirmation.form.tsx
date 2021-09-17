import React from 'react'
import Styles from './forgot-password-confirmation.styles'
import { ReactComponent as ConfirmationImage } from '../../assets/media/icons/email-sent.svg'
import { ReactComponent } from '*.svg'
import { FormDesc, SwitchState } from '../styles'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums/routes.enum'

const ForgotPasswordConfirmationForm = () => {
  const { t } = useTranslation()
  return (
    <Styles>
      <ConfirmationImage className={'fpc__image'} />
      <SwitchState>
        <div>{t('auth:fpc-desc')}</div>
        <Link to={Routes.SUPPORT} className={'fpc__support'}>
          {t('auth:contact-support')}
        </Link>
      </SwitchState>
    </Styles>
  )
}

export default ForgotPasswordConfirmationForm
