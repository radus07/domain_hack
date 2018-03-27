import axios from '@/api/axios.config'

const API_URL = '/api/tlds'

/**
 * a CRUD service for manage the TLDS entity
 */
export const tldService = {
  getTlds () {
    return axios.get(API_URL)
      .then(result => {
        return (result.data.status === 200)
          ? Promise.resolve(result.data.data)
          : Promise.reject(result.data.status)
      })
  },
  deleteTlds (tlds) {
    return axios.delete(API_URL, {data: {tlds: tlds}})
      .then(result => {
        if (result.data.status === 200) return Promise.resolve()
      })
  },
  saveTld (tld) {
    return (tld._id) ? this.updateTld(tld) : this.insertTld(tld)
  },
  updateTld (tld) {
    return axios.put(API_URL, tld)
      .then(result => {
        return (result.data.status === 200)
          ? Promise.resolve()
          : Promise.reject(new Error())
      })
  },
  insertTld (tld) {
    return axios.post(API_URL, tld)
      .then(result => {
        return (result.data.status === 201)
          ? Promise.resolve()
          : Promise.reject(new Error())
      })
  }
}
