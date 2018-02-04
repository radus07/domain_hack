import Admin from '@/views/admin'
import Home from '@/components/admin/home/home'
import Users from '@/components/admin/users/users'

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
      }
    ]
  }
]

export default adminRoutes
