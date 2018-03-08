import Admin from '@/views/Admin'
import Home from '@/components/admin/home/Home'
import Users from '@/components/admin/users/Users'
import Tlds from '@/components/admin/tlds/Tlds'

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

export {adminRoutes}
