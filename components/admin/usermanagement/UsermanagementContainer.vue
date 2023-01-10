<template>
  <div class="pa-10">
    <v-dialog v-model="isEdit" width="500">
        <v-card color="white" class="pa-10">
      <div class="secondary text-h4 pa-5 white--text" align="center">
        <b>Edit User</b>
      </div>
      <div class="pa-16">
        <v-col>
          <div>Fullname</div>
          <div>
            <v-text-field
              class="rounded-lg white"
              :rules="standardRules"
              hide-details=""
              placeholder="Name"
              outlined
              v-model="register.fullname"
            ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <div>Email Address</div>
          <div>
            <v-text-field
              class="rounded-lg white"
              :rules="standardRules"
              hide-details=""
              placeholder="Email Address"
              outlined
              v-model="register.email"
            ></v-text-field>
          </div>
        </v-col>
      </div>
      <div>
        <v-row>
          <v-col align="end">
            <v-btn color="grey" width="100" class="text-capitalize rounded-xl" @click="isEdit=false">
              No
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="black" width="100" class="text-capitalize rounded-xl white--text" @click="submitHandlerRegister">
              Yes
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
    </v-dialog>
    <v-dialog v-model="isDelete" width="500">
      <v-card class="pa-16">
        <div align="center">
          Are you sure you want to delete?
          <div class="pt-10">
            <v-row>
              <v-col align="center">
                <v-btn
                  color="grey"
                  class="text-capitalize rounded-xl"
                  @click="isDelete =false"
                  width="100"
                >
                  No
                </v-btn>
              </v-col>
              <v-col class="start">
                <v-btn
                width="100"
                  color="secondary"
                  class="text-capitalize rounded-xl"
                  @click="submitDelete"
                >
                  Yes
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addForm" width="1000">
      <add @cancel="addForm = false" />
    </v-dialog>
    <v-dialog v-model="editForm" width="1000">
      <edit @cancel="editForm = false" :selectedItem="selectedItem" />
    </v-dialog>
    <div class="text-h4 pb-10">
      <b> MANAGE USERS </b>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-btn
            color="secondary"
            class="rounded-xl text-capitalize"
            @click="goToAdd"
          >
            Add New User
          </v-btn>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <v-select
                class="rounded-lg "
                outlined
                hide-details=""
                placeholder="Filter by roles"
              >
                Filter by roles
              </v-select>
            </v-col>
            <v-col>
              <v-text-field
                placeholder="Search"
                outlined
                v-model="search"
                class="rounded-lg"
                hide-details=""
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-data-table
        class="pa-5"
        :headers="headers"
        :items="users"
        :search="search"
        :loading="isLoading"
      >
        <template v-slot:loading>
          <v-skeleton-loader
            v-for="n in 5"
            :key="n"
            type="list-item-avatar-two-line"
            class="my-2"
          ></v-skeleton-loader>
        </template>
        <template #[`item.opt`]="{ item }">
          <v-menu offset-y z-index="1">
            <template v-slot:activator="{ attrs, on }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click.stop="editItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click.stop="deleteItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import Add from "./Add.vue";
import { mapState, mapActions } from "vuex";
import Edit from "./Edit.vue";
var cloneDeep = require("lodash.clonedeep");
export default {
  computed: {
    ...mapState("users", ["users"]),
  },
  methods: {
    submitHandlerRegister(){
      this.$store.dispatch('users/editUser',this.register).then(res=>{
        alert('Successfully Updated!')
        location.reload()
      })
    },
    editItem(item){
      this.register = cloneDeep(item)
      this.isEdit = true
    },
   async submitDelete(){
     await this.$store.dispatch('users/deleteUser',this.selectedItem).then((res)=>{
      alert('Successfully Deleted')
      location.reload()
     })
    },
    deleteItem(item) {
      this.selectedItem = cloneDeep(item)
      this.isDelete = true;
    },
    goToAdd() {
        this.addForm = true
    },
  },
  created() {
    this.$store.dispatch("users/viewUser");
  },
  components: { Add, Edit },
  data() {
    return {
      isEdit:false,
      register:{},
      isLoading:false,
      search: "",
      items: [],
      addForm: false,
      isDelete: false,
      selectedItem: {},
      editForm: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "fullname" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
};
</script>   

<style>
</style>    