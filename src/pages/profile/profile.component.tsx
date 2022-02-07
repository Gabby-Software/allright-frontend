import { Form, Formik } from 'formik'

import Button from '../../components/buttons/button/button.component'
import FormRadio from '../../components/forms/form-radio-button/form-radio-button.component'
import MobileBack from '../../components/mobile-back/mobile-back.component'
import { Card, CardTitle } from '../../components/profile-components'
import ProfileBody from '../../components/profile-components/profile-body.component'
import ProfileBodyEdit from '../../components/profile-components/profile-body-edit.component'
import ProfileTnC from '../../components/profile-components/profile-tnc.component'
import brand from '../../config/branding.config'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { onlyActive } from '../../guards/active.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useAuth } from '../../hooks/use-auth.hook'
import { useProfile } from '../../hooks/use-profile.hook'
import { isEatRight } from '../../utils/domains'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentityMobileLayout from '../../layouts/identity-mobile-layout-2/identity-mobile-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import logger from '../../managers/logger.manager'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { OptionType } from '../../types/option.type'
import {
  // ProfileContext,
  ProfileProvider,
  useProfileContext
} from './profile.context'
import { profileSchema } from './profile.schema'
import ProfileLayout from './profile-layout.component'
import ProfileMobile from './profile-mobile.component'

const SideBar = () => {
  const { t } = useTranslation()
  return (
    <>
      <IdentitySidebar.Title>
        {t('profile:sidebar-title')}
      </IdentitySidebar.Title>
      <IdentitySidebar.Subtitle>
        {t('profile:sidebar-subtitle')}
      </IdentitySidebar.Subtitle>
    </>
  )
}

const ProfileContent = () => {
  const auth = useAuth()
  const { t } = useTranslation()
  const {
    account_level,
    is_active,
    is_current,
    last_used_at,
    type,
    uuid,
    profile,
    addresses
  } = auth
  const account: AccountType = {
    account_level,
    is_active,
    is_current,
    last_used_at,
    type,
    uuid,
    profile,
    addresses
  }

  const {
    accounts,
    avatar,
    birthday,
    created_at,
    email,
    email_verified_at,
    first_name,
    gender,
    last_name,
    city,
    country,
    region_name,
    postal_code
  } = auth

  const user: AccountObjType = {
    accounts,
    avatar,
    birthday,
    created_at,
    email,
    email_verified_at,
    first_name,
    gender,
    is_active,
    last_name,
    uuid,
    city,
    country,
    region_name,
    postal_code
  }
  const _uuids = accounts.map(({ type, uuid }) => [type, uuid])
  const uuids = Object.fromEntries(_uuids)

  console.log({ uuids, type })
  const {
    handleSubmit,
    tnbFile,
    setAvatarFile,
    setEditMode,
    setTnbFile,
    avatarFile,
    editMode,
    switchAccount,
    paymentInfo
  } = useProfileContext()
  logger.info('AUTH', auth)
  logger.info('PROFILE', profile)

  const _profile = useProfile()

  const isMobile = useIsMobile()
  const accountOptions: OptionType[] = accounts.map(({ type }) => ({
    label: capitalize(type),
    value: type
  }))

  return isMobile ? (
    <ProfileMobile />
  ) : (
    <ProfileLayout sidebar={SideBar}>
      <MobileBack to={Routes.HOME} alias={t('home')} />
      {editMode ? (
        <Formik
          initialValues={{
            ...auth,
            ..._profile,
            password: '',
            password_confirmation: '',
            current_password: '',
            card_number: '',
            card_expiry: '',
            card_cvc: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={profileSchema}
          enableReinitialize
          isInitialValid={false}
        >
          <Form>
            <ProfileBodyEdit
              user={user}
              actionText={t('profile:save-changes')}
              setEdit={() => {
                setEditMode(!editMode)
              }}
            />
          </Form>
        </Formik>
      ) : (
        <ProfileBody
          account={account}
          addresses={auth.addresses}
          mobileTitle=""
          profile={_profile}
          user={user}
          paymentInfo={paymentInfo}
          actionText={t('profile:edit-profile')}
          setEdit={() => {
            setEditMode(!editMode)
          }}
        >
          <Card>
            <CardTitle>{t('profile:security')}</CardTitle>
            <div className="profile__grid">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:password')}
                </p>
                <p className="profile__grid-item-value">****************</p>
              </div>
            </div>
          </Card>
          {account.type === userTypes.TRAINER && (
            <ProfileTnC profile={_profile} />
          )}
          {!isEatRight() && (
            <Card>
              <CardTitle>{t('profile:account-type')}</CardTitle>
              <div className="profile__account-type-content-wrapper">
                <FormRadio
                  label=""
                  options={accountOptions}
                  name=""
                  brandColors={true}
                  onChange={(value) => switchAccount(uuids[value])}
                  noForm={true}
                  defaultValue={type}
                />
                <Button variant="secondary" to={Routes.ADD_ACCOUNT}>
                  {t('profile:add-account')}
                </Button>
              </div>
            </Card>
          )}
        </ProfileBody>
      )}
    </ProfileLayout>
  )
}
const Profile = () => (
  <ProfileProvider>
    <ProfileContent />
  </ProfileProvider>
)
export default onlyActive(Profile)
