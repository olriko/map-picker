import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Room from './views/Room.vue';
import firebase from 'firebase';
import store from './store';

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
      path: '/room/:id',
      name: 'room',
      component: Room,
      beforeEnter: async (to, from, next) => {
        const userRef = firebase.database().ref(`users/${store.getters.uid}`);
        const snap = await userRef.once('value');

        if (snap.val()) {
          next();
        } else {
          next({ name: 'register', query: { room: to.params.id }});
        }

      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
