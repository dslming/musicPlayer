import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Player from '@/page/player/Player.vue'
import Music from '@/views/music/music.vue'
Vue.use(VueRouter)

// const Player = (resolve) => {
//   import('@/component/player/player').then((module) => {
//     resolve(module)
//   })
// }

const routes = [
  {
    path: '/',
    name: 'Player',
    component: Music
  }
]

const router = new VueRouter({
  routes
})

export default router
