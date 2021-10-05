import FormImageUpload from '../../../../components/forms/form-image-upload/form-image-upload.component'
import ProfileImage from '../../../../components/profile-image/profile-image.component'
import { useAuth } from '../../../../hooks/use-auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../pipes/classes.pipe'
import { noImage } from '../../../../pipes/no-image.pipe'
import { useProfileContext } from '../../profile.context'
import Styles from './profile-image.styles'

const ProfileImageSection = () => {
  const { editMode, setAvatarFile } = useProfileContext()
  const { first_name, last_name, avatar } = useAuth()
  const { t } = useTranslation()
  return (
    <Styles>
      {editMode ? (
        <FormImageUpload
          name={'avatar.url'}
          label={'Change Profile Photo'}
          aspectRatio={1}
          onUpdate={({ file }) => setAvatarFile(file)}
        >
          {({ url }) => (
            <ProfileImage
              url={url}
              placeholder={noImage(first_name, last_name)}
            />
          )}
        </FormImageUpload>
      ) : (
        <ProfileImage
          url={avatar?.url || ''}
          placeholder={noImage(first_name, last_name)}
        />
      )}
    </Styles>
  )
}

export default ProfileImageSection
