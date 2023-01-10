<template>
  <div class="pa-10">
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
    <v-dialog v-model="addLocation" width="500">
      <v-card class="pa-16">
        <div>Hospital Name</div>
        <v-text-field
          outlined
          v-model="register.hospital_name"
          dense
        ></v-text-field>
        <div>Longitude</div>
        <v-text-field
          outlined
          v-model="register.longitude"
          dense
        ></v-text-field>
        <div>Latitude</div>
        <v-text-field outlined v-model="register.latitude" dense></v-text-field>
        <div align="center">
          <v-row>
            <v-col>
              <v-btn @click="addHospital">Cancel</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="submitHandler">Save</v-btn>
            </v-col>
          </v-row>
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
      <b>Hospital Management Location</b>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-btn
            color="secondary"
            class="rounded-xl text-capitalize"
            @click="addLocation = true"
          >
            Add Hospital Location
          </v-btn>
        </v-col>
        <v-col>
          <v-row>
            <!-- <v-col>
              <v-select
                class="rounded-lg "
                outlined
                hide-details=""
                placeholder="Filter by roles"
              >
                Filter by roles
              </v-select>
            </v-col> -->
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
        :items="hospital_data"
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
import { mapState, mapActions } from "vuex";
var cloneDeep = require("lodash.clonedeep");
export default {
  computed: {
    ...mapState("hospital", ["hospital_data"]),
  },
  methods: {
    addHospital(){
      this.isEdit = false
      this.addLocation = true
    },
    submitHandler() {
      if (this.isEdit) {
        this.$store.dispatch("hospital/edit", this.register).then(res=>{
           alert("Successfully Updated!");
        location.reload()
        })
       
        return;
      }
      try {
        this.$store.dispatch("hospital/add", this.register);
        alert("Successfully Added!");
        this.addLocation = false;
      } catch (error) {
        alert(error);
      }
    },
    async submitDelete() {
      await this.$store
        .dispatch("hospital/delete", this.register)
        .then((res) => {
          alert("Successfully Deleted");
          location.reload()
        });
    },
    deleteItem(item) {
      this.register = cloneDeep(item)
      this.isDelete = true;
    },
    goToAdd() {
      this.addForm = true;
    },
    editItem(item) {
      this.register = cloneDeep(item);
      this.isEdit = true;
      this.addLocation = true;
    },
  },
  created() {
    this.$store.dispatch("hospital/view");
  },
  components: {},
  data() {
    return {
      isEdit: false,
      addLocation: false,
      register: {},
      isLoading: false,
      search: "",
      items: [],
      addForm: false,
      isDelete: false,
      selectedItem: {},
      editForm: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Hospital Name", value: "hospital_name" },
        { text: "Longitude", value: "longitude" },
        { text: "Latitude", value: "latitude" },
        { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
};
</script>   

<style>
</style>    