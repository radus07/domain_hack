import axios from '@/api/axios.config'

export const authService = {
  async authenticateUser (user) {
    user = this.validateUser(user)
    const result = await axios.post(`/api/authenticate`, user)
    return (result.data.status === 200)
      ? Promise.resolve(result.data.data)
      : Promise.reject(result.data.status)
  },
  validateUser (user) {
    const username = user.username.trim().toString()
    const password = btoa(user.password.trim().toString())
    return {
      username: username,
      password: password
    }
  },
  saveToken (token) {
    localStorage.setItem('token', JSON.stringify(token))
    return Promise.resolve()
  },
  isAuthenticated () {
    return localStorage.getItem('token') !== null
  },
  getToken () {
    return JSON.parse(localStorage.getItem('token'))
  },
  async getUserDetails () {
    if (this.isAuthenticated()) {
      const id = JSON.parse(atob(this.getToken().split('.')[1])).user_id
      const result = await axios.get(`/api/users/${id}`)
      return (result.data.status === 200)
        ? Promise.resolve({auth: true})
        : Promise.resolve({auth: false})
    } else return Promise.resolve({auth: false})
  },
  logoutUser (router) {
    localStorage.removeItem('token')
    router.push({name: 'web.sign_in'})
  },
  async checkConnection () {
    const result = await axios.get('/api/users/s')
    return result ? Promise.resolve() : Promise.reject(new Error())
  }
}
