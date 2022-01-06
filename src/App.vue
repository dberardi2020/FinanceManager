<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <div>Finance Manager</div>
      </div>

      <v-spacer></v-spacer>

      <FBtn v-if="!isUserLoggedIn()" text to="login">Log In</FBtn>
      <FBtn v-if="!isUserLoggedIn()" text to="signup">Sign Up</FBtn>

      <FMenu v-if="isUserLoggedIn()">
        <template v-slot:hoverItem>
          <FBtn text>{{ loggedInUserEmail() }}</FBtn>
        </template>
        <template v-slot:dropdownItem>
          <v-list>
            <v-list-item @click="logout()">Log Out</v-list-item>
          </v-list>
        </template>
      </FMenu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import FMenu from "@/components/vuetify-component-wrappers/FMenu/FMenu.vue";
import { getAuth, signOut } from "firebase/auth";

@Component({
  components: { FMenu, FBtn },
})
export default class App extends Vue {
  loggedInUserEmail(): string {
    return this.$store.getters.getUser?.email;
  }

  isUserLoggedIn(): boolean {
    return this.$store.getters.getUser;
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Log out successful");
        // todo handle logout
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // todo handle error
      });
  }
}
</script>
