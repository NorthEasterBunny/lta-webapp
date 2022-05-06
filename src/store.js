import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    token: localStorage.getItem('token') || ''
  },
  getters: {
    user(state){
      return state.user;
    },
    token(state) {
      return state.token;
    }
  },
  mutations: {
    SET_USER(state, data) {
        state.user.data = data;
    },
    SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    }
  },
  actions: {
    fetchUser({ commit }, user) {

      if (user) {

        user.getIdToken().then(function(idToken) {
          // console.log("user.getIdToken().then... :");
          // console.log(idToken);
          // console.log("setting token to idToken: " + idToken);
          commit("SET_TOKEN", idToken);

      });

        var data = {
          displayName: user.displayName,
          email: user.email
        };
        commit("SET_USER", data);

      } else {
        commit("SET_USER", null);
        commit("SET_TOKEN", null);
      }
    }
  }
});