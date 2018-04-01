import {ApiService, AuthService} from '@/common/api.service'

const API_URL = '/users'

/**
 * a CRUD service for manage the USERS entity
 */
export const UserService = {
  async authenticate (user) {
    const result = await ApiService.post('users/login', {user: validateUser(user)})
    return (result.data.status === 200)
      ? Promise.resolve(result.data.data)
      : Promise.reject(result.data.status)
  },
  async getAll () {
    const result = await ApiService.get(API_URL)
    return (result.data.status === 200)
      ? Promise.resolve(result.data.data)
      : Promise.reject(result.data.status)
  },
  async getDetails () {
    if (isAuthenticated()) {
      const id = JSON.parse(atob(AuthService.getToken().split('.')[1])).user_id
      const result = await ApiService.get('users', id)
      return (result.data.status === 200)
        ? Promise.resolve({auth: true})
        : Promise.resolve({auth: false})
    } else return Promise.resolve({auth: false})
  },
  async remove (users) {
    const result = await ApiService.delete(API_URL, {data: {users: users}})
    if (result.data.status === 200) return Promise.resolve()
  },
  async add (user) {
    const result = await ApiService.post('users', {user: validateUser(user)})
    return (result.data.status === 200)
      ? Promise.resolve()
      : Promise.reject(result.data.status)
  }
}

const validateUser = user => {
  let newUser = {}
  newUser.username = user.username.trim().toString()
  newUser.password = btoa(user.password.trim().toString())
  Object.assign(user, newUser)
  return user
}

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}
