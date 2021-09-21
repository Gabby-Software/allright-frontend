import React, { useState, useEffect } from 'react'
import Styles from './profile.styles'
import ProfileSidebar from './sections/profile-sidebar/profile-sidebar.component'
import ProfileInfo from './sections/profile-info/profile-info.component'
import ProfileBasic from './sections/profile-basic/profile-basic.component'
import ProfilePassword from './sections/profile-password/profile-password.component'
import ProfileAccounts from './sections/profile-accounts/profile-accounts.component'
import {
  ProfileContext,
  ProfileProvider,
  useProfileContext
} from './profile.context'
import { useAuth } from '../../hooks/use-auth.hook'
import { useProfile } from '../../hooks/use-profile.hook'
import { Form, Formik } from 'formik'
import ProfileImage from './sections/profile-image/profile-image.component'
import ProfileTnb from './sections/profile-tnb/profile-tnb.component'
import { profileSchema } from './profile.schema'
import brand from '../../config/branding.config'
import { onlyActive } from '../../guards/active.guard'
import ProfileAdresses from './sections/profile-adresses/profile-adresses.component'
import ProfileAddresses from './sections/profile-addresses/profile-addresses.component'
import logger from '../../managers/logger.manager'

const ProfileContent = () => {
  const auth = useAuth()
  const profile = useProfile()
  const { handleSubmit } = useProfileContext()
  logger.info('AUTH', auth)
  logger.info('PROFILE', profile)
  return (
    <Formik
      initialValues={{
        ...auth,
        ...profile,
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
        <Styles className={'profile'}>
          <ProfileSidebar />
          <main className={'profile__main'}>
            <ProfileImage />
            <ProfileBasic />
            <ProfileAddresses />
            <ProfileInfo />
            {auth?.type === 'trainer' ? <ProfileTnb /> : null}
            <ProfilePassword />
            {brand.multiple_accounts ? <ProfileAccounts /> : null}
          </main>
        </Styles>
      </Form>
    </Formik>
  )
}
const Profile = () => (
  <ProfileProvider>
    <ProfileContent />
  </ProfileProvider>
)
export default onlyActive(Profile)
