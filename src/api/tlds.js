import axios from '@/api/axios.config'

const API_URL = '/api/tlds'

/**
 * a CRUD service for manage the TLDS entity
 */
export const tldService = {
  async getTlds () {
    const result = await axios.get(API_URL)
    return (result.data.status === 200)
      ? Promise.resolve(result.data.data)
      : Promise.reject(result.data.status)
  },
  async deleteTlds (tlds) {
    const result = await axios.delete(API_URL, {data: {tlds: tlds}})
    if (result.data.status === 200) return Promise.resolve()
  },
  saveTld (tld) {
    return (tld._id) ? this.updateTld(tld) : this.insertTld(tld)
  },
  async updateTld (tld) {
    const result = await axios.put(API_URL, tld)
    return (result.data.status === 200)
      ? Promise.resolve()
      : Promise.reject(new Error())
  },
  async insertTld (tld) {
    const result = await axios.post(API_URL, tld)
    return (result.data.status === 201)
      ? Promise.resolve()
      : Promise.reject(new Error())
  }
}
