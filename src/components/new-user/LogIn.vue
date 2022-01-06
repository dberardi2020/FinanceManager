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
        @click="validateClicked"
      >
        Log In
      </FBtn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { LogInSignUp } from "@/mixins/users/LogInSignUp";

@Component({
  components: { FBtn, FTextField },
})
export default class LogIn extends LogInSignUp {
  isFormValid = false;

  name = "";
  email = "";
  password = "";

  @Ref("form") readonly form: any;

  validateClicked(): void {
    if (this.form.validate()) {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          alert("User logged in: " + userCredential.user.email);
          // todo direct user to home page
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // todo handle error
        });
    }
  }
}
</script>
