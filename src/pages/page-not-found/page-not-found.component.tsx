import React, { useState, useEffect } from 'react'
import Styles from './page-not-found.styles'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Link } from 'react-router-dom'
import { Routes } from '../../enums/routes.enum'
import FormButton from '../../components/forms/form-button/form-button.component'
import brand from '../../config/branding.config'
import { mainHost } from '../../pipes/main-host'

const PageNotFound = () => {
  const { t } = useTranslation()
  return (
    <Styles>
      <div className={'pnf__cont'}>
        <h1>404</h1>
        <p>{t('not-found-desc')}</p>
        <a href={mainHost()}>
          <FormButton type={'primary'}>
            {t('back-home', { name: brand.name })}
          </FormButton>
        </a>
      </div>
    </Styles>
  )
}

export default PageNotFound
