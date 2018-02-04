import axios from 'axios'

const API_URL = 'http://localhost:8083/api/users'

export const userService = {
  getUsers () {
    return new Promise((resolve, reject) => {
      axios.get(API_URL)
        .then(result => {
          if (result.data.status === 200) resolve(result.data.data)
          else reject(result.data.status)
        })
    })
  },
  deleteUsers (users) {
    return new Promise((resolve) => {
      axios.delete(API_URL, {data: {users: users}})
        .then((res) => {
          if (res.data.status === 200) resolve()
        })
    })
  },
  saveUser (user) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL, user)
        .then((res) => {
          if (res.data.status === 201) resolve()
          else reject(new Error())
        })
    })
  },
  updateUser (user) {
    return new Promise((resolve, reject) => {
      axios.put(API_URL, user)
        .then((res) => {
          if (res.data.status === 200) resolve()
          else reject(new Error())
        })
    })
  }
}
