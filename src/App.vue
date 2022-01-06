<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <div>Finance Manager</div>
      </div>

      <v-spacer></v-spacer>

      <f-btn text @click="userClicked">
        <div>User</div>
      </f-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { auth } from "@/firebase";
import FBtn from "@/components/vuetify-component-wrappers/FButton/FBtn.vue";

@Component({
  components: { FBtn },
})
export default class App extends Vue {
  userClicked(): void {
    alert("Current user: " + auth.currentUser?.email);
  }
}
</script>
