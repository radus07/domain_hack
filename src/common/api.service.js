import axios from 'axios'
import {AuthService} from './api/auth.service'
import {DomainService} from './api/domain.service'
import {TldService} from './api/tld.service'
import {UserService} from './api/user.service'
import router from '../router/index'

// Set base url used for REST requests
axios.defaults.baseURL = 'http://localhost:8083/api'

/**
 * Request interceptor
 * Add auth token to Headers
 */
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${AuthService.getToken()}`
  return config
})

/**
 * Response interceptor
 * Redirect to home page with errors when the server not respond
 */
axios.interceptors.response.use(undefined, error => {
  if (!error.status) {
    router.push({name: 'web.home', query: {error: true, error_type: 'ERR_CONNECTION_REFUSED'}})
  }
})

const ApiService = {
  get (resource, slug = '') {
    return axios.get(`${resource}/${slug}`)
  },
  post (resource, body) {
    return axios.post(resource, body)
  },
  put (resource, body) {
    return axios.put(resource, body)
  },
  delete (resource, body) {
    return axios.delete(resource, body)
  },
  async checkConnection () {
    const result = await ApiService.get('')
    return result ? Promise.resolve() : Promise.reject(new Error())
  }
}

export {ApiService, AuthService, DomainService, TldService, UserService}
