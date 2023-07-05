import Vue from "vue";
import Vuex from "vuex";
import { apiUserGet, apiSearchUsersGet } from "@/utils/api";

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
    async loadSearchUsers({ commit }, params) {
      const data = await apiSearchUsersGet(params.toString());
      commit("setUserList", data);

      const links = store.state.headers.get("link");
      if (links) parseLinks(links);
    },
  },
});

const nextPattern = /<(\S*)>; rel="(\S*)"/i;

const parseLinks = (links) => {
  const list = links.split(",");
  list.forEach((link) => {
    link = link.trim();
    store.commit("setLink", {
      type: link.match(nextPattern)[2],
      url: link.match(nextPattern)[1],
    });
  });
};

export default store;
