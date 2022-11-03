const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/events/",
        data
      );
      response.data = data;
    },
    async edit({ commit },  data ) {
      console.log(customer)
      const response = await this.$axios.$put(
        `/events/${data.id}/`,
        data
      );
      response.data = data;
    },
    async view({ commit }, ) {
        const response = await this.$axios.$get(
          `/blood-request/${localStorage.getItem('id')}/`
        );
        commit("SET_EVENT", response);
      },
  };
  
  export default actions;
  