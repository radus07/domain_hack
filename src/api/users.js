import axios from '@/api/axios.config'

const API_URL = '/api/users'

/**
 * a CRUD service for manage the USERS entity
 */
export const userService = {
  async getUsers () {
    const result = await axios.get(API_URL)
    return (result.data.status === 200)
      ? Promise.resolve(result.data.data)
      : Promise.reject(result.data.status)
  },
  async deleteUsers (users) {
    const result = await axios.delete(API_URL, {data: {users: users}})
    if (result.data.status === 200) return Promise.resolve()
  },
  saveUser (user) {
    return (user._id) ? this.updateUser(user) : this.insertUser(user)
  },
  async updateUser (user) {
    const result = axios.post(API_URL, user)
    return (result.data.status === 200)
      ? Promise.resolve()
      : Promise.reject(new Error())
  },
  async insertUser (user) {
    const result = axios.put(API_URL, user)
    return (result.data.status === 201)
      ? Promise.resolve()
      : Promise.reject(new Error())
  }
}
