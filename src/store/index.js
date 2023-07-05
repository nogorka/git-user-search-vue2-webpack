import Vue from "vue";
import Vuex from "vuex";
import { apiUserGet } from "@/utils/api";
import { requestWithHeaders } from "@/utils/request";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userList: {},
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
    setUserList(state, data) {
      state.userList = data;
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

    setHeaders(state, data) {
      state.headers = data;
    },
  },
  actions: {
    async loadUser({ commit }, login) {
      commit("setUser", {});

      const result = await apiUserGet(login);
      commit("setUser", result);
    },
    async loadSearchUsers({ commit }, url) {
      const data = await requestWithHeaders(url, false);
      commit("setUserList", data);
    },
  },
});

export default store;
