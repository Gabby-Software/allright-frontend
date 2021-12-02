import { lazy } from 'react'

import { Routes } from '../enums/routes.enum'
import { RouteType } from '../types/route.type'

const routes: RouteType[] = [
  {
    title: 'Login',
    url: Routes.LOGIN,
    Component: lazy(() => import('../pages/login/login.component'))
  },
  {
    title: 'Sign Up',
    url: Routes.REGISTER,
    Component: lazy(() => import('../pages/sign-up/sign-up.component'))
  },
  {
    title: 'Forget Password',
    url: Routes.FORGOT_PASSWORD,
    Component: lazy(
      () => import('../pages/forgot-password/forgot-password.component')
    )
  },
  {
    title: 'Forget Password Confirmation',
    url: Routes.FORGOT_PASSWORD_CONFIRMATION,
    Component: lazy(
      () =>
        import(
          '../pages/forgot-password-confirmation/forgot-password-confirmation.component'
        )
    )
  },
  {
    title: 'Reset Password',
    url: Routes.RESET_PASSWORD,
    Component: lazy(
      () => import('../pages/reset-password/reset-password.component')
    )
  },
  {
    title: 'Sign up confirmation',
    url: Routes.REGISTER_CONFIRMATION,
    Component: lazy(
      () =>
        import('../pages/sign-up-confirmation/sign-up-confirmation.component')
    )
  },
  {
    title: 'Email verification',
    url: `${Routes.VERIFY_EMAIL}/:id/:token`,
    Component: lazy(
      () => import('../pages/verify-email/verify-email.component')
    )
  },
  {
    title: 'Sign Up Onboard',
    url: Routes.REGISTER_ON_BOARD,
    Component: lazy(() => import('../pages/onboard/onboard.component'))
  },
  {
    title: 'TEST',
    url: Routes.TEST,
    Component: lazy(() => import('../pages/test/test.component'))
  },
  {
    title: 'Add Account',
    url: Routes.ADD_ACCOUNT,
    Component: lazy(() => import('../pages/add-account/add-account.component'))
  },
  {
    title: 'Add Account Onboard',
    url: Routes.ADD_ACCOUNT_ONBOARD,
    Component: lazy(
      () => import('../pages/add-account-onboard/add-account-onboard.component')
    )
  },
  {
    title: 'Profile',
    url: Routes.PROFILE,
    Component: lazy(() => import('../pages/profile/profile.component'))
  },
  {
    title: 'Accept Invitation',
    url: Routes.INVITATIONS + '/:id/accept',
    Component: lazy(
      () =>
        import(
          '../pages/invitations/accept-invitation/accept-invitation.component'
        )
    )
  },
  {
    title: 'Onboarding',
    url: Routes.INVITATIONS_ONBOARD,
    Component: lazy(
      () =>
        import(
          '../pages/invitations/invitation-onboard/invitation-onboard.component'
        )
    )
  },
  {
    title: 'Reject Invitation',
    url: Routes.INVITATIONS + '/:id/reject',
    Component: lazy(
      () =>
        import(
          '../pages/invitations/reject-invitation/reject-invitation.component'
        )
    )
  },
  {
    title: 'Invoice',
    url: Routes.INVOICE,
    Component: lazy(() => import('../pages/invoice/invoice.component'))
  },
  {
    title: 'Pay Invoice',
    url: Routes.INVOICE_PAY,
    Component: lazy(() => import('../pages/invoice-pay/invoice-pay.component'))
  },
  {
    title: 'Login As',
    url: Routes.LOGIN_AS,
    Component: lazy(() => import('../pages/login-as/login-as.component'))
  }
]

export default routes
