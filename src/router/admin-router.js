import Admin from '@/views/admin'
import Home from '@/components/admin/home/home'
import Users from '@/components/admin/users/users'
import Tlds from '@/components/admin/tlds/tlds'

const adminRoutes = [
  {
    path: '/admin',
    component: Admin,
    children: [
      {path: '', redirect: {name: 'admin.home'}},
      {
        path: 'home',
        name: 'admin.home',
        component: Home,
        meta: {title: 'Admin | Home', authenticated: true}
      },
      {
        path: 'users',
        name: 'admin.users',
        component: Users,
        meta: {title: 'Admin | Users', authenticated: true}
      },
      {
        path: 'tlds',
        name: 'admin.tlds',
        component: Tlds,
        meta: {title: 'Admin | TLDs', authenticated: true}
      }
    ]
  }
]

export default adminRoutes
