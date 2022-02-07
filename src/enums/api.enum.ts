// https://documenter.getpostman.com/view/8741108/Tzeak6s7#intro

export const LIVERIGHT_API = process.env.REACT_APP_LIVERIGHT_API_URL
export const EATRIGHT_API = process.env.REACT_APP_EATRIGHT_API_URL

export const EP_CSRF = '/sanctum/csrf-cookie'
export const EP_REGISTER = '/register'
export const EP_LOGIN = '/login'
export const EP_LOGOUT = '/logout'
export const EP_SEND_RESET_PASSWORD = '/forgot-password'
export const EP_VERIFY_EMAIL = '/verify-email'
export const EP_VERIFY_EMAIL_RESEND = '/email/verification-notification'
export const EP_GET_USER = '/user'
export const EP_UPDATE_USER = '/user'
export const EP_UPDATE_PROFILE = '/user/profile'
export const EP_UPDATE_TNB = '/user/profile/terms_conditions'
export const EP_UPDATE_AVATAR = '/user/avatar'
export const EP_RESET_PASSWORD = '/reset-password'
export const EP_GET_COUNTRIES = '/countries'
export const EP_ADD_ACCOUNT = '/user/account'
export const EP_GET_ADDRESSES = '/user/account/addresses'
export const EP_UPDATE_ADDRESSES = '/user/account/addresses'
export const EP_UPDATE_PROFILE_CUSTOM = '/user/generic-profile'
export const EP_UPDATE_PASSWORD = '/user/password'
export const EP_SET_PASSWORD = '/set-password'
export const EP_CHECK_EMAIL_EXIST = '/invitations/check'
export const EP_INVITE_NEW_USER = '/invitations'
// export const EP_GET_TRAINER = '/training/trainer';
export const EP_GET_TRAINER = LIVERIGHT_API + '/training/trainer-users'
export const EP_GET_INVOICES = '/invoices'
export const EP_STRIPE_KEY = '/payment-methods/name/stripe'
export const EP_STRIPE_CHECKOUT = '/stripe/checkout'
export const EP_MARK_INVOICE_AS_PAID = (id: number) =>
  `/invoices/${id}/mark-as-paid`
export const EP_EDIT_INVOICE = '/invoices'
export const EP_APPLY_COUPON = EATRIGHT_API + '/api/applied-coupons/usage'
export const EP_CARDS = '/cards'
