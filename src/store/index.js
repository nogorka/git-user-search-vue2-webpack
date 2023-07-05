import Vue from "vue";
import Vuex from "vuex";
import { apiUserGet, apiSearchUsersGet, apiUserReposGet } from "@/utils/api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userList: [],
    paginationLinkList: {
      first: "",
      last: "",
      next: "",
      prev: "",
    },
    user: {},
    headers: {},
    reposList: [],
  },
  mutations: {
    setUserList(state, data) {
      state.userList = data;
    },
    setLink(state, { type, url }) {
      if (type) state.paginationLinkList[type] = url;
    },
    clearLinkList(state) {
      Object.keys(state.paginationLinkList).forEach((key) => {
        state.paginationLinkList[key] = "";
      });
    },
    setUser(state, data) {
      state.user = data;
    },
    setHeaders(state, data) {
      state.headers = data;
    },
    setReposList(state, data) {
      state.reposList = data;
    },
  },
  actions: {
    async loadUser({ commit }, login) {
      commit("setUser", {});

      const result = await apiUserGet(login);
      commit("setUser", result);
    },
    async loadSearchUsers({ state, commit }, params) {
      const data = await apiSearchUsersGet(params.toString());
      commit("setUserList", data);

      const links = state.headers.get("link");
      if (links) {
        links.split(",").forEach((link) => {
          const match = link.trim().match(pattern);
          commit("setLink", { type: match[2], url: match[1] });
        });
      }
    },
    async loadUserRepos({ commit }, login) {
      const data = await apiUserReposGet(login);
      commit("setReposList", data);
    },
  },
});

const pattern = /<(\S*)>; rel="(\S*)"/i;

export default store;
