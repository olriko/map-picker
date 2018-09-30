import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CreateRoom from './views/CreateRoom.vue';
import Room from './views/Room.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/new',
      name: 'create-room',
      component: CreateRoom,
    },
    {
      path: '/room/:id',
      name: 'room',
      component: Room,
    },
  ],
});
