import React, { useState, useEffect } from 'react'
import Styles, {
  PTitle,
  PSubtitle,
  PSpace,
  PExtLink,
  PHr
} from './profile-sidebar.styles'
import { Logo, MobileStickyBottom } from '../../../styles'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { mainHost } from '../../../../pipes/main-host'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import { ReactComponent as BackIcon } from '../../../../assets/media/icons/back-arrow.svg'
import { useProfileContext } from '../../profile.context'
import ButtonSubmit from '../../../../components/forms/button-submit/button-submit.component'

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
