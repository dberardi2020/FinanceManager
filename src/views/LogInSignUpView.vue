<!--suppress TypeScriptValidateJSTypes -->
<template>
  <v-form v-model="isFormValid" ref="form">
    <v-container>
      <FTextField
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></FTextField>
      <FTextField
        v-model="password"
        :rules="passwordRules"
        type="password"
        counter=""
        label="Password"
        required
      ></FTextField>
      <FBtn
        :disabled="!isFormValid"
        color="success"
        class="mr-4"
        @click="logInBtnClick"
      >
        Log In
      </FBtn>
      <FBtn
        :disabled="!isFormValid"
        color="success"
        class="mr-4"
        @click="signUpBtnClick"
      >
        Create Account
      </FBtn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import UserAuthHandler from "@/mixins/UserAuthHandler";
import RoutesHandler from "@/mixins/RoutesHandler";
import { RoutesEnum } from "@/enums/RoutesEnum";

@Component({
  components: { FBtn, FTextField },
})
export default class LogInSignUpView extends Vue {
  isFormValid = false;

  emailRules = [
    (v: string): boolean | string => !!v || "E-mail is required",
    (v: string): boolean | string => /.+@.+/.test(v) || "E-mail must be valid",
  ];
  passwordRules = [
    (v: string): boolean | string => !!v || "Password is required",
    (v: string): boolean | string =>
      v.length >= this.passwordMinLength ||
      "Password must be at least 6 characters",
  ];
  passwordMinLength = 6;

  email = "";
  password = "";

  userAuthHandler = new UserAuthHandler();
  routesHandler = new RoutesHandler();

  @Ref("form") readonly form: any;

  logInBtnClick(): void {
    if (this.form.validate()) {
      this.userAuthHandler
        .logInExistingUser(this.email, this.password)
        .then((success) => {
          success && this.routesHandler.pushRoute(RoutesEnum.Home);
        });
    }
  }

  signUpBtnClick(): void {
    if (this.form.validate()) {
      this.userAuthHandler
        .createNewUserAccount(this.email, this.password)
        .then((success) => {
          success && this.routesHandler.pushRoute(RoutesEnum.Home);
        });
    }
  }
}
</script>
