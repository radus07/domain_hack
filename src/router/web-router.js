import Web from '@/views/web'
import Home from '@/components/web/home/home'
import SignIn from '@/components/web/sign_in/sign_in'

const webRoutes = [
  {
    path: '/',
    component: Web,
    children: [
      {path: '', redirect: {name: 'web.home'}},
      {
        path: 'home',
        name: 'web.home',
        component: Home
      },
      {
        path: 'sign_in',
        name: 'web.sign_in',
        component: SignIn
      }
    ]
  }
]

export default webRoutes
