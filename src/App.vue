<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--    <v-app-bar app color="primary" dark>-->
    <!--      <div class="d-flex align-center">-->
    <!--        <div>Finance Manager</div>-->
    <!--      </div>-->

    <!--      <v-spacer></v-spacer>-->

    <!--      <FBtn v-if="!isUserLoggedIn()" text to="login">Log In</FBtn>-->

    <!--      <FMenu v-if="isUserLoggedIn()">-->
    <!--        <template v-slot:hoverItem>-->
    <!--          <FBtn text>{{ loggedInUserEmail() }}</FBtn>-->
    <!--        </template>-->
    <!--        <template v-slot:dropdownItem>-->
    <!--          <v-list>-->
    <!--            <v-list-item @click="logout()">Log Out</v-list-item>-->
    <!--          </v-list>-->
    <!--        </template>-->
    <!--      </FMenu>-->
    <!--    </v-app-bar>-->

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
import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import router from "@/router";

const userStore = getModule(UserStore, store);

@Component({
  components: { FMenu, FBtn },
})
export default class App extends Vue {
  loggedInUserEmail(): string {
    return userStore.user?.email ?? "";
  }

  isUserLoggedIn(): boolean {
    return !!userStore.user;
  }

  logout(): void {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Log out successful");
        router.push({ name: "LogIn" });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error.message);
      });
  }

  data() {
    return {
      appTitle: "Finance Manager",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/" },
        { title: "Subscriptions", path: "/subscriptions" },
        { title: "Purchases", path: "/purchases" },
      ],
    };
  }
}
</script>
