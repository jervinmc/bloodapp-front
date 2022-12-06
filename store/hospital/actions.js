const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/location/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  data ) {
      const response = await this.$axios.$put(
        `/location/${data.id}/`,
        data
      );
      response.data = data;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          "/location/"
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  