import {
  ArrayHelpers,
  Field,
  FieldArray,
  FieldProps,
  FormikProps,
  useFormikContext
} from 'formik'
import React, { useEffect, useState } from 'react'

import {
  PlusIcon,
  ThrashIcon_2,
  TrashIcon
} from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import Button from '../../../../components/forms/form-button/form-button.component'
import FormCountrySelect from '../../../../components/forms/form-country-select/form-country-select.component'
import FormInputLabeled from '../../../../components/forms/form-input-labeled/form-input-labeled.component'
import FormRow from '../../../../components/forms/form-row/form-row.component'
import AddressRadio, {
  Radio_2
} from '../../../../components/profile-components/address-radio'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../pipes/classes.pipe'
import { AddressType } from '../../../../types/address.type'
import ProfileField from '../../components/profile-field/profile-field.component'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import { useProfileContext } from '../../profile.context'
import Styles from './profile-addresses.styles'

type Props = {}
const ProfileAddresses = ({}: Props) => {
  const { t } = useTranslation()
  const { editMode } = useProfileContext()
  const addAddr = (helpers: ArrayHelpers, i: number) => {
    const empty_addr: AddressType = {
      country: {
        code: '',
        id: 0,
        name_english: '',
        name_local: '',
        is_active: true
      },
      city: '',
      address: '',
      postal_code: '',
      region: '',
      is_default: false,
      id: -Math.random()
    }
    helpers.insert(i, empty_addr)
  }
  const removeAddr = (
    helpers: ArrayHelpers,
    form: FormikProps<any>,
    i: number
  ) => {
    const isDefault = form.values.addresses[i].is_default
    if (form.values.addresses[i].id) {
      form.setFieldValue(`addresses.${i}._delete`, true)
    } else {
      helpers.remove(i)
    }
    if (isDefault) {
      form.values.addresses[i]._delete = true
      const idx = form.values.addresses.findIndex(
        (addr: AddressType) => !addr._delete
      )
      logger.info('ADDR', idx, form.values.addresses)
      form.setFieldValue(`addresses.${idx}.is_default`, true)
    }
  }
  const markAsDefault = (
    idx: number,
    total: number,
    form: FormikProps<any>
  ) => {
    for (let i = 0; i < total; i++) {
      form.setFieldValue(`addresses.${i}.is_default`, i === idx)
    }
  }
  const emptyAddress = (addresses: AddressType[]) => {
    const addr = addresses.filter((d) => !d._delete)[0]
    return (
      !addr.country?.code && !addr.city && !addr.address && !addr.postal_code
    )
  }

  const { setFieldValue } = useFormikContext()

  return (
    <Styles>
      <Field name={'addresses'}>
        {({ field, form }: FieldProps) => (
          <FieldArray name={'addresses'}>
            {(helpers: ArrayHelpers) => {
              return (
                <>
                  {field?.value?.map((_: any, i: number) => {
                    return editMode ? (
                      _._delete ? null : (
                        <React.Fragment key={_.id}>
                          <>
                            <div className="profile__address-controls">
                              <AddressRadio
                                onChange={() =>
                                  markAsDefault(i, field.value.length, form)
                                }
                                name={'isDefault'}
                                id={i.toString()}
                                label="My default address"
                                checked={_.is_default}
                              />
                              {field.value.filter(
                                (d: AddressType) => !d._delete
                              ).length < 2 ? null : (
                                <div
                                  className={'profile-addr__remove'}
                                  onClick={() => removeAddr(helpers, form, i)}
                                >
                                  <TrashIcon />
                                </div>
                              )}
                            </div>
                            <div className="profile__grid address__grid">
                              <div className="profile__grid-item">
                                <p className="profile__grid-item-name">
                                  {t('profile:address')}
                                </p>
                                <Input
                                  id={`input_${i}`}
                                  name={`addresses.${i}.address`}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `addresses[${i}].address`,
                                      e.target.value
                                    )
                                  }}
                                  value={_.address}
                                />
                              </div>
                              <div className="profile__grid-item">
                                <p className="profile__grid-item-name">
                                  {t('profile:postal-code')}
                                </p>
                                <Input
                                  id={`postal_code${i}`}
                                  name={`addresses.${i}.postal_code`}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `addresses[${i}].postal_code`,
                                      e.target.value
                                    )
                                  }}
                                  value={_.postal_code}
                                />
                              </div>
                              <div className="profile__grid-item">
                                <p className="profile__grid-item-name">
                                  {t('profile:city')}
                                </p>
                                <Input
                                  id={'city' + i}
                                  name={`addresses.${i}.city`}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `addresses[${i}].city`,
                                      e.target.value
                                    )
                                  }}
                                  value={_.city as string}
                                />
                              </div>
                              <div className="profile__grid-item">
                                <FormCountrySelect
                                  onUpdate={(v) =>
                                    setFieldValue(
                                      `addresses[${i}].country.code`,
                                      v
                                    )
                                  }
                                  label={t('profile:country')}
                                  name={`addresses[${i}].country.code`}
                                />
                              </div>
                            </div>
                          </>
                        </React.Fragment>
                      )
                    ) : _._delete ? null : (
                      <FormRow key={i}>
                        <ProfileField
                          type={'text'}
                          name={`addresses.${i}.address`}
                          label={t('profile:address')}
                        />
                        <FormRow>
                          <ProfileField
                            type={'text'}
                            name={`addresses.${i}.postal_code`}
                            label={t('profile:postal-code')}
                          />
                          <ProfileField
                            type={'text'}
                            name={`addresses.${i}.city`}
                            label={t('profile:city')}
                          />
                        </FormRow>
                        <ProfileField
                          type={'text'}
                          name={`addresses.${i}.country.name_english`}
                          label={t('profile:country')}
                        />
                      </FormRow>
                    )
                  })}
                  {editMode &&
                  field.value.filter((d: AddressType) => !d._delete).length <
                    2 &&
                  !emptyAddress(field.value) ? (
                    <div className="add-address-btn__wrapper">
                      <Button
                        className="add-address-btn"
                        type="text"
                        onClick={() => addAddr(helpers, field.value.length)}
                      >
                        {t('profile:add-address')} <PlusIcon />
                      </Button>
                    </div>
                  ) : null}
                </>
              )
            }}
          </FieldArray>
        )}
      </Field>
    </Styles>
  )
}

export default ProfileAddresses
