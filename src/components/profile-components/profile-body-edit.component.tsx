import { useFormikContext } from 'formik'

import {
  HidePSIcon,
  PlusIcon,
  ThrashIcon_2,
  ViewPSIcon
} from '../../assets/media/icons'
import { ReactComponent as CalendarIcon } from '../../assets/media/icons/calendar.svg'
import genderTypes from '../../enums/gender-types'
import { Routes } from '../../enums/routes.enum'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import useImage from '../../hooks/ui/useImage'
import { useAuth } from '../../hooks/use-auth.hook'
import { useProfile } from '../../hooks/use-profile.hook'
import { AccountObjType, AccountType } from '../../modules/auth/account.type'
import { ProfileDataType } from '../../modules/auth/profile-data.type'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { useProfileContext } from '../../pages/profile/profile.context'
import { capitalize } from '../../pipes/capitalize.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import { getColorCarry } from '../../pipes/theme-color.pipe'
import { OptionType } from '../../types/option.type'
import Input from '../form/input/input.component'
import Button from '../forms/form-button/form-button.component'
import FormCountrySelect from '../forms/form-country-select/form-country-select.component'
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
import AddressRadio from './address-radio'
import Styles from './profile-body.styles'
import userTypes from '../../enums/user-types.enum'

type ProfileBodyEditProps = {
  user: AccountObjType
  actionText: string
  setEdit: (p?: boolean) => any | void
}

type EditProfileValuesProps = {
  password: string
  password_confirmation: string
  current_password: string
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
  const { setFieldValue, values, submitForm } =
    useFormikContext<EditProfileValuesProps>()

  const { setTnbFile, setAvatarFile } = useProfileContext()
  const { terms_and_conditions: tnb } = useProfile()
  // const { switchAccount } = useProfileContext()
  const { accounts } = useAuth()

  const accountOptions: OptionType[] = accounts.map(({ type }) => ({
    label: capitalize(type),
    value: type
  }))

  const uuid: string = accounts.find(({ is_current }) => !is_current)
    ?.uuid as string
  const currentType: string = accounts.find(({ is_current }) => is_current)
    ?.type as string

  const { t } = useTranslation()
  const genderOptions: OptionType[] = [
    { label: 'Male', value: genderTypes.MALE },
    { label: 'Female', value: genderTypes.FEMALE },
    { label: 'Other', value: genderTypes.OTHER }
  ]
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
                placeholder="john@doe.com"
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
        <Card>
          <CardTitle>{t('profile:addresses')}</CardTitle>
          {values.addresses?.map((address, index) => {
            return (
              <>
                <div style={{ marginBottom: '22px' }}>
                  <AddressRadio
                    id={`checkbox__${index}`}
                    className="add-radio"
                    label={t('profile:default-address')}
                    name="addresses"
                    checked={address?.is_default}
                    value={index}
                    onChange={() => {
                      const newAddresses = values.addresses.map(
                        (address, i) => ({
                          ...address,
                          is_default: i === index
                        })
                      )
                      console.log({
                        newAddresses,
                        oldAddresses: values.addresses
                      })
                      setFieldValue('addresses', newAddresses)
                    }}
                  />
                </div>
                <div key={address.id} className="profile__grid address__grid">
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:address-line-1')}
                    </p>
                    <Input
                      id={`input_${index}`}
                      name="address"
                      onChange={(e) => {
                        setFieldValue(
                          `addresses[${index}].address`,
                          e.target.value
                        )
                      }}
                      value={address.address}
                    />
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:address-line-2')}
                    </p>
                    <Input
                      id={`input_${index}`}
                      onChange={(e) => {
                        setFieldValue(
                          `addresses[${index}].address_2`,
                          e.target.value
                        )
                      }}
                      // value={address.address} what value should I use here?
                    />
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:postal-code')}
                    </p>
                    <Input
                      id={`postal_code${index}`}
                      name="postal_code"
                      onChange={(e) => {
                        setFieldValue(
                          `addresses[${index}].postal_code`,
                          e.target.value
                        )
                      }}
                      value={address.postal_code}
                    />
                  </div>
                  <div className="profile__grid-item">
                    <p className="profile__grid-item-name">
                      {t('profile:city')}
                    </p>
                    <Input
                      id="city"
                      name="city"
                      onChange={(e) => {
                        setFieldValue(
                          `addresses[${index}].city`,
                          e.target.value
                        )
                      }}
                      value={address.city as string}
                      placeholder="john@doe.com"
                    />
                  </div>
                  <div className="profile__grid-item">
                    <FormCountrySelect
                      onUpdate={(v) =>
                        setFieldValue(`addresses[${index}].country`, v)
                      }
                      label={t('profile:country')}
                      name={`addresses[${index}].country.code`}
                    />
                  </div>
                </div>
              </>
            )
          })}

          <div className="add-address-btn__wrapper">
            <Button
              className="add-address-btn"
              type="text"
              onClick={() => {
                const newAddresses = [
                  ...values.addresses,
                  {
                    address: '',
                    city: '',
                    country: {
                      id:
                        values.addresses[0].country.id +
                        values.addresses.length,
                      code: '',
                      is_active: false,
                      name_english: '',
                      name_local: ''
                    },
                    postal_code: '',
                    is_default: false,
                    region: ''
                  }
                ]
                setFieldValue('addresses', newAddresses)
              }}
            >
              {t('profile:add-address')} <PlusIcon />
            </Button>
          </div>
        </Card>
        {currentType === userTypes.TRAINER ? (
          <Card>
            <CardTitle>{t('profile:personal-information')}</CardTitle>
            <div className="profile__grid address__grid">
              <div className="profile__grid-item">
                <div className="other-info__input">
                  <FormTextArea
                    label={t('profile:dietary-restrictions')}
                    onUpdate={setFieldValue}
                    name="personal_information"
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
                    name="additional_information"
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
        <Card>
          <CardTitle>{t('profile:security')}</CardTitle>
          <div className="profile__grid">
            <div className="profile__grid-item">
              <FormPassword
                name="password"
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
                name="password"
                onUpdate={setFieldValue}
                label={t('profile:confirm-password')}
                MaskIcon={HidePSIcon}
                UnmaskIcon={ViewPSIcon}
              />
            </div>
          </div>
        </Card>
        {values.type === 'trainer' && (
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
