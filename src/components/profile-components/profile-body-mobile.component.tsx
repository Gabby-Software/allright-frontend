import { PropsWithChildren } from 'react'

import { Routes } from '../../enums/routes.enum'
import useImage from '../../hooks/ui/useImage'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { date } from '../../pipes/date.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import { ProfileType } from '../../types/account.type'
import { AddressType } from '../../types/address.type'
import { isEatRight } from '../../utils/domains'
import {
  ActionButton,
  ActionContainer,
  Card,
  CardTitle,
  Preview,
  PreviewContent,
  PreviewImage,
  PreviewName
} from '.'
import Styles from './profile-body.styles'

type ProfileBodyMobileProps = {
  user: AccountObjType
  profile: ProfileType
  address: AddressType
  account: AccountType
  returnText?: string
  title: string
  actionText?: string
  paymentInfo: any
  setEdit: (p: boolean) => any
}

export default function ProfileBodyMobile({
  user,
  profile,
  address,
  account,
  actionText,
  returnText,
  title,
  children,
  paymentInfo,
  setEdit
}: PropsWithChildren<ProfileBodyMobileProps>) {
  const { src, onError } = useImage(user?.avatar?.url)
  const { t } = useTranslation()
  return (
    <Styles>
      <div className="profile__main">
        <Card
          $row
          $between
          $itemsCenter
          className="profile__header__mobile profile__card profile__card_row justify-between align-center"
        >
          <Preview className="preview__mobile">
            <PreviewImage className="previewImage__mobile">
              {src && <img src={src} alt="" onError={onError} />}
              <span>{noImage(user.first_name, user.last_name)}</span>
            </PreviewImage>
            <PreviewContent className="previewContent__mobile">
              <PreviewName className="previewName__mobile">
                {user.first_name || ''} {user.last_name || ''}
              </PreviewName>
            </PreviewContent>
          </Preview>

          {!!actionText && (
            <ActionContainer>
              <ActionButton onClick={setEdit}>{actionText}</ActionButton>
            </ActionContainer>
          )}
        </Card>

        <Card>
          <CardTitle>Basic Info</CardTitle>

          <div className="profile__grid">
            <div className="profile__grid-user-names-mobile">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">First Name</p>
                <p className="profile__grid-item-value">
                  {user.first_name || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">Last Name</p>
                <p className="profile__grid-item-value">
                  {user.last_name || '-'}
                </p>
              </div>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Email</p>
              <p className="profile__grid-item-value">{user.email || '-'}</p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Phone Number</p>
              <p className="profile__grid-item-value">
                {profile.phone_number || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Date of Birth</p>
              <p className="profile__grid-item-value">
                {date(user.birthday) || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Gender</p>
              <p className="profile__grid-item-value">
                {capitalize(user.gender) || '-'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>{t('profile:payment-info.title')}</CardTitle>

          <div className="profile__grid">
            <div className="profile__grid-user-names-mobile">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:payment-info.card-number')}
                </p>
                <p className="profile__grid-item-value">
                  {paymentInfo?.last4
                    ? `**** **** **** ${paymentInfo.last4 || ''}`
                    : ''}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:payment-info.card-expiration-date')}
                </p>
                <p className="profile__grid-item-value">
                  {paymentInfo
                    ? `${paymentInfo.exp_month?.padStart(2, '0') || ''}/${
                        paymentInfo.exp_year?.substring(2) || ''
                      }`
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Address</CardTitle>
          <div className="profile__grid">
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Country</p>
              <p className="profile__grid-item-value">
                {address.country?.name_english || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">City</p>
              <p className="profile__grid-item-value">{address.city || '-'}</p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Postal Code</p>
              <p className="profile__grid-item-value">
                {address.postal_code || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">Address</p>
              <p className="profile__grid-item-value">
                {address.address || '-'}
              </p>
            </div>
          </div>
        </Card>

        {!isEatRight() && (
          <>
            {account?.type === 'trainer' ? (
              <Card>
                <CardTitle>Other Info</CardTitle>

                <div className="profile__grid">
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">About</p>
                    <p className="profile__grid-item-value">
                      {profile?.about || '-'}
                    </p>
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">Qualifications</p>
                    <p className="profile__grid-item-value">
                      {profile?.qualifications || '-'}
                    </p>
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">Additional Info</p>
                    <p className="profile__grid-item-value">
                      {profile?.additional_info || '-'}
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <CardTitle>Other Info</CardTitle>

                <div className="profile__grid">
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      Dietary Restrictions
                    </p>
                    <p className="profile__grid-item-value">
                      {profile.dietary_restrictions || '-'}
                    </p>
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">Injuries</p>
                    <p className="profile__grid-item-value">
                      {profile.injuries || '-'}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
        {children}
      </div>
    </Styles>
  )
}
