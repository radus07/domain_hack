const Admin = () => import('@/views/Admin')
const Home = () => import('@/components/admin/home/Home')
const Users = () => import('@/components/admin/users/Users')
const Tlds = () => import('@/components/admin/tlds/Tlds')

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
