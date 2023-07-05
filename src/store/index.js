import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userData: {},
    paginationLinkList: {
      first: "",
      last: "",
      next: "",
      prev: "",
    },
    user: {},
    headers: {},
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },
    setLink(state, { type, url }) {
      if (type) state.paginationLinkList[type] = url;
    },
    clearLinkList(state) {
      const keys = Object.keys(state.paginationLinkList);
      keys.forEach((key) => {
        state.paginationLinkList[key] = "";
      });
    },
    setUser(state, data) {
      state.user = data;
    },
    clearUser(state) {
      state.user = {};
    },
    setHeaders(state, data) {
      state.headers = data;
    },
  },
});

export default store;
