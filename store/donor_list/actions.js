const actions = {
    async add({ commit },  data ) {
      const response = await this.$axios.$post(
        "/d/",
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
          `/assessment-hospital/${localStorage.getItem('id')}/Accept/`
        );
        commit("SET_DONATION_LIST", response);
      },
  };
  
  export default actions;
  