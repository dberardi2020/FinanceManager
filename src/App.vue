<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <div>Finance Manager</div>
      </div>

      <v-spacer></v-spacer>

      <FBtn text @click="userClicked">User</FBtn>
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
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";

@Component({
  components: { FBtn },
})
export default class App extends Vue {
  userClicked(): void {
    alert("Current user: " + auth.currentUser?.email);
  }
}
</script>
