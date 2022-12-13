<template>
  <div class="pa-10">
    <v-dialog v-model="addLocation" width="500">
        <v-card class="pa-16">
            <div>
                Hospital Name
            </div>
            <v-text-field outlined v-model="register.hospital_name" dense></v-text-field>
            <div>
                Longitude
            </div>
            <v-text-field outlined v-model="register.longitude" dense></v-text-field>
            <div>
                Latitude
            </div>
            <v-text-field outlined v-model="register.latitude" dense></v-text-field>
            <div align="center">
               <v-row>
                <v-col>
                     <v-btn @click="addLocation=false">Cancel</v-btn>
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
      <b>Hospital Management Request</b>
    </div>
    <div>
      <v-row>
        <!-- <v-col>
          <v-btn
            color="secondary"
            class="rounded-xl text-capitalize"
            @click="addLocation=true"
          >
            Add Hospital
          </v-btn>
        </v-col> -->
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
        :items="hospitals"
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
              <!-- <v-list-item @click.stop="editItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click.stop="deleteItem(item)">
                <v-list-item-content>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
                <v-list-item @click.stop="activate(item)">
                <v-list-item-content>
                  <v-list-item-title>Activate</v-list-item-title>
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
export default {
  computed: {
    ...mapState("hospital", ["hospital_data"]),
    ...mapState("users", ["users"]),
    hospitals(){
        return this.users.filter(data=>data.user_type=='Institution' && data.is_active==false)
    }
  },
  methods: {
    activate(item){
        this.$store.dispatch('users/editUser',{id:item.id,is_active:true})
        alert('Successfully Updated!')
        location.reload()

    },
    submitHandler(){
        try {
            this.$store.dispatch('hospital/add',this.register)
            alert('Successfully Added!')
            this.addLocation = false;
        } catch (error) {
            alert(error);
        }

    },
   async submitDelete(){
     await this.$store.dispatch('users/deleteUser',this.selectedItem).then((res)=>{
      alert('Successfully Deleted')
      location="/admin/usermanagement"
     })
    },
    deleteItem(item) {
      this.selectedItem = item.id;
      this.isDelete = true;
    },
    goToAdd() {
        this.addForm = true
    },
    editItem(item) {
      location = `/admin/usermanagement/Edit?fullname=${item.fullname}&email=${item.email}&role=${item.account_type}&id=${item.id}`;
      // this.selectedItem = item
      // this.editForm = true
    },
  },
  created() {
     this.$store.dispatch("users/viewUser");
  },
  components: { },
  data() {
    return {
      addLocation:false,
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
        { text: "Hospital Name", value: "fullname" },
        // { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
};
</script>   

<style>
</style>    