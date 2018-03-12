import axios from 'axios'
import {authService} from './auth'
import router from '../router'

// Set base url used for REST requests
axios.defaults.baseURL = 'http://localhost:8083'

/**
 * Request interceptor
 * Add auth token to Headers
 */
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authService.getToken()}`
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

/**
 * Use this axios instance for REST requests, import it where is needed
 */
export default axios
