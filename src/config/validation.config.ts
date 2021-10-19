import * as Yup from 'yup'

Yup.addMethod(Yup.string, 'name', function (acceptSpace = false) {
  return this.test({
    name: 'name',
    message: 'invalid-name',
    test: (value) => {
      return (acceptSpace ? /^[A-Za-z\s]*$/ : /^[A-Za-z]*$/).test(value || '')
    }
  })
})
Yup.addMethod(Yup.string, 'password', function () {
  return this.test({
    name: 'password',
    message: 'invalid-password',
    test: (value) => {
      return !value || (/\d/.test(value || '') && /[a-zA-Z]/.test(value || ''))
    }
  })
})
Yup.addMethod(Yup.string, 'phone', function () {
  return this.test({
    name: 'phone',
    message: 'invalid-phone',
    test: (value) => {
      return !value || /^\+?\d{10,12}$/.test(value || '')
    }
  })
})
Yup.addMethod(Yup.string, 'number', function () {
  return this.test({
    name: 'number',
    message: 'must-be-number',
    test: (value) => {
      return /^\d*$/.test(value || '')
    }
  })
})
Yup.addMethod(Yup.string, 'zip', function () {
  return this.test({
    name: 'zip',
    message: 'invalid-zip',
    test: (value) => {
      return !value || /^[a-zA-Z\d\-\s]{4,10}$/.test(value || '')
    }
  })
})

Yup.setLocale({
  // use constant translation keys for messages without values
  mixed: {
    required: 'required-field',
    default: 'invalid-input',
    equals: 'passwords-not-match'
  } as any,
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }: { min: number }) => ({ key: 'low-value', values: { min } }),
    max: ({ max }: { max: number }) => ({ key: 'high-value', values: { max } })
  },
  string: {
    email: 'invalid-email',
    equals: 'passwords-not-match',
    min: ({ min }: { min: number }) => ({
      key: 'field-too-short',
      values: { min }
    }),
    max: ({ max }: { max: number }) => ({
      key: 'field-too-long',
      values: { max }
    })
  } as any
})
