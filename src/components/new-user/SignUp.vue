<template>
  <v-form v-model="isFormValid" ref="form">
    <v-container>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        counter=""
        label="Password"
        required
      ></v-text-field>
      <v-btn
        :disabled="!isFormValid"
        color="success"
        class="mr-4"
        @click="validateClicked"
      >
        Validate
      </v-btn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";

@Component({})
export default class About extends Vue {
  isFormValid = false;

  name = "";
  nameRules = [(v: string): boolean | string => !!v || "Name is required"];

  email = "";
  emailRules = [
    (v: string): boolean | string => !!v || "E-mail is required",
    (v: string): boolean | string => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  password = "";
  passwordMinLength = 6;
  passwordRules = [
    (v: string): boolean | string => !!v || "E-mail is required",
    (v: string): boolean | string =>
      v.length >= this.passwordMinLength ||
      "Password must be at least 6 characters",
  ];

  @Ref("form") readonly form: any;

  validateClicked(): void {
    const isValid = this.form.validate();
    alert("Is form valid? " + isValid);
  }
}
</script>
