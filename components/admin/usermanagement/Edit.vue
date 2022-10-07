<template>
  <div>
    <v-card color="#f5ebd6">
      <div class="secondary text-h4 pa-10" align="center">
        <b>Update User Information</b>
      </div>
      <div class="pa-16">
        <v-col>
          <div>Name</div>
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
        <v-col>
          <div>Role</div>
          <div>
            <v-select
              class="rounded-lg white"
              :rules="standardRules"
              hide-details=""
              placeholder="Role"
              :items="['Academic Unit','Assistant Director','Director','Admin','Staff']"
              outlined
              v-model="register.account_type"
            ></v-select>
          </div>
        </v-col>
      </div>
      <div>
        <v-row>
          <v-col align="end">
            <v-btn color="grey" width="100" class="text-capitalize rounded-xl" @click="cancel">
              Cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary"  width="100" class="text-capitalize rounded-xl" @click="submitHandlerRegister">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import validations from "@/utils/validations";
var cloneDeep = require("lodash.clonedeep");

export default {
  props: ["selectedItem"],
  auth: false,
  data() {
    return {
      ...validations,
      e1: 1,
      isLoading: false,
      register: {
        official_type: "",
        firstname: "",
        fullname:'',
        lastname: "",
        gender: "",
        is_active: true,    
        gender: "",
        email: "",
        confirm_email: "",
        mobile_number: "",
        birthdate: "",
        address: "",
        province: "",
        account_type: "Resident",
        city: "",
        barangay: "",
        confirm_password: "",
      },
      isLoaded: false,
      ...validations,
      isValid: false,
      isRegister: false,
      users: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.register.fullname = cloneDeep(this.selectedItem.fullname)
     this.register.email = cloneDeep(this.selectedItem.email)
     this.register.account_type = cloneDeep(this.selectedItem.account_type)
     this.register.id = cloneDeep(this.selectedItem.id)
  },
  props:['selectedItem'],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    validatePage1() {
      if (this.register.confirm_password != this.register.password) {
        alert("Password doesn't match");
        return;
      } else {
        this.e1 = 2;
      }
    },
    // reload() {
    //   location = "/login";
    // },
    async submitHandlerRegister() {
      // this.register.account_type = this.account_type;
      this.isLoaded = true;
      //   this.$refs.form.validate();
      //   if (!this.isValid) return;
      console.log(this.register);
      try {
        await this.$store.dispatch("users/editUser", this.register);
        alert("Successful !");
        // location = "/login";
        this.$emit("cancel");
      } catch (error) {
        alert(error);
      }
      this.isLoaded = false;
    },
    selectRegister() {
      if (this.isRegister) this.isRegister = false;
      else this.isRegister = true;
    },
    async submitHandler() {
      this.isLoaded = true;
      try {
        const response = await this.$auth.loginWith("local", {
          data: this.users,
        });
      } catch (error) {
        alert("Wrong credentials");
        this.isLoaded = false;
      }
    },
  },
};
</script>

<style>
</style>