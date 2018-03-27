import axios from '@/api/axios.config'

const API_URL = '/api/users'

/**
 * a CRUD service for manage the USERS entity
 */
export const userService = {
  getUsers () {
    return axios.get(API_URL)
      .then(result => {
        return (result.data.status === 200)
          ? Promise.resolve(result.data.data)
          : Promise.reject(result.data.status)
      })
  },
  deleteUsers (users) {
    return axios.delete(API_URL, {data: {users: users}})
      .then(result => {
        if (result.data.status === 200) return Promise.resolve()
      })
  },
  saveUser (user) {
    return (user._id) ? this.updateUser(user) : this.insertUser(user)
  },
  updateUser (user) {
    return axios.put(API_URL, user)
      .then(result => {
        return (result.data.status === 200)
          ? Promise.resolve()
          : Promise.reject(new Error())
      })
  },
  insertUser (user) {
    return axios.post(API_URL, user)
      .then(result => {
        return (result.data.status === 201)
          ? Promise.resolve()
          : Promise.reject(new Error())
      })
  }
}
