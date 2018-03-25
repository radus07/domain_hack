import Web from '@/views/Web'
import Home from '@/components/web/home/Home'
import SignIn from '@/components/web/signIn/SignIn'
import AppError from '@/components/common/AppError'

const webRoutes = [
  {
    path: '/',
    component: Web,
    children: [
      {path: '', redirect: {name: 'web.home'}},
      {
        path: 'home',
        name: 'web.home',
        component: Home,
        meta: {title: 'Domain Hack'}
      },
      {
        path: 'sign_in',
        name: 'web.sign_in',
        component: SignIn,
        meta: {title: 'Sign in', authenticated: false}
      }
    ]
  },
  {
    path: '*',
    name: 'web.notFound',
    component: AppError,
    props: {appError: {error: true, message: 'The page you are looking for was not found!', type: 'PAGE_NOT_FOUND'}},
    meta: {title: '404 Page Not Found'}
  }
]

export {webRoutes}
