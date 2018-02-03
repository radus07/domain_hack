import Admin from '@/views/admin'
import Home from '@/components/admin/home/home'

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
      }
    ]
  }
]

export default adminRoutes
