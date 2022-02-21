import { Radio } from 'antd'
import { useFormikContext } from 'formik'
import moment, { Moment } from 'moment'

import {
  HidePSIcon,
  PlusIcon,
  ThrashIcon_2,
  ViewPSIcon
} from '../../assets/media/icons'
import { ReactComponent as CalendarIcon } from '../../assets/media/icons/calendar.svg'
import genderTypes from '../../enums/gender-types'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import useImage from '../../hooks/ui/useImage'
import { useAuth } from '../../hooks/use-auth.hook'
import { useProfile } from '../../hooks/use-profile.hook'
import formatter from '../../managers/formatter.manager'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { ProfileDataType } from '../../modules/auth/profile-data.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { useProfileContext } from '../../pages/profile/profile.context'
import ProfileAddresses from '../../pages/profile/sections/profile-addresses/profile-addresses.component'
import { capitalize } from '../../pipes/capitalize.pipe'
import {
  formatCardNumber,
  formatExpiryDate
} from '../../pipes/card-format.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import { getColorCarry } from '../../pipes/theme-color.pipe'
import { OptionType } from '../../types/option.type'
import { isEatRight } from '../../utils/domains'
import Input from '../form/input/input.component'
import FormDatePicker from '../forms/form-datepicker/form-datepicker.component'
import FormFileUpload from '../forms/form-file-upload/form-file-upload.component'
import FormImageUpload from '../forms/form-image-upload/form-image-upload.component'
import FormPassword from '../forms/form-password/form-password.component'
import FormPhone from '../forms/form-phone/form-phone.component'
import FormRadio from '../forms/form-radio-button/form-radio-button.component'
import FormSelect from '../forms/form-select/form-select.component'
import FormTextArea from '../forms/form-textarea/form-textarea.component'
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
import AddressRadio, { Radio_2 } from './address-radio'
import Styles from './profile-body.styles'

const errorStyle: React.CSSProperties = {
  border: '1px solid red',
  boxShadow: 'none'
}

type ProfileBodyEditProps = {
  user: AccountObjType
  actionText: string
  setEdit: (p?: boolean) => any | void
}

type EditProfileValuesProps = {
  password: string
  password_confirmation: string
  current_password: string
  card_number: string
  card_expiry: string
  card_cvc: string
} & AccountObjType &
  ProfileDataType &
  AccountType

export default function ProfileBodyEdit({
  user,
  actionText,
  setEdit
}: ProfileBodyEditProps) {
  const { src, onError } = useImage(user?.avatar?.url)
  const isMobile = useIsMobile()
  const { setFieldValue, values, submitForm, errors } =
    useFormikContext<EditProfileValuesProps>()

  const { setTnbFile, setAvatarFile } = useProfileContext()
  const { terms_and_conditions: tnb } = useProfile()
  // const { switchAccount } = useProfileContext()
  const { accounts } = useAuth()

  const accountOptions: OptionType[] = accounts.map(({ type }) => ({
    label: capitalize(type),
    value: type
  }))

  // const uuid: string = accounts.find(({ is_current }) => !is_current)
  //   ?.uuid as string
  const currentType: string = accounts.find(({ is_current }) => is_current)
    ?.type as string

  const { t } = useTranslation()
  const genderOptions: OptionType[] = [
    { label: 'Male', value: genderTypes.MALE },
    { label: 'Female', value: genderTypes.FEMALE },
    { label: 'Other', value: genderTypes.OTHER }
  ]

  console.log({ values, errors })
  return (
    <Styles edit={true} className="profile">
      <div className="profile__main">
        <Card
          $row
          $between
          $itemsCenter
          className="profile__card profile__card_row justify-between align-center"
        >
          <Preview center={isMobile}>
            <PreviewImage noRadius noOverflow noWidth={isMobile}>
              <div className="profile__edit-image">
                <FormImageUpload
                  name={'avatar.url'}
                  label={'Change Profile Photo'}
                  aspectRatio={1}
                  onUpdate={({ file }) => setAvatarFile(file)}
                >
                  {({ url }) => {
                    return (
                      <>
                        {url ? (
                          <img
                            className="profile__image"
                            src={url}
                            alt=""
                            onError={onError}
                          />
                        ) : (
                          <span className="profile__image-placeholder">
                            {noImage(user.first_name, user.last_name)}
                          </span>
                        )}
                      </>
                    )
                  }}
                </FormImageUpload>
              </div>
            </PreviewImage>
            {!isMobile && (
              <PreviewContent>
                <PreviewName>
                  {user.first_name || ''} {user.last_name || ''}
                </PreviewName>
                <PreviewSub>{'Me'}</PreviewSub>
              </PreviewContent>
            )}
          </Preview>

          {!!actionText && !isMobile ? (
            <ActionContainer>
              <ActionButton
                className="profile__action-btn"
                onClick={() => submitForm()}
              >
                {actionText}
              </ActionButton>
            </ActionContainer>
          ) : null}
        </Card>
        <Card>
          <CardTitle>{t('profile:personal-info')}</CardTitle>
          <div className="profile__grid">
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">{t('first-name')}</p>
              <Input
                id="first_name"
                name="first_name"
                onChange={(e) => setFieldValue('first_name', e.target.value)}
                value={values.first_name}
                placeholder="John"
              />
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">{t('last-name')}</p>
              <Input
                id="last_name"
                name="last_name"
                onChange={(e) => {
                  console.log({ values, last_name: values.last_name })
                  setFieldValue('last_name', e.target.value)
                }}
                value={values.last_name}
                placeholder="Doe"
              />
            </div>
            <div className="profile__grid-item">
              <p className="profile__grid-item-name">{t('email')}</p>
              <Input
                id="email"
                name="email"
                onChange={(e) => {
                  setFieldValue('email', e.target.value)
                }}
                value={values.email}
              />
            </div>
            <div className="profile__grid-item">
              <FormPhone
                label={t('phone-number')}
                name="phone_number"
                onUpdate={setFieldValue}
              />
            </div>
            <div className="profile__grid-item">
              <FormDatePicker
                onUpdate={setFieldValue}
                name="birthday"
                label={t('dob')}
                clearIcon={false}
                suffixIcon={
                  <CalendarIcon color={getColorCarry('neutral_70')} />
                }
                className="profile__date-input"
                disabledDate={(d: Moment) =>
                  d.isAfter(moment().add(-16, 'years')) ||
                  d.isBefore(moment().add(-120, 'years'))
                }
              />
            </div>
            <div className="profile__grid-item">
              {isMobile ? (
                <div className="form-radio__wrapper">
                  <FormRadio
                    options={genderOptions}
                    name={'gender'}
                    label={t('profile:gender')}
                    brandColors={true}
                  />
                </div>
              ) : (
                <FormSelect
                  onUpdate={(value) => setFieldValue('birthday', value)}
                  name="gender"
                  label={t('profile:gender')}
                  options={genderOptions}
                />
              )}
            </div>
          </div>
        </Card>
        {isEatRight() && (
          <Card>
            <CardTitle>{t('profile:payment-info.title')}</CardTitle>
            <div className="profile__grid">
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:payment-info.card-number')}
                </p>
                <Input
                  id="credit-card-number"
                  name="credit-card-number"
                  onChange={(e) => {
                    setFieldValue(
                      'card_number',
                      formatCardNumber(e.target.value)
                    )
                  }}
                  value={values.card_number}
                  placeholder="1234 1234 1234 1234"
                  style={errors.card_number ? errorStyle : undefined}
                  format={formatter().number().max(9999999999999999)}
                  max={19}
                />
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:payment-info.card-expiration-date')}
                </p>
                <Input
                  id="card-expiry"
                  name="card-expiry"
                  onChange={(e) => {
                    console.log({ values, last_name: values.last_name })
                    setFieldValue(
                      'card_expiry',
                      formatExpiryDate(e.target.value)
                    )
                  }}
                  value={values.card_expiry}
                  placeholder="MM / YY"
                  style={errors.card_expiry ? errorStyle : undefined}
                  max={5}
                />
              </div>
              <div className="profile__grid-item">
                <p className="profile__grid-item-name">
                  {t('profile:payment-info.card-cvc')}
                </p>
                <Input
                  id="card_cvc"
                  name="card_cvc"
                  onChange={(e) => {
                    setFieldValue('card_cvc', e.target.value)
                  }}
                  value={values.card_cvc}
                  style={errors.card_cvc ? errorStyle : undefined}
                  max={4}
                />
              </div>
            </div>
          </Card>
        )}
        <Card>
          <CardTitle>{t('profile:addresses')}</CardTitle>
          <ProfileAddresses />
        </Card>
        {!isEatRight() && (
          <>
            {currentType === userTypes.TRAINER ? (
              <Card>
                <CardTitle>{t('profile:other-info')}</CardTitle>
                <div className="profile__grid address__grid">
                  <div className="profile__grid-item">
                    <div className="other-info__input">
                      <FormTextArea
                        label={t('profile:personal-information')}
                        onUpdate={setFieldValue}
                        name="about"
                      />
                    </div>
                  </div>
                  <div className="profile__grid-item">
                    <div className="other-info__input">
                      <FormTextArea
                        label={t('profile:qualifications')}
                        onUpdate={setFieldValue}
                        name="qualifications"
                      />
                    </div>
                  </div>
                  <div className="profile__grid-item">
                    <div className="other-info__input">
                      <FormTextArea
                        label={t('profile:additional-information')}
                        onUpdate={setFieldValue}
                        name="additional_info"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <CardTitle>{t('profile:other-info')}</CardTitle>
                <div className="profile__grid address__grid">
                  <div className="profile__grid-item">
                    <div className="other-info__input">
                      <FormTextArea
                        label={t('profile:dietary-restrictions')}
                        onUpdate={setFieldValue}
                        name="dietary_restrictions"
                      />
                    </div>
                  </div>
                  <div className="profile__grid-item">
                    <div className="other-info__input">
                      <FormTextArea
                        label={t('profile:injuries')}
                        onUpdate={setFieldValue}
                        name="injuries"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
        <Card>
          <CardTitle>{t('profile:security')}</CardTitle>
          <div className="profile__grid">
            <div className="profile__grid-item">
              <FormPassword
                name="current_password"
                onUpdate={setFieldValue}
                label={t('profile:current-password')}
                MaskIcon={HidePSIcon}
                UnmaskIcon={ViewPSIcon}
              />
            </div>
            <div className="profile__grid-item">
              <FormPassword
                name="password"
                onUpdate={setFieldValue}
                label={t('profile:new-password')}
                MaskIcon={HidePSIcon}
                UnmaskIcon={ViewPSIcon}
              />
            </div>
            <div className="profile__grid-item">
              <FormPassword
                name="password_confirmation"
                onUpdate={setFieldValue}
                label={t('profile:confirm-password')}
                MaskIcon={HidePSIcon}
                UnmaskIcon={ViewPSIcon}
              />
            </div>
          </div>
        </Card>
        {values.type === userTypes.TRAINER && (
          <Card className="file_input__card">
            <CardTitle>{t('profile:tnb')}</CardTitle>
            <FormFileUpload
              name="terms_and_conditions"
              initialFilename={tnb?.file_name}
              onUpdate={setTnbFile}
              innerLabel={isMobile}
              deleteIcon={<ThrashIcon_2 />}
            />
          </Card>
        )}
        {!isEatRight() && (
          <Card className="profile__account-type-card">
            <CardTitle>{t('profile:account-type')}</CardTitle>
            <div className="account-type__wrapper">
              <FormRadio
                label=""
                options={accountOptions}
                name="type"
                brandColors={true}
                disabled={true}
                defaultValue={currentType}
              />
            </div>
          </Card>
        )}
        {isMobile ? (
          <div className="profile__edit-button-wrapper">
            <ActionButton
              className="profile__action-btn"
              onClick={() => submitForm()}
            >
              {actionText}
            </ActionButton>
          </div>
        ) : null}
      </div>
    </Styles>
  )
}
