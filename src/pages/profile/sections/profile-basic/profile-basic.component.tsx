import React, { useState, useEffect } from 'react'
import Styles from './profile-basic.styles'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ProfileImage from '../profile-image/profile-image.component'
import { useProfileContext } from '../../profile.context'
import { profileBasic, profileInfo } from '../../profile.data'
import ProfileField from '../../components/profile-field/profile-field.component'
import OnboardItem from '../../../onboard/onboard-item.component'

const ProfileBasic = () => {
  const { t } = useTranslation()
  const { editMode } = useProfileContext()
  return (
    <Styles>
      <ProfileTitle title={'Basic Personal Profile'} />
      {profileBasic.map((p) =>
        editMode ? <OnboardItem {...p} /> : <ProfileField {...p} />
      )}
    </Styles>
  )
}

export default ProfileBasic
