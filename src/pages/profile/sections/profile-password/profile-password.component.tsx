import React, { useState, useEffect } from 'react'
import Styles from './profile-password.styles'
import FormPassword from '../../../../components/forms/form-password/form-password.component'
import { useProfileContext } from '../../profile.context'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import FormRow from '../../../../components/forms/form-row/form-row.component'

const ProfilePassword = () => {
  const { editMode } = useProfileContext()
  const { t } = useTranslation()
  return (
    <Styles>
      <ProfileTitle title={'Password'} />
      {editMode ? (
        <FormRow>
          <FormPassword
            name={'current_password'}
            label={t('profile:current-password')}
          />
          <FormPassword name={'password'} label={t('profile:new-password')} />
          <FormPassword
            name={'password_confirmation'}
            label={t('profile:confirm-password')}
          />
        </FormRow>
      ) : (
        <p className={'password'}>********</p>
      )}
    </Styles>
  )
}

export default ProfilePassword
