import axios from '@/api/axios.config'

const API_URL = '/api/tlds'

/**
 * a CRUD service for manage the TLDS entity
 */
export const tldService = {
  getTlds () {
    return new Promise((resolve, reject) => {
      axios.get(API_URL)
        .then(result => {
          if (result.data.status === 200) resolve(result.data.data)
          else reject(result.data.status)
        })
    })
  },
  deleteTlds (tlds) {
    return new Promise((resolve) => {
      axios.delete(API_URL, {data: {tlds: tlds}})
        .then((res) => {
          if (res.data.status === 200) resolve()
        })
    })
  },
  saveTld (tld) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL, tld)
        .then((res) => {
          if (res.data.status === 201) resolve()
          else reject(new Error())
        })
    })
  },
  updateTld (tld) {
    return new Promise((resolve, reject) => {
      axios.put(API_URL, tld)
        .then((res) => {
          if (res.data.status === 200) resolve()
          else reject(new Error())
        })
    })
  }
}
