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
        @click="logIn"
      >
        Log In
      </FBtn>
      <FBtn
        :disabled="!isFormValid"
        color="success"
        class="mr-4"
        @click="signUp"
      >
        Create Account
      </FBtn>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Ref } from "vue-property-decorator";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { LogInSignUp } from "@/mixins/LogInSignUp";
import { auth, db } from "@/main";
import router from "@/router";
import { doc, setDoc } from "firebase/firestore";

@Component({
  components: { FBtn, FTextField },
})
export default class LogIn extends LogInSignUp {
  isFormValid = false;

  name = "";
  email = "";
  password = "";

  @Ref("form") readonly form: any;

  logIn(): void {
    if (this.form.validate()) {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          router.push({ name: "Home" });
        })
        .catch((error) => {
          // const errorCode = error.code;
          this.errorAlert(error.code);
        });
    }
  }

  signUp(): void {
    if (this.form.validate()) {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          setDoc(doc(db, "users", userCredential.user.uid), {});
          alert("Created account: " + userCredential.user.email);
          router.push({ name: "Home" });
        })
        .catch((error) => {
          // const errorCode = error.code;
          this.errorAlert(error.code);
        });
    }
  }
}
</script>
