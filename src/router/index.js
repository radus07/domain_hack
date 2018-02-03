import Vue from 'vue'
import Router from 'vue-router'
import webRoutes from './web-router'
import adminRoutes from './admin-router'

const appRoutes = webRoutes.concat(adminRoutes)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: appRoutes
})
