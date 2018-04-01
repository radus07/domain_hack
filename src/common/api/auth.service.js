import {ApiService} from '@/common/api.service'

export const AuthService = {
  saveToken (token) {
    localStorage.setItem('token', JSON.stringify(token))
    return Promise.resolve()
  },
  getToken () {
    return JSON.parse(localStorage.getItem('token'))
  },
  destroyToken (router) {
    localStorage.removeItem('token')
    router.push({name: 'web.sign_in'})
  },
  async checkConnection () {
    const result = await ApiService.get('')
    console.log(result)
    return result ? Promise.resolve() : Promise.reject(new Error())
  }
}
