import React, { useEffect, useState } from 'react'

import { ReactComponent as DownloadIcon } from '../../../../assets/media/icons/download.svg'
import FormFileUpload from '../../../../components/forms/form-file-upload/form-file-upload.component'
import { useProfile } from '../../../../hooks/use-profile.hook'
import fileManager from '../../../../managers/file.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { excerpt } from '../../../../pipes/excerpt.pipe'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useProfileContext } from '../../profile.context'
import Styles from './profile-tnb.styles'

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
