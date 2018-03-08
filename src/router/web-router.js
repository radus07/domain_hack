import Web from '@/views/Web'
import Home from '@/components/web/home/Home'
import SignIn from '@/components/web/signIn/SignIn'

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
  }
]

export {webRoutes}
