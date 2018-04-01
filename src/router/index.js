import Vue from 'vue'
import Router from 'vue-router'
import {webRoutes} from './web-router'
import {adminRoutes} from './admin-router'
import {UserService} from '@/common/api.service'

const appRoutes = webRoutes.concat(adminRoutes)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: appRoutes
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'web.sign_in' || to.name.startsWith('admin')) && unsupportedBrowser()) {
    alert('Unsupported! Please use another browser.')
    if (!from.name) next({name: 'web.home'})
    else return
  }
  setDocumentTitle(to)
  doGuard(to, from, next)
})

export default router

const doGuard = async (to, from, next) => {
  if (to.name === 'web.home' &&
      to.query.error &&
      to.query.error_type === 'ERR_CONNECTION_REFUSED') {
    next()
  } else {
    const user = await UserService.getDetails()
    if (to.meta.authenticated === undefined) next()
    else if (to.meta.authenticated) {
      if (user.auth) next()
      else {
        setDocumentTitle(from)
        next({name: 'web.sign_in'})
      }
    } else {
      if (user.auth) next({name: 'web.home'})
      else next()
    }
  }
}

const setDocumentTitle = (route) => {
  document.title = route.meta.title
}

const unsupportedBrowser = () => {
  return !!document.documentMode
}
