import Vue from "vue";
import Vuex from "vuex";
import ax from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {

    }
  },
  mutations: {
    setState (state, data) {
      if (!data.key) return false;
      Vue.set(state, data.key, data.val);
    },
  },
  actions: {
    async getUsers({commit}) {
      const res = await ax.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = res.data.map(user => {
        const [name, ...lastNames] = user.name.split(' ');
        let obj = {
          firstName: name,
          lastName: lastNames.join(' '),
          userName: user.username,
          email: user.email,
          id: user.id,
        }

        return obj;
      })
        commit('setState', {
          key: 'users',
          val: data
        })
    },
  },
  modules: {},
});
