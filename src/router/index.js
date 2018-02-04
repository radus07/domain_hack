import Vue from 'vue'
import Router from 'vue-router'
import webRoutes from './web-router'
import adminRoutes from './admin-router'
import {authService} from '@/api/auth'

const appRoutes = webRoutes.concat(adminRoutes)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: appRoutes
})

router.beforeEach((to, from, next) => {
  setDocumentTitle(to)
  doGuard(to, from, next)
})

export default router

let doGuard = (to, from, next) => {
  authService.getUserDetails()
    .then(user => {
      if (to.meta.authenticated === undefined) {
        next()
      } else if (to.meta.authenticated) {
        if (user.auth) {
          next()
        } else {
          setDocumentTitle(from)
          next({name: 'web.sign_in'})
        }
      } else {
        if (user.auth) {
          next({name: 'web.home'})
        } else {
          next()
        }
      }
    })
}

let setDocumentTitle = (route) => {
  document.title = route.meta.title
}
