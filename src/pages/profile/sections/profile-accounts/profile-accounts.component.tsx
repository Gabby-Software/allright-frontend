import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/use-auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ProfileAccount from '../../components/profile-account/profile-account.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useProfileContext } from '../../profile.context'
import Styles from './profile-accounts.styles'

const ProfileAccounts = () => {
  const { accounts } = useAuth()
  const { t } = useTranslation()
  const { switchAccount, editMode } = useProfileContext()
  return (
    <Styles>
      <ProfileTitle title={'Accounts'} />
      <div className={'accounts__cont'}>
        {accounts
          .sort((a, b) => (a.type > b.type ? 1 : -1))
          .map(({ uuid, is_current, type }) => (
            <ProfileAccount
              active={is_current}
              key={uuid}
              type={type}
              disabled={editMode}
              className={'accounts__item'}
              onClick={() => editMode || switchAccount(uuid)}
            />
          ))}
        {editMode ? null : (
          <Link to={Routes.ADD_ACCOUNT} className={'accounts__add'}>
            <span>{t('profile:add-account')}</span>
          </Link>
        )}
      </div>
    </Styles>
  )
}

export default ProfileAccounts
