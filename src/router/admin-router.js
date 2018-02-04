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
        component: Home
      },
      {
        path: 'users',
        name: 'admin.users',
        component: Users
      },
      {
        path: 'tlds',
        name: 'admin.tlds',
        component: Tlds
      }
    ]
  }
]

export default adminRoutes
