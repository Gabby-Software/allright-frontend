import React, { useState, useEffect } from 'react'
import Styles from './profile-tnb.styles'
import { useProfileContext } from '../../profile.context'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { ReactComponent as DownloadIcon } from '../../../../assets/media/icons/download.svg'
import { useProfile } from '../../../../hooks/use-profile.hook'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import FormFileUpload from '../../../../components/forms/form-file-upload/form-file-upload.component'
import fileManager from '../../../../managers/file.manager'
import { excerpt } from '../../../../pipes/excerpt.pipe'

const ProfileTnb = () => {
  const { editMode, setTnbFile } = useProfileContext()
  const { t } = useTranslation()
  const { terms_and_conditions: tnb } = useProfile()
  return (
    <Styles>
      <ProfileTitle title={t('profile:tnb')} />
      {editMode ? (
        <FormFileUpload
          name={'terms_and_conditions.url'}
          onUpdate={setTnbFile}
          initialFilename={tnb?.file_name || undefined}
        />
      ) : (
        <div className={'profile-tnb__view'}>
          {tnb?.url ? (
            <>
              <span>{excerpt(tnb.file_name, 32)}</span>
              <DownloadIcon
                onClick={() => fileManager.downloadUrl(tnb.url, tnb.file_name)}
              />
            </>
          ) : (
            <span>{t('no-data')}</span>
          )}
        </div>
      )}
    </Styles>
  )
}

export default ProfileTnb
