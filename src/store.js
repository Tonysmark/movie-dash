import Vue from "vue";
import Vuex from "vuex";
import searchRes from "./modules/searchRes";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: ""
  },
  mutations: {
    addToken: (state, val) => (state.token = val)
  },
  actions: {
    async updateUser({ commit }, val) {
      console.log("token in vuex");
      await commit("addToken", val); //把数据提交（commit）给 mutation
    }
  },
  getters: {
    getToken: state => state.token
  },
  modules: {
    searchRes
  }
});
