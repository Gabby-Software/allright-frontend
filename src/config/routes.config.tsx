import {Routes} from "../enums/routes.enum";
import {lazy} from 'react';
import {RouteType} from "../types/route.type";
const routes: RouteType[] = [
    {
        title: 'Login',
        url: Routes.LOGIN,
        Component: lazy(() => import('../pages/login/login.component')),
    },
    {
        title: 'Sign Up',
        url: Routes.REGISTER,
        Component: lazy(() => import('../pages/sign-up/sign-up.component')),
    },
    {
        title: 'Forget Password',
        url: Routes.FORGOT_PASSWORD,
        Component: lazy(() => import('../pages/forgot-password/forgot-password.component')),
    },
    {
        title: 'Forget Password Confirmation',
        url: Routes.FORGOT_PASSWORD_CONFIRMATION,
        Component: lazy(() => import('../pages/forgot-password-confirmation/forgot-password-confirmation.component')),
    },
    {
        title: 'Reset Password',
        url: Routes.RESET_PASSWORD,
        Component: lazy(() => import('../pages/reset-password/reset-password.component')),
    },
    {
        title: 'Sign up confirmation',
        url: Routes.REGISTER_CONFIRMATION,
        Component: lazy(() => import('../pages/sign-up-confirmation/sign-up-confirmation.component')),
    },
    {
        title: 'Email verification',
        url: `${Routes.VERIFY_EMAIL}/:id/:token`,
        Component: lazy(() => import('../pages/verify-email/verify-email.component')),
    },
    {
        title: 'TEST',
        url: Routes.TEST,
        Component: lazy(() => import('../pages/test/test.component'))
    }
];
export default routes;
