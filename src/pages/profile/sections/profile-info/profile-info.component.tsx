import React, { useState, useEffect } from 'react'
import Styles from './profile-info.styles'
import { useProfileContext } from '../../profile.context'
import { useAuth } from '../../../../hooks/use-auth.hook'
import { profileInfo } from '../../profile.data'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import OnboardItem from '../../../onboard/onboard-item.component'
import ProfileField from '../../components/profile-field/profile-field.component'
import FormRow from '../../../../components/forms/form-row/form-row.component'

const ProfileInfo = () => {
  const { editMode } = useProfileContext()
  const { type } = useAuth()
  const fields =
    profileInfo[type as 'client' | 'trainer'] || profileInfo.default
  return (
    <Styles>
      <ProfileTitle title={'User Info'} />
      <FormRow>
        {fields.map((p) =>
          editMode ? <OnboardItem {...p} /> : <ProfileField {...p} />
        )}
      </FormRow>
    </Styles>
  )
}

export default ProfileInfo
