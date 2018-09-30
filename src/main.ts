import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import Cookie from 'js-cookie';
import router from './router';
import store from './store';
import '@/styles/app.scss';
import firebase from 'firebase';

import './fire';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Buefy,  {
    defaultIconPack: 'fas',
});

if (!Cookie.get('uid')) {
  const ref = firebase.database().ref('users').push();
  Cookie.set('uid', ref.key!);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
