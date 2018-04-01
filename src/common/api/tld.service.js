import {ApiService} from '@/common/api.service'

/**
 * a CRUD service for manage the TLDS entity
 */
export const TldService = {
  async getAll () {
    const result = await ApiService.get('tlds')
    return (result.data.status === 200)
      ? Promise.resolve(result.data.data)
      : Promise.reject(result.data.status)
  },
  async remove (tlds) {
    const result = await ApiService.delete('tlds', {data: {tlds: tlds}})
    if (result.data.status === 200) return Promise.resolve()
  },
  async add (tld) {
    const result = await ApiService.post('tlds', {tld: tld})
    return (result.data.status === 200)
      ? Promise.resolve()
      : Promise.reject(result.data.status)
  }
}
