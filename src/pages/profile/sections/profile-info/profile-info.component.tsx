import React, { useEffect, useState } from 'react'

import FormRow from '../../../../components/forms/form-row/form-row.component'
import { useAuth } from '../../../../hooks/use-auth.hook'
import OnboardItem from '../../../onboard/onboard-item.component'
import ProfileField from '../../components/profile-field/profile-field.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useProfileContext } from '../../profile.context'
import { profileInfo } from '../../profile.data'
import Styles from './profile-info.styles'

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
