import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
import fire from './fire';

import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Buefy,  {
    defaultIconPack: 'fas',
});

Vue.prototype.$fire = fire;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
