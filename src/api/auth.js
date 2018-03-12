import axios from '@/api/axios.config'

export const authService = {
  authenticateUser (user) {
    user = this.validateUser(user)
    return new Promise((resolve, reject) => {
      axios.post(`/api/authenticate`, user)
        .then(result => {
          if (result.data.status === 200) resolve(result.data.data)
          else reject(result.data.status)
        })
    })
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
    return new Promise((resolve, reject) => {
      localStorage.setItem('token', JSON.stringify(token))
      resolve()
    })
  },
  isAuthenticated () {
    return localStorage.getItem('token') !== null
  },
  getToken () {
    return JSON.parse(localStorage.getItem('token'))
  },
  getUserDetails () {
    return new Promise((resolve) => {
      if (this.isAuthenticated()) {
        const id = JSON.parse(atob(this.getToken().split('.')[1])).user_id
        axios.get(`/api/users/${id}`)
          .then((res) => {
            if (res.data.status === 200) resolve({auth: true})
            else resolve({auth: false})
          })
      } else resolve({auth: false})
    })
  },
  logoutUser (router) {
    localStorage.removeItem('token')
    router.push({name: 'web.sign_in'})
  },
  checkConnection () {
    return new Promise((resolve, reject) => {
      axios.get('/api/users/s')
        .then((res) => {
          (res) ? resolve() : reject(new Error())
        })
    })
  }
}
