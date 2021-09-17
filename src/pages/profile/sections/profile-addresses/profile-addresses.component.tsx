import React, { useState, useEffect } from 'react'
import Styles from './profile-addresses.styles'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import {
  ArrayHelpers,
  Field,
  FieldArray,
  FieldProps,
  FormikProps
} from 'formik'
import FormRow from '../../../../components/forms/form-row/form-row.component'
import FormInputLabeled from '../../../../components/forms/form-input-labeled/form-input-labeled.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import FormCountrySelect from '../../../../components/forms/form-country-select/form-country-select.component'
import { AddressType } from '../../../../types/address.type'
import { useProfileContext } from '../../profile.context'
import ProfileField from '../../components/profile-field/profile-field.component'
import { classes } from '../../../../pipes/classes.pipe'
import logger from '../../../../managers/logger.manager'

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
  return (
    <Styles>
      <ProfileTitle title={'Addresses'} />
      <Field name={'addresses'}>
        {({ field, form }: FieldProps) => (
          <FieldArray name={'addresses'}>
            {(helpers: ArrayHelpers) => (
              <>
                {field?.value?.map((_: any, i: number) =>
                  editMode ? (
                    _._delete ? null : (
                      <React.Fragment key={_.id}>
                        <FormRow>
                          <FormInputLabeled
                            name={`addresses.${i}.address`}
                            label={t('profile:address')}
                          />
                          <FormRow>
                            <FormInputLabeled
                              name={`addresses.${i}.postal_code`}
                              label={t('profile:postal-code')}
                            />
                            <FormInputLabeled
                              name={`addresses.${i}.city`}
                              label={t('profile:city')}
                            />
                          </FormRow>
                          <FormCountrySelect
                            name={`addresses.${i}.country.code`}
                            label={t('profile:country')}
                          />
                        </FormRow>
                        <FormRow>
                          <div
                            className={classes(
                              'profile-addr__default',
                              field?.value[i].is_default &&
                                'profile-addr__default__active'
                            )}
                            onClick={() =>
                              markAsDefault(i, field.value.length, form)
                            }
                          >
                            My default address
                          </div>
                          {field.value.filter((d: AddressType) => !d._delete)
                            .length < 2 ? null : (
                            <div
                              className={'profile-addr__remove'}
                              onClick={() => removeAddr(helpers, form, i)}
                            >
                              {'remove address'}
                            </div>
                          )}
                        </FormRow>
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
                )}
                {editMode &&
                field.value.filter((d: AddressType) => !d._delete).length < 2 &&
                !emptyAddress(field.value) ? (
                  <p
                    className={'profile-addr__add'}
                    onClick={() => addAddr(helpers, field.value.length)}
                  >
                    {t('profile:add-address')}
                  </p>
                ) : null}
              </>
            )}
          </FieldArray>
        )}
      </Field>
    </Styles>
  )
}

export default ProfileAddresses
