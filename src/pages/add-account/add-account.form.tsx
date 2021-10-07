import React, { ComponentType, useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { ReactComponent as ClientImage } from '../../assets/media/client-2.svg'
import { ReactComponent as OrgImage } from '../../assets/media/organization-2.svg'
import { ReactComponent as TrainerImage } from '../../assets/media/trainer-2.svg'
import FormButton from '../../components/forms/form-button/form-button.component'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { AccessOptionType } from '../../modules/auth/access-option.type'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { classes } from '../../pipes/classes.pipe'
import { AddAccountContext, AddAccountSteps } from './add-account.context'
import Styles from './add-account.styles'

type AccountOptionType = {
  image: ComponentType<any>
  title: string
  desc: string
  type: string
  disabled?: boolean
  exist?: boolean
}

type AccountOptionActionType = {
  onClick: () => void
  active: string
}

const AddAccountOption = ({
  image: Image,
  title,
  desc,
  type,
  onClick,
  active,
  disabled,
  exist
}: AccountOptionType & AccountOptionActionType) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return (
    <div
      className={classes(
        'add-account__option',
        active === type && 'add-account__option__active',
        (exist || disabled) && 'add-account__option__disabled'
      )}
      onClick={disabled || exist ? undefined : onClick}
    >
      <Image className={'add-account__option__image'} />
      <div>
        <h3 className={'add-account__option__title'}>{title}</h3>
        <p className={'add-account__option__desc'}>{desc}</p>
        {isMobile && (
          <small
            className={`add-account__option__note ${
              disabled || exist
                ? 'add-account__option__note__red'
                : 'add-account__option__note__blue'
            }`}
          >
            {disabled
              ? t('auth:add-account.coming-soon')
              : exist
              ? type === 'client'
                ? t('auth:add-account.already-client')
                : t('auth:add-account.already', { type })
              : t('auth:add-account.available')}
          </small>
        )}
      </div>
      {!isMobile && (
        <small
          className={`add-account__option__note ${
            disabled || exist
              ? 'add-account__option__note__red'
              : 'add-account__option__note__blue'
          }`}
        >
          {disabled
            ? t('auth:add-account.coming-soon')
            : exist
            ? type === 'client'
              ? t('auth:add-account.already-client')
              : t('auth:add-account.already', { type })
            : t('auth:add-account.available')}
        </small>
      )}
    </div>
  )
}
const AddAccountForm = () => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string>('')
  const [submitted] = useState(false)
  const { data } = useContext(AuthDataContext)
  const { setStep, setAccountType } = useContext(AddAccountContext)
  const types = data?.user?.accounts?.map((acc) => acc.type)
  const options: AccountOptionType[] = [
    {
      type: userTypes.CLIENT,
      image: ClientImage,
      title: t('auth:add-account.client-title'),
      desc: t('auth:add-account.client-desc')
    },
    {
      type: userTypes.TRAINER,
      image: TrainerImage,
      title: t('auth:add-account.trainer-title'),
      desc: t('auth:add-account.trainer-desc')
    },
    {
      type: userTypes.ORG,
      image: OrgImage,
      title: t('auth:add-account.org-title'),
      desc: t('auth:add-account.org-desc'),
      disabled: true
    }
  ]

  const handleSubmit = () => {
    setAccountType(selected)
    setStep(AddAccountSteps.ONBOARD)
  }

  const isMobile = useIsMobile()

  if (submitted) return <Redirect to={Routes.ADD_ACCOUNT_ONBOARD} />

  return (
    <Styles>
      <h2 className={'add-account__title'}>{t('auth:add-account.title')}</h2>
      <p className={'add-account__sub-title'}>
        {t('auth:add-account.subtitle')}
      </p>
      <div className={'add-account__options'}>
        {options.map((o) => (
          <AddAccountOption
            key={o.title + o.type}
            {...o}
            exist={types?.includes(o.type as AccessOptionType)}
            onClick={() => setSelected(o.type)}
            active={selected}
          />
        ))}
      </div>
      <div className={'add-account__submit__wrapper'}>
        <FormButton
          className={'add-account__submit'}
          type={'primary'}
          disabled={types?.includes('trainer') && types?.includes('client')}
          style={{
            visibility: isMobile ? 'visible' : !selected ? 'hidden' : 'visible'
          }}
          onClick={handleSubmit}
        >
          {t('proceed')}
        </FormButton>
      </div>
    </Styles>
  )
}

export default AddAccountForm
