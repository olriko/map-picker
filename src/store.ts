import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import Cookie from 'js-cookie';
import firebase from 'firebase';

Vue.use(Vuex);

const init = (store: Store<any>) => {
  store.commit('setUid', Cookie.get('uid'));
  if (!store.getters.uid) {
    const ref = firebase.database().ref('users').push();
    store.commit('setUid', ref.key);
    Cookie.set('uid', ref.key!);
  }

  firebase.database().ref(`users/${store.getters.uid}`).on('value',  (snapshot) => {
    if (snapshot) {
      store.commit('setUser', snapshot.val());
    }
  });
};

export default new Store({
  strict: true,
  state: {
    uid: '',
    user: null,
  },
  mutations: {
    setUid(state: any, uid: string = '') {
      state.uid = uid;
    },
    setUser(state: any, user: object | null = null) {
      state.user = user;
    },
  },
  actions: {},
  plugins: [
    init,
  ],
  getters: {
    uid: (state) => state.uid,
    user: (state) => state.user,
    userRef: (state) => firebase.database().ref('users').child(state.uid),
  },
});
