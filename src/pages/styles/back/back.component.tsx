import React, { useState, useEffect } from 'react'
import { ArrowLink, TextLink } from './back.styles'
import { ReactComponent as BackIcon } from '../../../assets/media/icons/back-arrow.svg'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import FormButton from '../../../components/forms/form-button/form-button.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { Link } from 'react-router-dom'

const Back = ({ to, onClick }: { to: string; onClick?: () => void }) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  if (isMobile) {
    return (
      <ArrowLink to={to} onClick={onClick}>
        <BackIcon />
      </ArrowLink>
    )
  }
  return (
    <TextLink>
      <div>
        {t('auth:back-login')}{' '}
        <Link to={to} className={'primary'} onClick={onClick}>
          {t('auth:sign-in')}
        </Link>
      </div>
    </TextLink>
  )
}

export default Back
