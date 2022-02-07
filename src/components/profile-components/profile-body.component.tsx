import { PropsWithChildren } from 'react'

import useImage from '../../hooks/ui/useImage'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
// import ProfileBodyMobile from './profile-body-mobile.component'
import { ProfileDataType } from '../../modules/auth/profile-data.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { date } from '../../pipes/date.pipe'
import { noImage } from '../../pipes/no-image.pipe'
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
  PreviewName,
  PreviewSub
} from '.'
import Styles from './profile-body.styles'

type ProfileBodyProps = {
  user: AccountObjType
  profile: ProfileDataType
  addresses: AddressType[]
  account: AccountType
  actionText?: string
  mobileTitle: string
  mobileReturnText?: string
  paymentInfo: any
  setEdit: (p?: boolean) => any | void
}

export default function ProfileBody({
  user,
  profile,
  addresses,
  account,
  actionText,
  // mobileTitle,
  // mobileReturnText,
  children,
  paymentInfo,
  setEdit
}: PropsWithChildren<ProfileBodyProps>) {
  const { src, onError } = useImage(user?.avatar?.url)
  const { t } = useTranslation()
  return (
    <Styles className="profile">
      <div className="profile__main">
        <Card
          $row
          $between
          $itemsCenter
          className="profile__card profile__card_row justify-between align-center"
        >
          <Preview>
            <PreviewImage>
              {src && <img src={src} alt="" onError={onError} />}
              <span>{noImage(user.first_name, user.last_name)}</span>
            </PreviewImage>
            <PreviewContent>
              <PreviewName>
                {user.first_name || ''} {user.last_name || ''}
              </PreviewName>
              <PreviewSub>{'Me'}</PreviewSub>
            </PreviewContent>
          </Preview>

          {!!actionText && (
            <ActionContainer>
              <ActionButton className="profile__action-btn" onClick={setEdit}>
                {actionText}
              </ActionButton>
            </ActionContainer>
          )}
        </Card>

        <Card>
          <CardTitle>{t('profile:personal-info')}</CardTitle>

          <div className="profile__grid">
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">
                {t('profile:first-name')}
              </p>
              <p className="profile__grid-item-value">
                {user.first_name || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">
                {t('profile:last-name')}
              </p>
              <p className="profile__grid-item-value">
                {user.last_name || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">
                {t('profile:birth-date')}
              </p>
              <p className="profile__grid-item-value">
                {date(user.birthday) || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">{t('profile:email')}</p>
              <p className="profile__grid-item-value">{user.email || '-'}</p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">{t('profile:phone')}</p>
              <p className="profile__grid-item-value">
                {profile.phone_number || '-'}
              </p>
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">{t('profile:gender')}</p>
              <p className="profile__grid-item-value">
                {capitalize(user.gender) || '-'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>{t('profile:payment-info.title')}</CardTitle>

          <div className="profile__grid">
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
            {/* <div className="profile__grid-item">
              <p className="profile__grid-item-name">
                {t('profile:payment-info.card-cvc')}
              </p>
              <p className="profile__grid-item-value">{213}</p>
            </div> */}
          </div>
        </Card>

        <Card>
          <CardTitle>{t('profile:address')}</CardTitle>

          {addresses.map((address, i) => (
            <div
              key={address.address + i}
              className="profile__grid"
              style={{ marginBottom: '1.25rem' }}
            >
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:address')}
                </p>
                <p className="profile__grid-item-value">
                  {address.address || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:postal-code')}
                </p>
                <p className="profile__grid-item-value">
                  {address.postal_code || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">{t('profile:city')}</p>
                <p className="profile__grid-item-value">
                  {address.city || '-'}
                </p>
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:country')}
                </p>
                <p className="profile__grid-item-value">
                  {address.country?.name_english || '-'}
                </p>
              </div>
            </div>
          ))}
        </Card>

        {!isEatRight() && (
          <>
            {account?.type === 'trainer' ? (
              <Card>
                <CardTitle>{t('profile:other-info')}</CardTitle>

                <div className="profile__grid">
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:personal-information')}
                    </p>
                    <p className="profile__grid-item-value">
                      {profile?.about || '-'}
                    </p>
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:qualifications')}
                    </p>
                    <p className="profile__grid-item-value">
                      {profile?.qualifications || '-'}
                    </p>
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:additional-information')}
                    </p>
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
                      {t('profile:dietary-restrictions')}
                    </p>
                    <p className="profile__grid-item-value">
                      {profile.dietary_restrictions || '-'}
                    </p>
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:injuries')}
                    </p>
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
