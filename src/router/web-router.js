import Web from '@/views/web'
import Home from '@/components/web/home/home'

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
      }
    ]
  }
]

export default webRoutes
