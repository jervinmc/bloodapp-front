<template>
  <div>
    <v-card color="white">
      <div class="black text-h4 pa-10 white--text" align="center">
        <b>Add User</b>
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
          <div>Temporay Password</div>
          <div>
            <v-text-field
            type="password"
              class="rounded-lg white"
              :rules="standardRules"
              hide-details=""
              placeholder="Temporary Password"
              outlined
              v-model="register.password"
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
              :items="['Academic Unit','Assistant Director','Director','Admin','Staff','OVRAA']"
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
  </div>
</template>

<script>
import validations from "@/utils/validations";
export default {
  props: ["account_type"],
  auth: false,
  data() {
    return {
      ...validations,
      e1: 1,
      isLoading: false,
      register: {
        official_type: "",
        firstname: "",
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
        password: "",
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
    console.log(this.$auth);
  },
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
        await this.$store.dispatch("users/addUser", this.register);
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