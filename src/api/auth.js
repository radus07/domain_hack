import axios from 'axios'
const API_URL = 'http://localhost:8083/api/'

// todo: refactor that, add config file
/**
 * Intercept each request and add token to headers
 */
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  return config
})

export const authService = {
  authenticateUser (user) {
    user = this.validateUser(user)
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}authenticate`, user)
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
  // todo: refactor that, move to myUserService
  getUserDetails () {
    return new Promise((resolve) => {
      if (localStorage.getItem('token')) {
        const id = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user_id
        axios.get(`${API_URL}users/${id}`)
          .then((res) => {
            if (res.data.status === 200) resolve({auth: true})
            else resolve({auth: false})
          })
      } else resolve({auth: false})
    })
  }
}
