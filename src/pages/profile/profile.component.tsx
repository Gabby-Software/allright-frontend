import { Form, Formik } from 'formik'

import MobileBack from '../../components/mobile-back/mobile-back.component'
import { Card, CardTitle } from '../../components/profile-components'
import ProfileBody from '../../components/profile-components/profile-body.component'
import ProfileBodyEdit from '../../components/profile-components/profile-body-edit.component'
// import React, { useEffect, useState } from 'react'
import brand from '../../config/branding.config'
import { Routes } from '../../enums/routes.enum'
import { onlyActive } from '../../guards/active.guard'
import { useAuth } from '../../hooks/use-auth.hook'
import { useProfile } from '../../hooks/use-profile.hook'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import logger from '../../managers/logger.manager'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import {
  // ProfileContext,
  ProfileProvider,
  useProfileContext
} from './profile.context'
import { profileSchema } from './profile.schema'
import ProfileLayout from './profile-layout.component'

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
  const _profile = useProfile()
  const {
    handleSubmit,
    tnbFile,
    setAvatarFile,
    setEditMode,
    setTnbFile,
    avatarFile,
    editMode,
    switchAccount
  } = useProfileContext()
  logger.info('AUTH', auth)
  logger.info('PROFILE', profile)

  return (
    <ProfileLayout sidebar={SideBar}>
      <MobileBack to={Routes.HOME} alias={t('home')} />
      {editMode ? (
        <Formik
          initialValues={{
            ...auth,
            ..._profile,
            password: '',
            password_confirmation: '',
            current_password: ''
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
          address={auth.addresses[0]}
          mobileTitle=""
          profile={_profile}
          user={user}
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
          <Card>
            <CardTitle>{t('profile:account-type')}</CardTitle>
            {/* COME BACK TO RESOLVE THE BELOW LATER */}
            <div className="profile__grid">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:password')}
                </p>
                <p className="profile__grid-item-value">Come back later</p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:password')}
                </p>
                <p className="profile__grid-item-value">Come back later</p>
              </div>
            </div>
          </Card>
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
