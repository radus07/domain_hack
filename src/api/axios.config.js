import axios from 'axios'
import {authService} from './auth'

// set base url using for REST requests
axios.defaults.baseURL = 'http://localhost:8083'

/**
 * intercept each request and add token to Headers
 */
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authService.getToken()}`
  return config
})

/**
 * user this axios instance for REST requests, import it where you need
 */
export default axios
