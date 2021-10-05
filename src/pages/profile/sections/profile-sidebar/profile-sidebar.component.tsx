import React, { useEffect, useState } from 'react'

import { ReactComponent as BackIcon } from '../../../../assets/media/icons/back-arrow.svg'
import ButtonSubmit from '../../../../components/forms/button-submit/button-submit.component'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { mainHost } from '../../../../pipes/main-host'
import { Logo, MobileStickyBottom } from '../../../styles'
import { useProfileContext } from '../../profile.context'
import Styles, {
  PExtLink,
  PHr,
  PSpace,
  PSubtitle,
  PTitle
} from './profile-sidebar.styles'

const ProfileSidebar = () => {
  const { t } = useTranslation()
  const { editMode, setEditMode } = useProfileContext()
  return (
    <Styles>
      <PExtLink href={mainHost()}>
        <BackIcon />
        <span>Back to dashboard</span>
      </PExtLink>
      <PSpace />
      <Logo className={'sidebar__logo'} />
      <div className={'sidebar__body'}>
        <PTitle>My Profile</PTitle>
        <PSpace />
        <PSubtitle>
          Please review your information. if you'd like you can change it
          anytime
        </PSubtitle>
        <PHr />
        <MobileStickyBottom>
          {editMode ? (
            <ButtonSubmit>Save Changes</ButtonSubmit>
          ) : (
            <FormButton type={'primary'} onClick={() => setEditMode(!editMode)}>
              Edit Profile
            </FormButton>
          )}
        </MobileStickyBottom>
      </div>
    </Styles>
  )
}

export default ProfileSidebar
