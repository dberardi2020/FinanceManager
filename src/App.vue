<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title class="mr-4">
        {{ appTitle }}
      </v-app-bar-title>
      <v-toolbar-items>
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <FMenu v-if="userData.userLoggedIn">
        <template v-slot:hoverItem>
          <FBtn text>{{ userData.userEmail }}</FBtn>
        </template>
        <template v-slot:dropdownItem>
          <v-list>
            <v-list-item @click="logOutBtnClick">Log Out</v-list-item>
          </v-list>
        </template>
      </FMenu>
    </v-app-bar>

    <v-main class="ma-6">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import FMenu from "@/components/vuetify-component-wrappers/FMenu/FMenu.vue";
import UserDataStoreHandler from "@/store/handlers/UserDataStoreHandler";
import UserAuthHandler from "@/mixins/UserAuthHandler";
import RoutesHandler from "@/mixins/RoutesHandler";
import { RoutesEnum } from "@/enums/RoutesEnum";

@Component({
  components: { FMenu, FBtn },
})
export default class App extends Vue {
  // TODO: Rename to Transaction Tracker
  appTitle = "Finance Manager";
  sidebar = false;
  menuItems = [
    { title: "Home", path: "/" },
    { title: "Subscriptions", path: "/subscriptions" },
    { title: "Purchases", path: "/purchases" },
  ];

  userData = new UserDataStoreHandler();
  userAuthHandler = new UserAuthHandler();
  routesHandler = new RoutesHandler();

  logOutBtnClick(): void {
    this.userAuthHandler.logOutCurrentUser().then((success) => {
      success && this.routesHandler.pushRoute(RoutesEnum.LogIn);
    });
  }
}
</script>
