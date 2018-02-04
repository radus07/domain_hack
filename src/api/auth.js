import axios from 'axios'
const API_URL = 'http://localhost:8083/api/authenticate'

export const authService = {
  authenticateUser (user) {
    user = this.validateUser(user)
    return new Promise((resolve, reject) => {
      axios.post(API_URL, user)
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
  }
}
