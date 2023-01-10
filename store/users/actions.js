const actions = {
  async addUser({ commit },  customer ) {
    console.log(customer)
    const response = await this.$axios.$post(
      "/signup/",
      customer
    );
    response.customer = customer;
  },
  async editUser({ commit },  customer ) {
    console.log(customer)
    const response = await this.$axios.$put(
      `/users/${customer.id}/`,
      customer
    );
    response.customer = customer;
  },
  async deleteUser({ commit },  customer ) {
    const response = await this.$axios.$delete(
      `/users/${customer.id}/`
    );
  },
  async viewUser({ commit },  customer ) {
    console.log(customer)
    const response = await this.$axios.$get(
      `/users/`
    );
    response.customer = customer;
    commit("SET_USER", response);
  },
};

export default actions;
