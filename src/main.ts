import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import './fire';
import router from './router';
import store from './store';
import '@/styles/app.scss';

import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Buefy,  {
    defaultIconPack: 'fas',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
