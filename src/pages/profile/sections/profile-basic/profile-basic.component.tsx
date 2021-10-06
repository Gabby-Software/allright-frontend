import React, { useEffect, useState } from 'react'

import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import OnboardItem from '../../../onboard/onboard-item.component'
import ProfileField from '../../components/profile-field/profile-field.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useProfileContext } from '../../profile.context'
import { profileBasic, profileInfo } from '../../profile.data'
import ProfileImage from '../profile-image/profile-image.component'
import Styles from './profile-basic.styles'

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
