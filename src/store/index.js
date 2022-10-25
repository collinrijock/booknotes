import { createStore } from "vuex";
export default createStore({
  state: {
    data: [],
  },
  getters: {
    getAllData: (state) => state.data,
    getContentById: (state) => (id) => {
      return state.data.find((item) => item.id === id);
    },
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setContentById(state, { id, content }) {
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index].content = content;
    },
  },
  actions: {
    async getLocalStorageData({ commit }) {
      const data = JSON.parse(localStorage.getItem("data"));
      commit("setData", data);
      return data;
    },
    async saveLocalStorageData({ commit }, data) {
      commit("setData", data);
      localStorage.setItem("data", JSON.stringify(data));
    },
    async addContent({ state, commit, dispatch }, content) {
      commit("setData", [content, ...state.data]);
      await dispatch("saveLocalStorageData");
    },
    async updateContent({ commit, dispatch }, { id, content }) {
      commit("setContentById", { id, content });
      await dispatch("saveLocalStorageData");
    },
    async deleteContent({ state, dispatch }, id) {
      const index = state.data.findIndex((item) => item.id === id);
      state.data.splice(index, 1);
      await dispatch("saveLocalStorageData");
    },
  },
  modules: {},
});
