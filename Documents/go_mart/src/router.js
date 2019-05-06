import Vue from 'vue'
import Router from 'vue-router'
import Dome from './views/Dome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Dome',
      name: 'Dome',
      component: Dome
    }
  ]
})
